import {
    Container,
    Col,
    Row,
    Button,
<<<<<<< HEAD
    DropdownDivider
} from 'react-bootstrap';
import { Timer, Close } from '@mui/icons-material';
=======
    DropdownDivider,
    Image,
} from 'react-bootstrap';
import { Close } from '@mui/icons-material';
import { SERVER_URL } from '../../config/config';
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8

const MarkerPopup = ({ data, onClose }) => {
    return (
        <Container className='p-0'>
            <Row className='popup-header'>
                <Col md={9}>
                    <h6>{data.Name}</h6>
                </Col>
                <Col md={3}>
                    <Button onClick={onClose} className='popup-close-btn'>
                        <Close />
                    </Button>
                </Col>
            </Row>
            <DropdownDivider className='p-0' />
            <Row className='popup-content'>
<<<<<<< HEAD
                <Col md={12}>
                    <p>Địa chỉ: {data.Address}</p>
                </Col>
                <Col md={12}>
                    <p>Kinh độ: {data.Latitude}</p>
                </Col>
                <Col md={12}>
                    <p>Vĩ độ: {data.Longitude}</p>
=======
                <Col>
                    <Image className='w-100' src={SERVER_URL + '/warehouses/' + data.imageUrl} />
                </Col>
                <Col>
                    <Row>
                        <Col md={12}>
                            <p>Địa chỉ: {data.Address}</p>
                        </Col>
                        <Col md={12}>
                            <p>Kinh độ: {data.Latitude}</p>
                        </Col>
                        <Col md={12}>
                            <p>Vĩ độ: {data.Longitude}</p>
                        </Col>
                    </Row>
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8
                </Col>
            </Row>

        </Container>
    );
};

export default MarkerPopup;