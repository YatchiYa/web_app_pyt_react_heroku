
from flask import Flask, render_template,send_from_directory,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import os
import requests
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
    return (map_world())



@app.route('/daystats', methods=['GET','POST'])
def daystats():
    url = "https://covid-19-statistics.p.rapidapi.com/reports/total"

    querystring = {"date":"2020-04-07"}

    headers = {
        'x-rapidapi-key': "135a9d9dcfmshcf830c0b0b26350p193d1ejsn040cb20e2692",
        'x-rapidapi-host': "covid-19-statistics.p.rapidapi.com"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    x = response.text.split("\n")
    date = x[2]
    lastupdate = x[3]
    confirmed = x[4]
    death = x[6]
    recoverd = x[8]
    fatalite_rate = x[12]
    data = {
        "date": date.split(":")[1].split(",")[0],
        "lastupdate" : lastupdate.split(":")[1].split(",")[0],
        "confirmed" : confirmed.split(":")[1].split(",")[0],
        "deaths" : death.split(":")[1].split(",")[0],
        "recovered" : recoverd.split(":")[1].split(",")[0],
        "fatalite" : fatalite_rate.split(":")[1].split(",")[0]
    }

    #   print(confirmed.split(":")[1].split(",")[0])
    labels = 'Deaths', 'Reported', 'Recovered'
    sizes = [death.split(":")[1].split(",")[0], confirmed.split(":")[1].split(",")[0], recoverd.split(":")[1].split(",")[0]]
    explode = (0, 0.1, 0.1)

    fig1, ax1 = plt.subplots()
    ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
            shadow=True, startangle=90)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    fig1.savefig("piechart.png")


    return ({"data": data})



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

