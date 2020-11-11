
import folium
from flask import Flask, render_template
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import requests
from folium.plugins import HeatMap, TimestampedGeoJson
import folium.plugins as plugins

app = Flask(__name__)

@app.route('/')
def index():
    
    df_joined_pandas = pd.read_csv('C:\\Users\\Utilisateur\\OneDrive\\Bureau\\Berouachedi_project\\df_joined_pandas.csv', sep=';')
    with open('C:\\Users\\Utilisateur\\OneDrive\\Bureau\\Berouachedi_project\\us_states_boundaries.txt') as f:
        geojson_states = json.load(f)

    index_time = list(pd.to_datetime(list(df_joined_pandas['date'].unique())))
    index_time = [str(x.date()) for x in index_time]

    with open('C:\\Users\\Utilisateur\\OneDrive\\Bureau\\Berouachedi_project\\state_lat_lng_value.json') as f:
        lat_lng_value = json.load(f)

    def style_function(feature):
        return {
            'fillOpacity': 0,
            'weight': 0.9,
        }

    new_map = folium.Map([40.111689,-100.723478], tiles='stamentoner', zoom_start=4)
    hm = plugins.HeatMapWithTime(lat_lng_value['lat_lng_value'], index=index_time, auto_play=True, max_opacity=0.8, radius=0.8,
                                 scale_radius=True, gradient={.2: 'blue', .4: 'lime', 0.5: 'red'},
                                 min_speed=1, speed_step=0.5)
    hm.add_to(new_map)
    folium.GeoJson(geojson_states, style_function=style_function,
                  tooltip=folium.GeoJsonTooltip(fields=['NAME'],
                                                aliases=['<div style="background-color: lightyellow; color: black; padding: 3px; border: 5px solid black; border-radius: 6px;">'+item+'</div>' for item in ['NAME']],
                                                 style="font-family: san serif;",
                                                localize=True,
                                                  labels=False,
                                                  sticky=False),
                   highlight_function=lambda x: {'weight':3,'fillColor':'grey'}).add_to(new_map)

    folium.LayerControl().add_to(new_map)
    new_map.save('templates/usa_states_visualisation_cases_of_covid.html')
    return render_template('index_v4.html')



@app.route('/map_v4')
def map():
    return render_template('usa_states_visualisation_cases_of_covid.html')

if __name__ == '__main__':
    app.run(debug=True)
















