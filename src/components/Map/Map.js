import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';

import styles from './Map.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'MAPBOX_ACCESS_TOKEN';

function Map() {
  const mapboxElRef = useRef(null);

  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) =>
        data.map((point, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [point.coordinates.longitude, point.coordinates.latitude]
          },
          properties: {
            id: index,
            country: point.country,
            province: point.province,
            infected: point.stats.confirmed,
            recovered: point.stats.recovered,
            deaths: point.stats.deaths
          }
        }))
      );

  const { data } = useSWR('COVID-19-API', fetcher);

  useEffect(() => {
    if (data) {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
        center: [16, 23],
        zoom: 2
      });

      map.addControl(new mapboxgl.NavigationControl());

      map.once('load', function () {
        // Add our SOURCE
        map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data
          }
        });

        // Add our layer
        map.addLayer({
          id: 'circles',
          source: 'points',
          type: 'circle',
          paint: {
            'circle-opacity': 0.75,
            'circle-stroke-width': ['interpolate', ['linear'], ['get', 'infected'], 1, 1, 100000, 1.75],
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'infected'],
              1,
              4,
              1000,
              8,
              4000,
              10,
              8000,
              14,
              12000,
              18,
              100000,
              40
            ],
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'infected'],
              1,
              '#ffffb2',
              5000,
              '#fed976',
              10000,
              '#feb24c',
              25000,
              '#fd8d3c',
              50000,
              '#fc4e2a',
              75000,
              '#e31a1c',
              100000,
              '#b10026'
            ]
          }
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        let lastId;

        map.on('mousemove', 'circles', (e) => {
          const id = e.features[0].properties.id;

          if (id !== lastId) {
            lastId = id;
            const { infected, recovered, deaths, country, province } = e.features[0].properties;

            map.getCanvas().style.cursor = 'pointer';

            const coordinates = e.features[0].geometry.coordinates.slice();

            const countryISO = lookup.byCountry(country)?.iso2 || lookup.byInternet(country)?.iso2;
            const countryFlagHTML = Boolean(countryISO)
              ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
              : '';
            const provinceHTML = province !== 'null' ? `${province}` : '';

            const HTML = `<div style="text-align: center;">${countryFlagHTML}</div>
              <div style="font-family: 'Raleway', sans-serif; font-size: 20px; line-height: 25px; color: #000; font-weight: bold; text-align: center; margin-bottom: 8px;">${country}</div>
              <div style="font-family: 'Raleway', sans-serif; font-size: 14px; color: #000; text-align: center; margin-bottom: 5px;"><b>${provinceHTML}</b></div>
              <div style="font-family: 'Raleway', sans-serif; font-size: 12px; color: #000; text-align: center;"><b>${infected}</b> Infected</div>
              <div style="font-family: 'Raleway', sans-serif; font-size: 12px; color: #000; text-align: center;"><b>${recovered}</b> Recoveries</div>
              <div style="font-family: 'Raleway', sans-serif; font-size: 12px; color: #000; text-align: center;"><b>${deaths}</b> Deaths</div>`;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          })
        );

        map.on('mouseleave', 'circles', function () {
          lastId = undefined;
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    }
  }, [data]);

  return (
    <div className={styles.map}>
      <div className={styles.mapContainer}>
        <div className={styles.mapBox} ref={mapboxElRef} />
      </div>
    </div>
  );
}

export default Map;
