import { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Modal,
    Row,
} from 'react-bootstrap';

const FindPlaceModal = ({ isEnable = false, handleCancelFind, handleFindPlace }) => {
    const [show, setShow] = useState(isEnable);
    const [address, setAddress] = useState('');

    useEffect(() => setShow(isEnable), [isEnable]);

    const handleSubmit = (e) => {
        e.preventDefault();

        handleFindPlace(address);
        handleCancelFind();
        setAddress('');
    };

    return (
        <Modal
            show={show}
            onHide={handleCancelFind}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Tìm địa chỉ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Row className="mb-3">
                        <Form.Group md="12" controlId="validationCustom01">
                            <Form.Label>Nhập vào địa chỉ cần tìm</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    type='button'
                    onClick={(e) => handleSubmit(e)}
                >
                    Tìm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FindPlaceModal;