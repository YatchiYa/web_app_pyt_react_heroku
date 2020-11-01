
from flask import Flask, render_template,send_from_directory,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import os

import chatbot.constants as constants
from chatbot.bot_config import *
from db.db_config import *
from db.insert_data import *
from db.db_controllers import *


# déclaré l'app name / la redirection du path vers react componenent
app  = Flask(__name__ 
    ,static_folder='vendor/build',static_url_path='')


# cors c'est les droit d'accées http, https et les redirection 
cors = CORS(app)

# on connect la base de données
client = db_connect()
# si la table est vide on la rempli avec le fichier json
insert_datachat_to_database(client)

#creation du bot object ( instance de la classe chatbot)
constants.chatbot = get_tags(client)


# déf de qlq routes racine /
@app .route('/')
def index():
    return app.send_static_file('index.html')


# déf de qlq routes 404 error
@app .errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/api/query', methods = ['POST'])
def get_query_from_react():
    data = request.get_json()
    response = chat(data['data'])
    return response
    


@app.route('/api/register', methods = ['POST'])
def register():
    patient = client
    BD = patient["patient"]
    TB = BD["malades"]


    data = request.get_json()
    print (data)

    list = data["data"]
    print (list)

    if (TB.find_one({"email": list["email"]}) == None):
        TB.insert_one(list)
        return (jsonify({'status' : "success"}))
    else:
        return (jsonify({'status' : "error from backend"}))


@app.route('/api/login', methods = ['POST'])
def login():
    patient = client
    BD = patient["patient"]
    TB = BD["malades"]


    data = request.get_json()
    print (data)

    list = data["data"]
    user = TB.find_one({"email": list["email"]})
    if (user != None):
        if (user["password"] == list["password"]):
            output = {
                "nom": user["nom"],
                "prenom": user["prenom"],
                "tel": user["tel"],
                "email": user["email"],
                "adress": user["adress"],
            }
            return (jsonify({'user' : output, 'status': 'success'}))
        else:
            return (jsonify({'status' : "password error"}))
    else:
        return (jsonify({'status' : "error from backend"}))





if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=False, port=os.environ.get('PORT', 80))
