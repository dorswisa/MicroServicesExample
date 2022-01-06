# import main Flask class and request object
from flask import Flask, request, abort, jsonify
from flask_cors import CORS, cross_origin
import json

# create the Flask app
microservice1 = Flask(__name__)
cors = CORS(microservice1)

@microservice1.route('/token', methods=['POST'])
def token():
    the_json = request.data
    data = json.loads(the_json)
    array = data['body'][0]
    item = data['body'][1]
    if item != '':
        array.append(item)
        print(array)
        return json.dumps(array)
    else:
        response = jsonify('This is an error!')
        response.status_code = 400
        return response
if __name__ == '__main__':
    microservice1.run(debug=True, port=3007)
