import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import {
    TextField,
    Button,
    Container,
    Typography,
} from '@mui/material';
import { WarehousesContext } from '../../context/WarehousesContext.js';
import Loading from "../../components/Loading.js";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axiosInstance from "../../common/AxiosInstance.js";
import { softDeleteStaffs } from "../Staffs/Staffs.js";
import MiniMapComponent from "../../components/Mapbox/MiniMap/MiniMapComponent.js";
import DataTable from "../../components/DataTable.js";
import ImageWrapper from "../../components/ImageWrapper.js";

function WarehouseDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { updateValueOfWarehouseById } = useContext(WarehousesContext);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const headerStaffsTable = ['Mã nhân viên', 'Họ và tên', 'Email', 'Số điện thoại'];

    const fetchWarehouseDetail = async (id) => {
        try {
            const result = await axiosInstance.get(`/warehouses/details/${id}`);

            if (result) {
                setData(result.data);

                const intervalId = setInterval(() => setLoading(false), 1000);
                return () => clearInterval(intervalId);
            };
        } catch (error) {
            console.log(error);
            toast.error(`Đã xảy ra lỗi khi lấy dữ liệu của kho số ${id}`);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axiosInstance.put(`/warehouses/update/${id}`, data);

            if (result.status === 200) {
                toast.success('Cập nhật thông tin thành công');
            };
        } catch (error) {
            toast.error('Cập nhật thông tin thất bại! Vui lòng thử lại sau.')
        };
    };

    const updateAddress = (lngLat) => {
        setData(
            prevData => ({
                ...prevData,
                Latitude: lngLat.lat,
                Longitude: lngLat.lng,
            }),
        );
    };

    useEffect(() => {
        fetchWarehouseDetail(id);
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
                                Thông tin kho
                            </Typography>
                        </Col>
                    </Container>
                </Row>
                <Row>
                    <Col md={4} sm={12} className="form-avatar">
                        <ImageWrapper
                            objectId={id}
                            type={'warehouses'}
                            imgName={data.imageUrl}
                            enableChange={true}
                            afterChange={(fileName) => updateValueOfWarehouseById(id, 'imageUrl', fileName)}
                        />
                    </Col>
                    <Col md={8} sm={12} className="form-body">
                        <Container>
                            <Row>
                                <Col md={7} className="mb-1em">
                                    <Row>
                                        <MiniMapComponent
                                            lat={data?.Latitude}
                                            lng={data?.Longitude}
                                            zoom={14}
                                            updateLatLngData={(lngLat) => updateAddress(lngLat)}
                                        />
                                    </Row>
                                </Col>
                                <Col md={5}>
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <Row>
                                            <Col>
                                                <TextField
                                                    label="Tên kho"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    value={data?.Name}
                                                    onChange={(event) => setData({ ...data, Name: event.target.value })}
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
                                                    value={data?.Address}
                                                    onChange={(event) => setData({ ...data, Address: event.target.value })}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <TextField
                                                    label="Tung độ"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    value={data?.Latitude}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <TextField
                                                    label="Hoành độ"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    value={data?.Longitude}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{ flexDirection: 'row-reverse' }}>
                                            <Col md={4} sm={12}>
                                                <Button variant="contained" color="primary" type="submit" className="w-100">
                                                    Cập nhật
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12}>
                        <Row>
                            <Col md={12} sm={12}>
                                <Typography className="pt-0-5em pb-0-5em" variant="h5" >
                                    Danh sách nhân viên làm việc tại kho
                                </Typography>
                                <DataTable
                                    data={data?.staffs}
                                    columnHeadersName={headerStaffsTable}
                                    pageSize={data.staffs.length}
                                    action={{
                                        type: 'redirect',
                                        field: 'actions',
                                        name: 'Chi tiết',
                                        icon: <SearchOutlinedIcon />,
                                        callback: (id) => navigate(`/staffs/${id}`),
                                    }}
                                    onBack={false}
                                    onRestore={() => navigate('/staffs/restore')}
                                    onDelete={(staffIds) => {
                                        softDeleteStaffs(staffIds);

                                        setData(prevData => ({
                                            ...prevData,
                                            staffs: prevData.staffs.filter(staff => !staffIds.includes(staff.id)),
                                        }));
                                    }}
                                    disabledHeader={true}
                                    disabledFooter={true}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </BootstrapContainer>
        )
    );
}

export default WarehouseDetails;