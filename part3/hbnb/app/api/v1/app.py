#!/usr/bin/python3
"""
Point d'entrée de l'API HBnB
"""
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Autoriser toutes les origines à accéder aux routes commençant par /api/v1/
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

@app.route('/api/v1/status/', methods=['GET'])
def status():
    """
    Route simple pour vérifier que l'API fonctionne
    """
    return jsonify({"status": "OK"})

# 🔹 Exemple d’une autre route (à adapter selon ton projet)
@app.route('/api/v1/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Bienvenue sur l'API HBnB"})


if __name__ == "__main__":
    # Lancement du serveur Flask
    # host=0.0.0.0 pour être accessible depuis d'autres machines si besoin
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)
