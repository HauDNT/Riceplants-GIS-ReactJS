import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axiosInstance from '../../common/AxiosInstance.js';
import DataTable from "../../components/DataTable.js";
import AddCustomerModal from "../../components/Modals/AddCustomerModal.js";
import UpdateCustomerModal from "./UpdateCustomerModal.js";
import Loading from '../../components/Loading.js';

function Customers() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [customersSelected, setCustomerSelected] = useState(null);
    const [enableAddModal, setEnableAddModal] = useState(false);
    const [enableUpdateModal, setEnableUpdateModal] = useState(false);
    const headerNames = ['Mã khách hàng', 'Họ và tên', 'Email', 'Số điện thoại', 'Giới tính', 'Địa chỉ'];
    const [isLoading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        const result = await axiosInstance.get('/customers/all');

        if (result.data) {
            setCustomers(result.data.payload);
        };
    };

    const softDeleteCustomers = async (customerIds) => {
        try {
            await Promise.all(
                customerIds.map(id => {
                    axiosInstance.patch(`/customers/soft-delete/${id}`);
                }),
            );

            toast.success('Xoá khách hàng thành công');
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi trong quá trình xoá khách hàng. Vui lòng kiểm tra lại.');
        }
    };

    useEffect(() => {
        try {
            fetchCustomers();

            const timeoutId = setTimeout(() => setLoading(false), 1000);
            return () => clearTimeout(timeoutId);
        } catch (error) {
            console.log(error);
            toast.error('Xảy ra lỗi trong quá trình tải dữ liệu khách hàng!');
        };
    }, []);

    return (
        <Container fluid>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Row>
                            <Col>
                                <Typography gutterBottom variant="h5" component="div" className="heading-page">
                                    Danh sách khách hàng
                                </Typography>
                            </Col>
                        </Row>
                        <DataTable
                            data={customers || []}
                            columnHeadersName={headerNames}
                            pageSize={customers.length}
                            onCreate={() => setEnableAddModal(true)}
                            onDelete={(customerIds) => {
                                softDeleteCustomers(customerIds);
                                setCustomers(prevData => prevData.filter(customer => !customerIds.includes(customer.id)));
                            }}
                            onRestore={() => navigate('/customers/restore')}
                            action={{
                                type: 'redirect',
                                field: 'actions',
                                name: 'Xem chi tiết',
                                icon: <BorderColorIcon />,
                                callback: (customerId) => {
                                    setCustomerSelected(customers.find(customer => customer.id === customerId));
                                    setEnableUpdateModal(true);
                                }
                            }}
                            autoHeight={false}
                        />
                        <AddCustomerModal
                            isEnable={enableAddModal}
                            handleClose={() => setEnableAddModal(false)}
                            afterAdd={(newCustomer) => setCustomers((prevCustomers) => [...prevCustomers, newCustomer])}
                        />
                        <UpdateCustomerModal
                            data={customersSelected}
                            isEnable={enableUpdateModal}
                            handleClose={() => setEnableUpdateModal(false)}
                            afterUpdate={(customerUpdated) => {
                                setCustomers(prevCustomers =>
                                    prevCustomers.map(customer =>
                                        customer.id === customerUpdated.id
                                            ? { ...customer, ...customerUpdated }
                                            : customer
                                    )
                                );
                            }}
                        />
                    </>
                )
            }
        </Container>
    )
}

export default Customers;