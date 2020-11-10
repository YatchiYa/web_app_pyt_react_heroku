
from flask import Flask, render_template,send_from_directory,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import os
import requests
import json
import http.client

import chatbot.constants as constants
from chatbot.bot_config import *
from db.db_config import *
from db.insert_data import *
from db.db_controllers import *
from app_v2 import *
import matplotlib.pyplot as plt


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
                "symptomes": user["symptomes"],
            }
            return (jsonify({'user' : output, 'status': 'success'}))
        else:
            return (jsonify({'status' : "password error"}))
    else:
        return (jsonify({'status' : "error from backend"}))



@app.route('/map_world', methods=['GET','POST'])
def map_ws():
    print("called map v2")
    map_world()
    return ({"status": "success"})



@app.route('/daystats', methods=['GET','POST'])
def daystats():
    
    urll = 'https://covid.ourworldindata.org/data/owid-covid-data.json'
    response = requests.request("GET", urll)

    geo_json_data = json.loads(response.text)
    day_data = geo_json_data["OWID_WRL"]["data"][len(geo_json_data["OWID_WRL"]["data"]) - 1]

    data = {
        "date": day_data["date"],
        "lastupdate" : day_data["date"],
        "confirmed" : day_data["total_cases"],
        "newconfirmed" : day_data["new_cases"],
        "deaths" : day_data["total_deaths"],
        "newdeaths" : day_data["new_deaths"]
    }

    #   print(confirmed.split(":")[1].split(",")[0])
    labels = 'Confirmed', 'Deaths'
    sizes = [data["confirmed"], data["deaths"]]
    explode = (0, 0.1)

    fig1, ax1 = plt.subplots()
    ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
            shadow=True, startangle=90)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    fig1.savefig("vendor/src/piechart.png")

    labelsx = 'NewConfirmed', 'NewDeaths'
    sizesx = [data["newconfirmed"], data["newdeaths"]]
    explodex = (0, 0.1)

    fig1x, ax1x = plt.subplots()
    ax1x.pie(sizesx, explode=explodex, labels=labelsx, autopct='%1.1f%%',
            shadow=True, startangle=90)
    ax1x.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    fig1x.savefig("vendor/src/pie.png")

    

    return ({"data": data})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

