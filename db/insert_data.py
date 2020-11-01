
from pymongo import MongoClient, errors
from datetime import datetime
import sys, json

def insert_datachat_to_database(client):
    # set the database 
    chatbot = client["chatbot"]
    # set the collection ( table ) 
    table = chatbot["data_chat"]
    
    ret = 0
    # get the length of our object ( how many element there in our collection )
    for x in table.find():
        ret += 1
    

    if (ret == 0):
        # read json file
        with open('bot.json') as json_file:
            mydict = json.load(json_file)
            print(mydict)
        #if collection empty, we fill it
        table.insert_many(mydict)
