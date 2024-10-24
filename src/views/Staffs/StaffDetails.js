import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { WarehousesContext } from '../../context/WarehousesContext.js';
import axiosInstance from "../../common/AxiosInstance";
import Loading from "../../components/Loading.js";
import { toast } from "react-toastify";
import ImageWrapper from "../../components/ImageWrapper";

function StaffDetails() {
    const { id } = useParams();
    const [staffData, setStaffData] = useState(null);
    const { listWarehouses } = useContext(WarehousesContext);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);

    const fetchStaffData = async () => {
        try {
            const result = await axiosInstance.get(`/staffs/details/${id}`);

            if (result) {
                setStaffData(result.data);

                const intervalId = setInterval(() => setLoading(false), 1000);
                return () => clearInterval(intervalId);
            };
        } catch (error) {
            console.log(error);
            toast.error(`Đã xảy ra lỗi khi lấy dữ liệu của kho số ${id}`);
        };
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const result = await axiosInstance.put(`/staffs/update/${id}`, staffData);

            if (result) {
                toast.success('Cập nhật thông tin thành công!');
            }
            else {
                toast.error('Cập nhật thông tin thất bại!');
            };
        } catch (error) {
            
        }
    };

    useEffect(() => {
        fetchStaffData(id);
    }, []);

    return (
        isLoading ? (
            <Loading />
        ) : (
            <BootstrapContainer fluid className="form mt-1em">
                <Row>
                    <Container>
                        <Col md={12} sm={12}>
                            <Typography variant="h5">
                                Thông tin nhân viên
                            </Typography>
                        </Col>
                    </Container>
                </Row>
                <Row>
                    <Col md={4} sm={12} className="form-avatar">
                        <ImageWrapper
                            objectId={id}
                            type={'staffs'}
                            imgName={staffData.imageUrl}
                            enableChange={true}
                            afterChange={(fileName) => setStaffData({ ...staffData, imageUrl: fileName })}
                        />
                    </Col>
                    <Col md={8} sm={12} className="form-body">
                        <Container>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <TextField
                                            label="Họ và tên"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={staffData?.Fullname}
                                            onChange={(event) => setStaffData({ ...staffData, Fullname: event.target.value })}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <TextField
                                            label="Địa chỉ"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={staffData?.Address}
                                            onChange={(event) => setStaffData({ ...staffData, Address: event.target.value })}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={staffData?.Email}
                                            onChange={(event) => setStaffData({ ...staffData, Email: event.target.value })}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <TextField
                                            label="Số điện thoại"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={staffData?.PhoneNumber}
                                            onChange={(event) => setStaffData({ ...staffData, PhoneNumber: event.target.value })}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <FormControl className="mt-1em" fullWidth>
                                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={staffData.Gender}
                                                label="Giới tính"
                                                onChange={(event) => setStaffData({ ...staffData, Gender: event.target.value })}
                                            >
                                                <MenuItem value={true}>Nam</MenuItem>
                                                <MenuItem value={false}>Nữ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <FormControl className="mt-1em" fullWidth>
                                            <InputLabel id="demo-simple-select-label">Kho trực</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={staffData.warehouse}
                                                label="Giới tính"
                                                onChange={(event) => setStaffData({ ...staffData, warehouse: event.target.value })}
                                            >
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
                                <Row style={{ flexDirection: 'row-reverse'}}>
                                    <Col md={3} sm={12}>
                                        <Button variant="contained" color="primary" type="submit" className="w-100">
                                            Cập nhật
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                    </Col>
                </Row>
            </BootstrapContainer>
        )
    );
}

export default StaffDetails;