import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
    TextField,
    Button,
    Typography,
    Backdrop,
    Box,
    Modal,
    Fade,
    Divider,
} from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../../common/AxiosInstance';
import MiniMapComponent from '../Mapbox/MiniMap/MiniMapComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '.5px solid #ccc',
    boxShadow: 24,
    p: 4,
    width: 500,
    height: '95%',
    overflowY: 'scroll',
};

const AddWarehouseModal = ({
    isEnable = false,
    handleClose,
    afterAdd,
}) => {
    const initValues = {
        Name: '',
        Latitude: 9.97032002433383,
        Longitude: 105.11054875065781,
        Address: '',
    };
    const [show, setShow] = useState(isEnable);
    const [values, setValues] = useState(initValues);

    useEffect(() => setShow(isEnable), [isEnable]);

    const updateAddress = (lngLat) => {
        setValues(
            prevData => ({
                ...prevData,
                Latitude: lngLat.lat,
                Longitude: lngLat.lng,
            }),
        );
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const result = await axiosInstance.post('/warehouses/create', values);

            if (result.data.payload) {
                toast.success('Thêm thông tin kho mới thành công!');

                afterAdd(result.data.payload);
                handleClose();
            }
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi trong quá trình thêm kho! Vui lòng thử lại sau.')
        };
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={show}
            onClose={() => {
                setValues(initValues);
                handleClose();
            }}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={show}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Thêm kho mới
                    </Typography>
                    <Divider style={{ margin: '10px 0 5px'}}/>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Row>
                            <Col>
                                <TextField
                                    label="Tên kho"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={values.Name}
                                    onChange={(event) => setValues({ ...values, Name: event.target.value })}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <MiniMapComponent
                                    lat={values.Latitude}
                                    lng={values.Longitude}
                                    zoom={14}
                                    updateLatLngData={(lngLat) => updateAddress(lngLat)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField
                                    label="Địa chỉ"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="text"
                                    value={values.Address}
                                    onChange={(event) => setValues({ ...values, Address: event.target.value })}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField
                                    label="Vĩ độ"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={values.Latitude}
                                    onChange={(event) => setValues({ ...values, Latitude: event.target.value })}
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField
                                    label="Kinh độ"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={values.Longitude}
                                    onChange={(event) => setValues({ ...values, Longitude: event.target.value })}
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row style={{ flexDirection: 'row-reverse', marginTop: '1em' }}>
                            <Col>
                                <Button variant="contained" color="primary" type="submit" className="w-100">
                                    Thêm
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Box>
            </Fade>
        </Modal>
    )
}

export default AddWarehouseModal