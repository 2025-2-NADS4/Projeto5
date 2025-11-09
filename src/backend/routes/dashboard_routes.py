from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models.campaign import db, Campaign
import statistics

dashboard_bp = Blueprint('dashboard_bp', __name__, url_prefix='/dashboard')

@dashboard_bp.route('/metrics', methods=['GET'])
@jwt_required()
def dashboard_metrics():
    campaigns = Campaign.query.all()
    if not campaigns:
        return jsonify({"msg": "Nenhuma campanha encontrada"}), 404

    # Calcula médias de open e click rates
    open_rates = [c.openRate for c in campaigns if c.openRate is not None]
    click_rates = [c.clickRate for c in campaigns if c.clickRate is not None]

    avg_open = round(statistics.mean(open_rates), 2)
    avg_click = round(statistics.mean(click_rates), 2)

    # Agrupar por tipo
    type_data = {}
    for c in campaigns:
        t = c.type or "Desconhecido"
        if t not in type_data:
            type_data[t] = {"open": [], "click": []}
        type_data[t]["open"].append(c.openRate)
        type_data[t]["click"].append(c.clickRate)

    type_summary = {
        t: {
            "avg_open": round(statistics.mean(v["open"]), 2),
            "avg_click": round(statistics.mean(v["click"]), 2)
        }
        for t, v in type_data.items()
    }

    # Agrupar por dia da semana
    days = {}
    for c in campaigns:
        d = c.dayOfWeek
        if d not in days:
            days[d] = []
        days[d].append(c.openRate)

    avg_by_day = {d: round(statistics.mean(v), 2) for d, v in days.items()}

    return jsonify({
        "avg_open": avg_open,
        "avg_click": avg_click,
        "by_type": type_summary,
        "by_day": avg_by_day,
        "total_campaigns": len(campaigns)
    })
