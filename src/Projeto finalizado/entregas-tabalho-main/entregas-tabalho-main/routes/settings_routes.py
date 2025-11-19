from flask import Blueprint, request, jsonify
from models import db

settings_bp = Blueprint("settings", __name__)

# Modelo simplificado (crie uma tabela real se quiser persistir)
class EmpresaConfig(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_empresa = db.Column(db.String(120))
    cnpj = db.Column(db.String(30))
    email = db.Column(db.String(120))
    telefone = db.Column(db.String(30))


@settings_bp.route('/api/empresa', methods=['POST'])
def salvar_empresa():
    data = request.get_json()

    if not data:
        return jsonify({"msg": "JSON inválido"}), 400

    # Busca o registro (ID fixo = 1)
    empresa = EmpresaConfig.query.get(1)

    if not empresa:
        empresa = EmpresaConfig(id=1)

    empresa.nome_empresa = data.get("nomeEmpresa")
    empresa.cnpj = data.get("cnpj")
    empresa.email = data.get("email")
    empresa.telefone = data.get("telefone")

    db.session.add(empresa)
    db.session.commit()

    return jsonify({"msg": "Dados atualizados com sucesso"}), 200
