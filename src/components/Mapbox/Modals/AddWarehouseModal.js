import { useEffect, useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import axiosInstance from "../../../common/AxiosInstance";
import { toast } from 'react-toastify';

const AddWarehouseModal = ({ isEnable = false, latitude, longitude, afterAddAction, cancelAction }) => {
    const [show, setShow] = useState(isEnable);
    const [validated, setValidated] = useState(false);

    const initValues = {
        Name: '',
        Address: '',
    };

    const [values, setValues] = useState(initValues);

    const handleValidation = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    useEffect(() => {
        setValues(initValues);
        setValidated(false);
        setShow(isEnable);
    }, [latitude, longitude, isEnable]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleValidation(event);

        if (validated) {
            try {
                const result = await axiosInstance.post('/warehouses/create', { ...values, Latitude: latitude, Longitude: longitude });

                if (result.status === 201) {
                    toast.success('Thêm kho mới thành công!');
                    afterAddAction();
                }
            } catch (error) {
                toast.error('Thêm kho mới thất bại. Vui lòng thử lại.');
            }
        }
    };

    const handleCancelAction = () => {
        setValidated(false);
        cancelAction();
    };

    return (
        <Modal
            show={show}
            onHide={handleCancelAction}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm kho mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Tên kho</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Kho số ..."
                                value={values.Name}
                                onChange={e => setValues({ ...values, Name: e.target.value })}
                            />
                            <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Mô tả chi tiết"
                                value={values.Address}
                                onChange={e => setValues({ ...values, Address: e.target.value })}
                            />
                            <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                            <Form.Label>Kinh độ</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={latitude}
                                disabled
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom04">
                            <Form.Label>Vĩ độ</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={longitude}
                                disabled
                            />
                        </Form.Group>
                    </Row>
                    <Modal.Footer className='pe-0'>
                        <Button
                            variant="primary"
                            type='submit'
                        >
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddWarehouseModal;