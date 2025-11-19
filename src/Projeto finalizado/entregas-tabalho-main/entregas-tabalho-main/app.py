import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)

from models import db
from models.user import User
from routes.product import product_bp
from routes.dashboard_routes import dashboard_bp
from routes.settings_routes import settings_bp
from config import Config
from your_app import create_app

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializa o banco
    db.init_app(app)

    # ✅ Configuração CORS (somente seu front-end React)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    # ✅ JWT
    jwt = JWTManager(app)

    @jwt.unauthorized_loader
    def unauthorized_callback(err_msg):
        return jsonify({"msg": "Token ausente ou inválido"}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(err_msg):
        return jsonify({"msg": "Token inválido"}), 401

    # ✅ Blueprints
    app.register_blueprint(product_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(settings_bp)

    # Rota raiz (teste rápido)
    @app.route('/')
    def home():
        return jsonify({"msg": "API Cannoli Dashboard rodando 🎉"})

    # Rota de registro
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json() or {}
        if not data.get('username') or not data.get('password') or not data.get('role'):
            return jsonify({"msg": "Dados incompletos"}), 400
        if User.query.filter_by(username=data['username']).first():
            return jsonify({"msg": "Usuário já existe"}), 400

        new_user = User(username=data['username'], role=data['role'])
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Usuário criado com sucesso"}), 201

    # Rota de login
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json() or {}
        if not data.get('username') or not data.get('password'):
            return jsonify({"msg": "Dados incompletos"}), 400

        user = User.query.filter_by(username=data['username']).first()
        if not user or not user.check_password(data['password']):
            return jsonify({"msg": "Usuário ou senha incorretos"}), 401

        # ✅ Passa o objeto direto, sem json.dumps()
        user_identity = {"username": user.username, "role": user.role}
        access_token = create_access_token(identity=user_identity)

        return jsonify(access_token=access_token), 200

    # Rota protegida para testes
    @app.route('/protected', methods=['GET'])
    @jwt_required()
    def protected():
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200

    # Cria todas as tabelas no banco
    with app.app_context():
        db.create_all()

    return app


# ✅ Inicializa e roda o app Flask
if __name__ == '__main__':
    app = create_app()
    print("🚀 Servidor Flask rodando em http://127.0.0.1:5000")
    app.run(debug=True)
