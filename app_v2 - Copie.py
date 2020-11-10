from flask import Flask, render_template
import folium
from flask import Flask, render_template
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import requests
from folium.plugins import HeatMap


def map_world():
    df = pd.read_csv("global_cases.csv", sep=";")
    df['country'] = df['country'].replace(['US'],'United States of America').\
    replace('Taiwan*', 'Taiwan').replace('Korea, South','South Korea').\
    replace('Tanzania','United Republic of Tanzania').\
    replace('Guinea-Bissau', 'Guinea Bissau').replace("Cote d'Ivoire",'Ivory Coast').replace('Burma', 'Myanmar').\
    replace('Congo (Brazzaville)', 'Democratic Republic of the Congo').replace('Congo (Kinshasa)', 'Republic of the Congo').\
    replace('Serbia', 'Republic of Serbia').replace('Eswatini', 'Swaziland').replace('West Bank and Gaza', 'West Bank').\
    replace('North Macedonia', 'Macedonia')

    url = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    geo_json_data = json.loads(requests.get(url).text)

    list_countries_from_geojson = []
    for f in geo_json_data['features']:
        list_countries_from_geojson.append(f['properties']['name'])

    countries = list(df['country'].unique())

    for c in countries:
        if c not in list_countries_from_geojson:
            df['country'] = df['country'].replace(c,'Algeria')


            # to look for diffrent tiles : http://leaflet-extras.github.io/leaflet-providers/preview/
    m = folium.Map(location=[39.909736, 4.287529], zoom_start=2, 
        tiles='https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
        attr="©OpenStreetMap, ©CartoDB") # ('')

    m.choropleth(
        geo_data=geo_json_data,
        name='choropleth',
        data=df[df['date']=="2020-03-30"],
        columns=['country', 'cases'],
        key_on='feature.properties.name',
    #     marker=folium.Circle(location=[39.909736,-99.492657], fill=True, radius=False, fill_opacity=0.5),
        fill_color='YlOrBr', # you can choose any of those : (BuGn, BuPu, GnBu, OrRd, PuBu, PuBuGn, PuRd, RdPu, YlGn, YlGnBu, YlOrBr, YlOrRd)
        fill_opacity=0.7,
        line_opacity=0.8,
        legend_name='number_of_cases_by_country',
        highlight_function=lambda x: {'weight':3,'fillColor':'grey'}
    )
    
    # i = 0
    # for state in geo_json_data["features"]:
    #     prop = state["properties"]
    #     index_state = int(geo_json_data["features"].index(state))
    #     lat = state['geometry']['lat_centre']
    #     lng = state['geometry']['lng_centre']
    #     folium.Marker([lat, lng], popup = prop["name"]).add_to(m)
    #     i += 1

    # HeatMap(data=df_copy[['pickup_latitude', 'pickup_longitude', 'count']].groupby(['pickup_latitude', 'pickup_longitude']).sum().reset_index().values.tolist(), radius=8, max_zoom=13).add_to(base_map)

    folium.LayerControl().add_to(m)
    m.save('vendor/public/map_v2.html')
    return ({"status":"success"})



def map_world_seconde():
    return render_template('map_v2.html')
