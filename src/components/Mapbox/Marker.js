import { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { usePopupContext } from '../../context/PopupMapContext';
import MarkerPopupCard from "./MarkerPopupCard";

const Marker = ({ id, currentMap, placeData, handleShowModalInfo }) => {
    const markerRef = useRef();
    const popupRef = useRef();
    const { activeMarkerId, updatePopupContext } = usePopupContext();

    const createPopup = () => {
        const popupElement = document.createElement('div');

        ReactDOM.render(
            <MarkerPopupCard
                onClose={() => {
                    popupRef.current.remove();
                    updatePopupContext(null);
                }}
                data={placeData}
            />,
            popupElement
        );

        const newPopup = new mapboxgl.Popup({
            closeOnClick: false,
            closeButton: false,
            offset: [0, -40],
            anchor: "bottom",
        })
            .setLngLat([placeData.Longitude, placeData.Latitude])
            .setDOMContent(popupElement)
            .addTo(currentMap);

        popupRef.current = newPopup;

        setTimeout(() => {
            const popupElement = newPopup.getElement();
            popupElement.classList.add('open');
        }, 100);
    };

    const handleClick = () => {
        currentMap.flyTo({
            center: [
                placeData.Longitude,
                placeData.Latitude,
            ],
            zoom: 14,
            essential: true,
        });

        handleShowModalInfo(placeData);
    };

    useEffect(() => {
        if (!currentMap) return;

        const marker = new mapboxgl
            .Marker()
            .setLngLat([placeData.Longitude, placeData.Latitude])
            .addTo(currentMap);

        markerRef.current = marker;

        marker.getElement().addEventListener('click', handleClick);

        return () => {
            marker.getElement().removeEventListener('click', handleClick);
            marker.remove();

            if (popupRef.current) {
                popupRef.current.remove();
            }
        }
    }, [currentMap, placeData, id]);

    return null;
}

export default Marker;