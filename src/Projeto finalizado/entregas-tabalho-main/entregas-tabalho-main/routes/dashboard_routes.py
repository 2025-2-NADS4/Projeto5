from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models.campaign import db, Campaign
import statistics

dashboard_bp = Blueprint('dashboard_bp', __name__, url_prefix='/dashboard')


# ==========================================================
# 🔹 MÉTRICAS PRINCIPAIS (dados reais das campanhas)
# ==========================================================
@dashboard_bp.route('/metrics', methods=['GET'])
@jwt_required()
def dashboard_metrics():
    campaigns = Campaign.query.all()
    if not campaigns:
        return jsonify({"msg": "Nenhuma campanha encontrada"}), 404

    open_rates = [c.openRate for c in campaigns if c.openRate is not None]
    click_rates = [c.clickRate for c in campaigns if c.clickRate is not None]

    avg_open = round(statistics.mean(open_rates), 2) if open_rates else 0
    avg_click = round(statistics.mean(click_rates), 2) if click_rates else 0

    type_data = {}
    for c in campaigns:
        t = c.type or "Desconhecido"
        if t not in type_data:
            type_data[t] = {"open": [], "click": []}
        if c.openRate is not None:
            type_data[t]["open"].append(c.openRate)
        if c.clickRate is not None:
            type_data[t]["click"].append(c.clickRate)

    type_summary = {
        t: {
            "avg_open": round(statistics.mean(v["open"]), 2) if v["open"] else 0,
            "avg_click": round(statistics.mean(v["click"]), 2) if v["click"] else 0
        }
        for t, v in type_data.items()
    }

    days = {}
    for c in campaigns:
        d = c.dayOfWeek or "Desconhecido"
        if d not in days:
            days[d] = []
        if c.openRate is not None:
            days[d].append(c.openRate)

    avg_by_day = {d: round(statistics.mean(v), 2) for d, v in days.items() if v}

    return jsonify({
        "avg_open": avg_open,
        "avg_click": avg_click,
        "by_type": type_summary,
        "by_day": avg_by_day,
        "total_campaigns": len(campaigns)
    })


# ==========================================================
# 🔹 MÉDIAS POR TIPO E POR DIA (dados reais)
# ==========================================================
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


# ==========================================================
# 🔹 ROTAS FAKE PARA O FRONT (formato atualizado do a.txt)
# ==========================================================
@dashboard_bp.route('/clientes-genero', methods=['GET'])
def clientes_genero():
    data = [
        {"name": "Feminino", "value": 24.4},
        {"name": "Masculino", "value": 23.4},
        {"name": "Outros", "value": 26.3},
        {"name": "Nulo", "value": 25.9},
    ]
    return jsonify(data)

@dashboard_bp.route('/vendas-semana', methods=['GET'])
def vendas_semana():
    data = [
        {"name": "Seg", "vendas": 124},
        {"name": "Ter", "vendas": 107},
        {"name": "Qua", "vendas": 118},
        {"name": "Qui", "vendas": 107},
        {"name": "Sex", "vendas": 107},
        {"name": "Sáb", "vendas": 125},
        {"name": "Dom", "vendas": 102},
    ]
    return jsonify(data)

@dashboard_bp.route('/pedidos-mensais', methods=['GET'])
def pedidos_mensais():
    data = [
        {"name": "Jan", "pedidos": 65},
        {"name": "Fev", "pedidos": 57},
        {"name": "Mar", "pedidos": 37},
        {"name": "Abr", "pedidos": 38},
        {"name": "Mai", "pedidos": 33},
        {"name": "Jun", "pedidos": 45},
        {"name": "Jul", "pedidos": 40},
        {"name": "Ago", "pedidos": 36},
        {"name": "Set", "pedidos": 40},
        {"name": "Out", "pedidos": 50},
    ]
    return jsonify(data)

@dashboard_bp.route('/top-engines', methods=['GET'])
def top_engines():
    data = [
        {"name": "DirectOrder", "clientes": 538},
        {"name": "KDSPro", "clientes": 484},
        {"name": "CannoliEngine", "clientes": 500},
        {"name": "IfoodBridge", "clientes": 478},
    ]
    return jsonify(data)