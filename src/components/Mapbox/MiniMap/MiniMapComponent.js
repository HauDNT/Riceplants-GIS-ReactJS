import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Marker from '../Marker';
import { MapboxAPIKey } from '../../../common/MapboxApiKey';

mapboxgl.accessToken = MapboxAPIKey;

function MiniMapComponent({ lat = 9.97032002433383, lng = 105.11054875065781, zoom, updateLatLngData}) {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [currentMarker, setCurrentMarker] = useState({
        Latitude: lat,
        Longitude: lng,
    });
    const mapContainer = useRef(null);
    const map = useRef(null);

    const updateMarker = async (event) => {
        setCurrentMarker(prevData => ({
            Latitude: event.lngLat.lat,
            Longitude: event.lngLat.lng,
        }));

        updateLatLngData(event.lngLat);
    };

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/thomasdang1812003/cm11wky8301du01pbdyaresom',
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on('load', () => {
            setMapLoaded(true);
        });

        map.current.getCanvas().style.cursor = 'default';

        map.current.on('click', (event) => updateMarker(event));

        return () => {
            map.current.off('click');
            map.current.off('load');
        };
    }, [currentMarker, zoom, map.current]);

    return (
        <div className='mini-map-wrapper'>
            <div ref={mapContainer} className="map-container" />
            <Marker
                currentMap={map.current}
                id={`marker`}
                placeData={{
                    Latitude: currentMarker.Latitude,
                    Longitude: currentMarker.Longitude,
                }}
                enableClick={false}
            />
        </div>
    );
}

export default MiniMapComponent;