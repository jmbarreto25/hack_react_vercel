from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from app.services.user_service import (create_user, get_user, update_user, delete_user, get_all_users, search_user, count_users)



user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['POST'])
def create_user_route():
    data = request.json
    return jsonify(create_user(data))

@user_bp.route('/<int:id>', methods=['GET'])
def get_user_route(id):
    return jsonify(get_user(id))

@user_bp.route('/<int:id>', methods=['PUT'])
def update_user_route(id):
    data = request.json
    updated_user = update_user(id, data)
    return jsonify(updated_user)

@user_bp.route('/<int:id>', methods=['DELETE'])
def delete_user_route(id):
    return jsonify(delete_user(id))

@user_bp.route('/search', methods=['GET'])
def search_users_route():
    return jsonify(search_user(request.args))

@user_bp.route('/', methods=['GET'])
def get_users_route():
    return jsonify(get_all_users())

@user_bp.route('/count', methods=['GET'])
def count_users_route():
    return jsonify(count_users())