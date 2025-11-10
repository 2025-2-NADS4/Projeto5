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

    open_rates = [c.openRate for c in campaigns if c.openRate is not None]
    click_rates = [c.clickRate for c in campaigns if c.clickRate is not None]

    avg_open = round(statistics.mean(open_rates), 2)
    avg_click = round(statistics.mean(click_rates), 2)

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


@dashboard_bp.route("/openrate-por-tipo", methods=["GET"])
@jwt_required()
def openrate_por_tipo():
    campaigns = Campaign.query.all()
    if not campaigns:
        return jsonify([])

    type_data = {}
    for c in campaigns:
        t = c.type or "Desconhecido"
        if t not in type_data:
            type_data[t] = []
        if c.openRate is not None:
            type_data[t].append(c.openRate)

    data = [
        {"name": t, "value": round(statistics.mean(v), 2)}
        for t, v in type_data.items() if v
    ]

    return jsonify(data)


@dashboard_bp.route("/openrate-por-dia", methods=["GET"])
@jwt_required()
def openrate_por_dia():
    campaigns = Campaign.query.all()
    if not campaigns:
        return jsonify([])

    days = {}
    for c in campaigns:
        d = c.dayOfWeek or "Desconhecido"
        if d not in days:
            days[d] = []
        if c.openRate is not None:
            days[d].append(c.openRate)

    data = [
        {"name": d, "openRate": round(statistics.mean(v), 2)}
        for d, v in days.items() if v
    ]

    return jsonify(data)
