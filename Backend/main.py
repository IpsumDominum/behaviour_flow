from flask import Flask, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

@app.route('/project', methods=['GET'])
def get_strings():
    with open(os.path.join(
        "saved_projects",
        "test.json"
    ),"r") as file:
        data = json.loads(file.read())
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
