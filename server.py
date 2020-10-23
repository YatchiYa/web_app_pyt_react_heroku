
from flask import Flask, render_template,send_from_directory,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import boto3
import os

flask_app  = Flask(__name__ 
    ,static_folder='client/build',static_url_path='')
cors = CORS(flask_app)

@flask_app .route('/')
def index():
    return flask_app.send_static_file('index.html')

@flask_app .errorhandler(404)
def not_found(e):
    return flask_app.send_static_file('index.html')

if __name__ == "__main__":
    flask_app.run(host='127.0.0.1', debug=False, port=os.environ.get('PORT', 80))
