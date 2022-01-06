# import main Flask class and request object
from flask import Flask, request, abort, jsonify
from flask_cors import CORS, cross_origin
import json

# create the Flask app
microservice2 = Flask(__name__)
cors = CORS(microservice2

@microservice2.route('/token', methods=['POST'])
def token():
    return json.dumps([])
if __name__ == '__main__':
    microservice2.run(debug=True, port=3008)