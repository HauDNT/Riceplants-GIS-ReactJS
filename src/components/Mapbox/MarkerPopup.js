import {
    Container,
    Col,
    Row,
    Button,
    DropdownDivider,
    Image,
} from 'react-bootstrap';
import { Close } from '@mui/icons-material';
import { SERVER_URL } from '../../config/config';

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
                </Col>
            </Row>

        </Container>
    );
};

export default MarkerPopup;