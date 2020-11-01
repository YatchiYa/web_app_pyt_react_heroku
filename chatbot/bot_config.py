
import chatbot.constants as constants


import nltk
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import string
import warnings

def get_lemmatized_tokens(text) :
    normalized_tokens = nltk.word_tokenize(remove_punctuation_marks(text.lower()))
    return [nltk.stem.WordNetLemmatizer().lemmatize(normalized_token) for normalized_token in normalized_tokens]
def remove_punctuation_marks(text) :
    punctuation_marks = dict((ord(punctuation_mark), None) for punctuation_mark in string.punctuation)
    return text.translate(punctuation_marks)

def get_query_reply(documents, query) :
    documents.append(query)
    tfidf_results = TfidfVectorizer(tokenizer = get_lemmatized_tokens, stop_words = 'english').fit_transform(documents)
    cosine_similarity_results = cosine_similarity(tfidf_results[-1], tfidf_results).flatten()
    # The last will be 1.0 because it is the Cosine Similarity between the first document and itself
    best_index = cosine_similarity_results.argsort()[-2]
    documents.remove(query)
    if cosine_similarity_results[best_index] == 0 :
        return "I am sorry! I don't understand you..."
    else :
        return documents[best_index]



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



def chat(request):
    warnings.filterwarnings("ignore")

    try :
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')

    try :
        nltk.data.find('corpora/wordnet')
    except LookupError:
        nltk.download('wordnet')

    corpus = open('corpus.txt', 'r' , errors = 'ignore').read().lower()
    documents = nltk.sent_tokenize(corpus)

    end_chat = False
    while end_chat == False :
        if remove_punctuation_marks(request).lower() != 'bye' :
            formality_reply = get_formalities_response(request, constants.chatbot)
            if  formality_reply :
                return (formality_reply)
            else :
                return (get_query_reply(documents, request))
        else :
            end_chat = True
            return (random.choice(constants.GOODBYE_REPLIES))
