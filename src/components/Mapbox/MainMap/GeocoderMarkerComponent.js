import { GpsFixed } from '@mui/icons-material';

const GeocoderMarker = () => {
    return (
        <div className='geocoder-marker' onClick={() => alert("Geocoder marker clicked!")}>
            <GpsFixed/>
        </div>
    )
}

export default GeocoderMarker;