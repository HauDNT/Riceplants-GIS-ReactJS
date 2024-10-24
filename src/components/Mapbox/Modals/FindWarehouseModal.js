import { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Modal,
    Row,
} from 'react-bootstrap';

const FindWarehouseModal = ({ isEnable = false, handleCancelFind, handleFindPlace }) => {
    const [show, setShow] = useState(isEnable);
    const [warehouseName, setWarehouseName] = useState('');

    useEffect(() => setShow(isEnable), [isEnable]);

    const handleSubmit = (e) => {
        e.preventDefault();

        handleFindPlace(warehouseName);
        handleCancelFind();
        setWarehouseName('');
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
                            <Form.Label>Nhập vào tên kho cần tìm</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={warehouseName}
                                onChange={e => setWarehouseName(e.target.value)}
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
                    Tìm kho
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FindWarehouseModal;