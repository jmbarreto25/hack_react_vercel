from flask import Flask
from flask_cors import CORS
from .routes.routes import user_bp


# Función para crear la aplicación
def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(user_bp, url_prefix='/api/usuarios')
    return app