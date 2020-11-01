
import chatbot.constants as constants
from chatbot.bot_config import *
from chatbot.bot_parse import *
import random


def get_formalities_response(formality, chatbot) :
    i = 0
    if (constants.conext and constants.conext[0] and len(constants.conext[0]) != 0):
        while (i < len(chatbot.tags)):
            if (chatbot.tags[i] == constants.conext[0]) and any(remove_punctuation_marks(formality).lower() in remove_punctuation_marks(greet).lower() for greet in chatbot.patterns[i]) :
                constants.conext = chatbot.context[i]
                constants.sympthomes.append(chatbot.tags[i])
                return random.choice(chatbot.responses[i])
            i += 1
        return ("sorry can you answer yes or no only please !")
    else:
        while (i < len(chatbot.patterns)):
            if any(remove_punctuation_marks(formality).lower() in remove_punctuation_marks(greet).lower() for greet in chatbot.patterns[i]) :
                constants.conext = chatbot.context[i]
                constants.sympthomes = []
                return random.choice(chatbot.responses[i])
            i += 1

