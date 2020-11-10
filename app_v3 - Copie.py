from flask import Flask, render_template
import folium
from flask import Flask, render_template
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import folium
import json
import requests
import folium
from folium.plugins import HeatMap
from folium.plugins import HeatMap, TimestampedGeoJson
import folium.plugins as plugins

app = Flask(__name__)

@app.route('/')
def index():
    data = pd.read_csv('https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7', sep=';')
    data['dep'] = data['dep'].astype('str')
    data['jour'] = data['jour'].astype('datetime64')

    data_deces = data[['dep', 'jour', 'dc']]\
    .groupby(['jour', 'dep'])\
    .max()\
    .reset_index()\
    .sort_values(['dep', 'jour'])
    data_deces = data_deces.dropna()
    data_deces = data_deces[data_deces['dep']!='nan']
    data_deces = data_deces[['dep', 'jour', 'dc']].reset_index()
    deces_cumules_par_dept_as_pandas = data_deces[['dep', 'jour', 'dc']]
    index_time = list(pd.to_datetime(list(deces_cumules_par_dept_as_pandas['jour'].unique())))
    index_time = [str(x.date()) for x in index_time]

    max_dc = 200
    deces_cumules_par_dept_as_pandas['dc'] = deces_cumules_par_dept_as_pandas['dc']/max_dc

    deces_cumules_par_dept_as_pandas['dc'] = deces_cumules_par_dept_as_pandas['dc'].\
    apply(lambda x: 0.01 if x<=0 else x)

    with open('C:\\Users\\Utilisateur\\OneDrive\\Bureau\\Berouachedi_project\\departements.geojson.txt') as f:
        geojson_depts = json.load(f)


    def get_centroid(coords):
        """cette fonction va chercher le centre approximatif d'un département
        un departement est considiré comme un ensemble de points geographiques
        et le but de cette fonction est de retourner la latitude et longitude du centre 
        de tous les points"""

        l = str(coords).strip()
        l = l.replace('[', '').replace(']', '').replace(' ', '').split(',')
        lat_list = [float(e) for e in l[1::2]]
        lng_list = [float(e) for e in l[0::2]]
        return np.median(lat_list), np.median(lng_list)

    dept_list = []
    for dept in geojson_depts['features']:
        lat, lng = get_centroid(dept['geometry']['coordinates'])
        code_dept = dept['properties']['code']
        dept_list.append([code_dept, lat, lng])

    dept_df = pd.DataFrame(dept_list, columns=['dept', 'lat', 'lng'])
    dept_df = dept_df.sort_values('dept').reset_index()
    dept_df = dept_df[['dept', 'lat', 'lng']]

    with open('C:\\Users\\Utilisateur\\OneDrive\\Bureau\\Berouachedi_project\\lat_lng_value.json') as f:
        lat_lng_value = json.load(f)

    def style_function(feature):
        return {
            'fillOpacity': 0,
            'weight': 0.9,
        }

    new_map = folium.Map([46.890232,2.599816], tiles='stamentoner', zoom_start=6)
    hm = plugins.HeatMapWithTime(lat_lng_value['lat_lng_value'], index=index_time, auto_play=True, max_opacity=0.8, radius=0.2,
                                 scale_radius=True, gradient={.2: 'blue', .4: 'lime', 0.5: 'red'},
                                 min_speed=1)
    hm.add_to(new_map)
    folium.GeoJson(geojson_depts, style_function=style_function,
                  tooltip=folium.GeoJsonTooltip(fields=['nom', 'code'],
                                                aliases=['<div style="background-color: lightyellow; color: black; padding: 3px; border: 5px solid black; border-radius: 6px;">'+item+'</div>' for item in ['nom', 'code']],
                                                style="font-family: san serif;",
                                                localize=True,
                                                labels=False,
                                                sticky=False),
                   highlight_function=lambda x: {'weight':3,'fillColor':'grey'}).add_to(new_map)

    folium.LayerControl().add_to(new_map)
    new_map.save('templates/france_departements_visualisation_deaths_of_covid.html')
    return render_template('index_v3.html')



@app.route('/map_v3')
def map():
    return render_template('france_departements_visualisation_deaths_of_covid.html')

if __name__ == '__main__':
    app.run(debug=True)