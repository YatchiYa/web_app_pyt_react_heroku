
from flask import Flask, render_template,send_from_directory,request, jsonify, make_response

import os

app  = Flask(__name__ 
    ,static_folder='vendor/build',static_url_path='')


@app .route('/')
def index():
    return app.send_static_file('index.html')

@app .errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
