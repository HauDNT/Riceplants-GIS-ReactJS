import { useEffect, useState, useContext } from 'react';
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import {
    TextField,
    InputLabel,
    Select,
    Button,
    Container,
    Typography,
    MenuItem,
    FormControl,
    Backdrop,
    Box,
    Modal,
    Fade,
} from '@mui/material';
import { WarehousesContext } from '../../context/WarehousesContext.js';
import axiosInstance from '../../common/AxiosInstance';
import { toast } from 'react-toastify';

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
    maxWidth: '95%',
};

const AddStaffModal = ({
    isEnable = false,
    handleClose,
    afterAdd,
}) => {
    const initValues = {
        Fullname: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
        Gender: true,
        Address: '',
        warehouse: 0,
    };
    const [show, setShow] = useState(isEnable);
    const [values, setValues] = useState(initValues);
    const { listWarehouses } = useContext(WarehousesContext);

    useEffect(() => setShow(isEnable), [isEnable]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const result = await axiosInstance.post('/staffs/create', values);

            if (result.data.payload) {
                toast.success('Tạo nhân viên mới thành công!');
                setValues(initValues);
                handleClose();
                afterAdd(result.data.payload);
            }
            else {
                toast.error('Tạo nhân viên mới thất bại!');
            };
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi trong quá trình tạo nhân viên! Vui lòng thử lại sau.')
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
                        Thêm nhân viên mới
                    </Typography>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Row>
                            <Col>
                                <TextField
                                    label="Họ và tên"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={values.Fullname}
                                    onChange={(event) => setValues({ ...values, Fullname: event.target.value })}
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
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="email"
                                    value={values.Email}
                                    onChange={(event) => setValues({ ...values, Email: event.target.value })}
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
                                    label="Số điện thoại"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={values.PhoneNumber}
                                    onChange={(event) => setValues({ ...values, PhoneNumber: event.target.value })}
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
                                    label="Mật khẩu"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={values.Password}
                                    onChange={(event) => setValues({ ...values, Password: event.target.value })}
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
                                    label="Địa chỉ"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
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
                                <FormControl className="mt-1em" fullWidth>
                                    <InputLabel id="select-gender">Giới tính</InputLabel>
                                    <Select
                                        labelId="select-gender"
                                        id="demo-simple-select"
                                        value={values.Gender}
                                        label="Giới tính"
                                        onChange={(event) => setValues({ ...values, Gender: event.target.value })}
                                    >
                                        <MenuItem value={true}>Nam</MenuItem>
                                        <MenuItem value={false}>Nữ</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormControl className="mt-1-5em" fullWidth>
                                    <InputLabel id="select-warehouse">Kho trực</InputLabel>
                                    <Select
                                        labelId="select-warehouse"
                                        id="demo-simple-select"
                                        value={values.warehouse}
                                        label="Kho trực"
                                        onChange={(event) => setValues({ ...values, warehouse: event.target.value })}
                                    >
                                        <MenuItem value={0}>Chọn kho</MenuItem>
                                        {
                                            listWarehouses.map(item => (
                                                <MenuItem value={item.id}>
                                                    {item.Name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row style={{ flexDirection: 'row-reverse', marginTop: '1em' }}>
                            <Col>
                                <Button variant="contained" color="primary" type="submit" className="w-100">
                                    Cập nhật
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddStaffModal;