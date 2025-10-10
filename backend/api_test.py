# backend/api_test.py
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/api/test')
def test_endpoint():
    return jsonify({"message": "O backend Python esta vivo!"})
