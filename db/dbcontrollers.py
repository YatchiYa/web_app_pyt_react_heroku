
from pymongo import MongoClient, errors
from datetime import datetime
import sys

import chatbot.chatbot as bot


def get_tags(client):
    tags = []
    patterns = []
    responses = []
    context = []
    chatbot = client["chatbot"]
    table = chatbot["data_chat"]

    for x in table.find():
        tags.append(x["tag"])
        patterns.append(x["patterns"])
        responses.append(x["responses"])
        context.append(x["context"])

    chatbot = bot.chatbot(tags, patterns, responses, context)
    return (chatbot)