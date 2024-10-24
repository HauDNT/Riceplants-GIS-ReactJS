import Button from 'react-bootstrap/Button';
import {
    ZoomIn,
    ZoomOut,
    RestartAltOutlined,
    PushPinOutlined,
    ArrowBackIosNew,
    ArrowForwardIos,
    TravelExplore,
    Search,
} from '@mui/icons-material';
import { useState } from 'react';

const MapToolbar = ({ 
    onZoomIn, 
    onZoomOut, 
    onResetView, 
    findPlace, 
    addNewPlace,
    findWarehouse,
}) => {
    const [openFull, setOpenFull] = useState(false);

    const handleOpenFull = () => {
        setOpenFull(!openFull);
    };

    return (
        <div className={`map-toolbar ${openFull && 'tool-large'}`}>
            <Button variant="outline-primary" onClick={addNewPlace}>
                <PushPinOutlined/>
            </Button>
            <Button variant="outline-primary" onClick={findWarehouse} className='mt-10px'>
                <Search/>
            </Button>
            <Button variant="outline-primary" onClick={findPlace} className='mt-10px'>
                <TravelExplore/>
            </Button>
            <Button variant="outline-primary" onClick={onZoomIn} className='mt-10px'>
                <ZoomIn/>
            </Button>
            <Button variant="outline-primary" onClick={onZoomOut} className='mt-10px'>
                <ZoomOut/>
            </Button>
            <Button variant="outline-primary" onClick={onResetView} className='mt-10px'>
                <RestartAltOutlined/>
            </Button>

            {
                openFull ? (
                    <Button variant="outline-primary" onClick={handleOpenFull} className='mt-10px'>
                        <ArrowForwardIos/>
                    </Button>
                ) : (
                    <Button variant="outline-primary" onClick={handleOpenFull} className='mt-10px'>
                        <ArrowBackIosNew/>
                    </Button>
                )
            }
        </div>
    )
}

export default MapToolbar;