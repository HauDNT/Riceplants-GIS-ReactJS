import { useState, useEffect, useContext } from 'react';
import {
    ReceiptLongOutlined,
    MapsHomeWorkOutlined,
    AccountCircleOutlined,
} from '@mui/icons-material';
import axiosInstance from '../../common/AxiosInstance.js';
import { WarehousesContext } from '../../context/WarehousesContext.js';
import { Container, Row, Col } from 'react-bootstrap';
import MapComponent from "../../components/Mapbox/MainMap/MapComponent.js";
import DashboardCard from '../../components/Cards/DashboardCard.js';
import Loading from '../../components/Loading.js';
import { toast } from 'react-toastify';

function Dashboard() {
    const { listWarehouses, loadWarehousesData, addToListWarehouses } = useContext(WarehousesContext);
    const [states, setStates] = useState({
        receiveBills: 0,
        dispatchBills: 0,
        warehouses: listWarehouses.length,
        staffs: 0,
        isLoading: true,
    });

    const updateStatesData = (key, value) => {
        setStates(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const fetchDashboardData = () => {
        Promise
            .all([
                axiosInstance.get('/receiving-slips/amount'),
                axiosInstance.get('/dispatch-slips/amount'),
                axiosInstance.get('/staffs/amount'),
                axiosInstance.get('/warehouses/amount'),
            ])
            .then(
                ([
                    resReBillsAmount,
                    resDisBillsAmount,
                    resStaffsAmount,
                    resWarehousesAmount,
                ]) => {
                    updateStatesData('receiveBills', resReBillsAmount.data.payload);
                    updateStatesData('dispatchBills', resDisBillsAmount.data.payload);
                    updateStatesData('warehouses', resWarehousesAmount.data.payload);
                    updateStatesData('staffs', resStaffsAmount.data.payload);
                }
            )
            .catch(error => {
                console.log(error);
                toast.error('Đã xảy ra lỗi trong quá trình tải dữ liệu!');
            });
    };
 
    const getNewestWarehouseJustAdded = async () => {
        const result = (await axiosInstance.get('/warehouses/newest'));
        if (result && result.data) {
            addToListWarehouses(result.data);
            updateStatesData('warehouses', states.warehouses + 1);
        };
    };
    
    useEffect(() => {
        if (listWarehouses.length === 0) {
            loadWarehousesData();
        };
        
        fetchDashboardData();

        const timeoutId = setTimeout(() => updateStatesData('isLoading', false), 1000);
        return () => clearTimeout(timeoutId);
    }, []);


    return (
        <Container fluid>
            {
                states.isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Row className='pt-1-5em'>
                            <DashboardCard
                                title='Đơn nhập'
                                icon={<ReceiptLongOutlined />}
                                number={states.receiveBills}
                            />
                            <DashboardCard
                                title='Đơn xuất'
                                icon={<ReceiptLongOutlined />}
                                number={states.dispatchBills}
                            />
                            <DashboardCard
                                title='Số lượng kho'
                                icon={<MapsHomeWorkOutlined />}
                                number={states.warehouses}
                            />
                            <DashboardCard
                                title='Số lượng nhân viên'
                                icon={<AccountCircleOutlined />}
                                number={states.staffs}
                            />
                        </Row>
                        <Row>
                            <Col sm={12} xs={12}>
                                <MapComponent
                                    placesData={listWarehouses || []}
                                    reloadData={() => getNewestWarehouseJustAdded()}
                                />
                            </Col>
                        </Row>
                    </>
                )
            }
        </Container>
    );
}

export default Dashboard;