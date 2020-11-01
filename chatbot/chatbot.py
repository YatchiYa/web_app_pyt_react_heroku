import random
import sys
from threading import Thread
import time
from pymongo import MongoClient, errors
from datetime import datetime
import sys



class chatbot():
  def __init__(self, tags, patterns, responses, context):
       self.tags = tags
       self.patterns = patterns
       self.responses = responses
       self.context = context
       
