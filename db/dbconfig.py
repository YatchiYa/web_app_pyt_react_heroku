
from pymongo import MongoClient, errors
from datetime import datetime
import sys
# connection a la base de données local ou server

#client_uri = 'mongodb+srv://' + 'yatchiAuth' + ':' + '1y2o3u4e5f' + '@' + 'skybreaker01' + '-gcpvn.mongodb.net/test?retryWrites=true&w=majority'


def db_connect():
    #client_uri = 'mongodb://localhost:27017/'
    client_uri = 'mongodb+srv://' + 'yatchiAuth' + ':' + '1y2o3u4e5f' + '@' + 'skybreaker01' + '-gcpvn.mongodb.net/test?retryWrites=true&w=majority'
    try:
        print ("database connected")
        return MongoClient(client_uri)
    except errors.ConnectionFailure:
        print ("Failed to connect to server {}".format(client_uri))
        return (None)

