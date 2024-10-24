import { useState, useEffect, useContext } from "react";
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { Autocomplete, TextField, Typography, Box, Divider, Button } from '@mui/material';
import { SERVER_URL } from '../../config/config';
import { WarehousesContext } from '../../context/WarehousesContext';
import axiosInstance from '../../common/AxiosInstance';
import { toast } from 'react-toastify';
import DynamicDataTableCreateBill from "../../components/DynamicDataTableCreateBill";

function AddBillPage() {
    const [states, setStates] = useState({
        staffs: [],
        customers: [],
        riceplants: [],
        billType: null,
        staffSelectedId: null,
        customerSelectedId: null,
        warehouseSelectedId: null,
        riceSelectInfo: {
            id: 0,
            Name: '',
            Amount: 0,
            UnitPrice: 0,
        },
        listRicesOfBill: [],
    });
    const { listWarehouses, loadWarehousesData } = useContext(WarehousesContext);

    const updateStatesData = (key, value) => {
        setStates(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const updateStateNestFieldChildData = (field, callback) => {
        setStates(prevStates => ({
            ...prevStates,
            [field]: {
                ...prevStates[field],
                ...callback(prevStates[field]),
            },
        }));
    };

    const fetchCustomers = async () => {
        try {
            const result = await axiosInstance.get('/customers/all');
            if (result.data.payload) {
                updateStatesData('customers', result.data.payload);
            };
        } catch (error) {
            console.log(error);
            toast.error('Xảy ra lỗi khi lấy dữ liệu khách hàng!');
        };
    };

    const fetchStaffs = async () => {
        try {
            const result = await axiosInstance.get('/staffs/all');
            if (result.data.payload) {
                updateStatesData('staffs', result.data.payload);
            };
        } catch (error) {
            console.log(error);
            toast.error('Xảy ra lỗi khi lấy dữ liệu nhân viên!');
        };
    };

    const fetchRiceplants = async () => {
        try {
            const result = await axiosInstance.get('/riceplants/all');
            if (result.data.payload) {
                updateStatesData('riceplants', result.data.payload);
            };
        } catch (error) {
            console.log(error);
            toast.error('Xảy ra lỗi khi lấy dữ liệu lúa!');
        };
    };

    const resetStatesAfterCreateBill = () => {
        // updateStatesData("staffSelectedId", null);
        // updateStatesData("customerSelectedId", null);
        // updateStatesData("warehouseSelectedId", null);
        updateStatesData("listRicesOfBill", []);
        updateStatesData("riceSelectInfo", {
            id: 0,
            Name: '',
            Amount: 0,
            UnitPrice: 0,
        });
    };

    const addBillDataToTableData = (newData) => {
        if (newData.id === 0 || !newData.Name || newData.Amount <= 0 || newData.UnitPrice <= 0) {
            toast.warning('Thông tin nhập - xuất không hợp lệ!');
            return;
        };

        updateStatesData("listRicesOfBill", [...states.listRicesOfBill, newData]);
        updateStatesData("riceSelectInfo", {
            id: 0,
            Name: '',
            Amount: 0,
            UnitPrice: 0,
        });
    };

    const validateDataBeforeCreateBill = (data) => {
        const values = Object.values(data);

        const hasNullValue = values.some(value => {
            return value === null;
        });

        return !hasNullValue;
    };

    const createReceiveBill = async (billInfo, listRices) => {
        try {
            const result_1 = await axiosInstance.post(
                '/receiving-slips/create',
                billInfo
            );

            if (result_1.data.payload) {
                const receiveBillIdCreated = result_1.data.payload.id;
                const result_2 = await axiosInstance.post(
                    '/receiving-rices/create',
                    {
                        receiveSlipId: receiveBillIdCreated,
                        listRices,
                    }
                );

                if (result_2.data.payload === true) {
                    resetStatesAfterCreateBill();
                    toast.success('Tạo hoá đơn thành công');
                };
            };
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi trong quá trình tạo hoá đơn nhận');
        };
    };

    const createDispatchBill = async (billInfo, listRices) => {
        try {
            const result_1 = await axiosInstance.post(
                '/dispatch-slips/create',
                billInfo
            );

            if (result_1.data.payload) {
                const dispatchBillIdCreated = result_1.data.payload.id;
                const result_2 = await axiosInstance.post(
                    '/dispatch-rices/create',
                    {
                        dispatchSlipId: dispatchBillIdCreated,
                        listRices,
                    }
                );

                if (result_2.data.payload === true) {
                    resetStatesAfterCreateBill();
                    toast.success('Tạo hoá đơn thành công');
                };
            };
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi trong quá trình tạo hoá đơn xuất');
        };
    };

    const handleCreateBill = async () => {
        const billInfo = {
            billType: states.billType,
            staffId: states.staffSelectedId,
            customerId: states.customerSelectedId,
            warehouseId: states.warehouseSelectedId,
        };

        if (validateDataBeforeCreateBill(billInfo)) {
            switch (billInfo.billType) {
                case 1:
                    await createReceiveBill(billInfo, states.listRicesOfBill);
                    break;
                case 2:
                    await createDispatchBill(billInfo, states.listRicesOfBill);
                    break;
                default:
                    break;
            };
        }
        else {
            toast.error('Phải điền đủ thông tin hoá đơn trước khi tạo!');
        };
    };

    useEffect(() => {
        fetchCustomers();
        fetchStaffs();
        fetchRiceplants();

        if (listWarehouses.length === 0) loadWarehousesData();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Typography gutterBottom variant="h5" component="div" className="heading-page">
                        Thêm hoá đơn mới
                    </Typography>
                </Col>
            </Row>
            <div className="bill-container">
                <Row>
                    <Typography gutterBottom variant="body1" component="div" className="bill-subheading">
                        Thông tin khách hàng
                    </Typography>
                    <Col md={3} sm={12} className="pt-1em">
                        <Autocomplete
                            id="customer-select"
                            options={states.customers}
                            autoHighlight
                            getOptionLabel={(option) => option.Fullname}
                            clearIcon={false}
                            onChange={(e, newValue) => updateStatesData('customerSelectedId', newValue.id)}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        {option.Fullname}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn khách hàng"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                    <Col md={3} sm={12} className="pt-1em">
                        <Autocomplete
                            id="warehouse-select"
                            options={listWarehouses}
                            autoHighlight
                            getOptionLabel={(option) => option.Name}
                            clearIcon={false}
                            onChange={(e, newValue) => { updateStatesData('warehouseSelectedId', newValue.id) }}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="80"
                                            srcSet={`${SERVER_URL}/warehouses/${option.imageUrl}`}
                                            src={`${SERVER_URL}/warehouses/${option.imageUrl}`}
                                            alt=""
                                        />
                                        {option.Name}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn kho"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                    <Col md={3} sm={12} className="pt-1em">
                        <Autocomplete
                            id="staff-select"
                            options={states.staffs}
                            autoHighlight
                            getOptionLabel={(option) => option.Fullname}
                            clearIcon={false}
                            onChange={(e, newValue) => { updateStatesData('staffSelectedId', newValue.id) }}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="80"
                                            srcSet={`${SERVER_URL}/staffs/${option.imageUrl}`}
                                            src={`${SERVER_URL}/staffs/${option.imageUrl}`}
                                            alt=""
                                        />
                                        {option.Fullname}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn nhân viên"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                    <Col md={3} sm={12} className="pt-1em">
                        <Autocomplete
                            id="bill-type-select"
                            options={[
                                { type: 'Nhập lúa', value: 1 },
                                { type: 'Xuất lúa', value: 2 }
                            ]}
                            autoHighlight
                            getOptionLabel={(option) => option.type}
                            clearIcon={false}
                            onChange={(e, newValue) => { updateStatesData('billType', newValue.value) }}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        {...optionProps}
                                    >
                                        {option.type}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Loại hoá đơn"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Divider sx={{ mt: 3, mb: 1 }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Typography gutterBottom variant="body1" component="div" className="bill-subheading">
                            Thông tin nhập - xuất
                        </Typography>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} sm={12} className="pt-1em">
                        <Autocomplete
                            id="rice-select"
                            options={states.riceplants}
                            autoHighlight
                            getOptionLabel={(option) => option.Name}
                            clearIcon={false}
                            onChange={(e, newValue) => {
                                updateStateNestFieldChildData(
                                    "riceSelectInfo",
                                    () => ({
                                        id: newValue.id,
                                        Name: newValue.Name,
                                    })
                                );
                            }}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        ssx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="80"
                                            // srcSet={`${SERVER_URL}/riceplants/${option.imageUrl}`}
                                            // src={`${SERVER_URL}/riceplants/${option.imageUrl}`}
                                            srcSet={`${option.imageUrl}`}
                                            src={`${option.imageUrl}`}
                                            alt=""
                                        />
                                        {option.Name}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn loại lúa"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Col>
                    <Col md={2} sm={12} className="pt-1em">
                        <TextField
                            label="Số lượng"
                            sx={{ width: '100%' }}
                            type="number"
                            value={states.riceSelectInfo.Amount}
                            onChange={(e) => updateStateNestFieldChildData(
                                "riceSelectInfo",
                                () => ({ Amount: e.target.value })
                            )}
                        />
                    </Col>
                    <Col md={2} sm={12} className="pt-1em">
                        <TextField
                            label="Đơn giá"
                            sx={{ width: '100%' }}
                            type="number"
                            value={states.riceSelectInfo.UnitPrice}
                            onChange={(e) => updateStateNestFieldChildData(
                                "riceSelectInfo",
                                () => ({ UnitPrice: e.target.value })
                            )}
                        />
                    </Col>
                    <Col md={3} sm={12} className="pt-1em">
                        <TextField
                            label="Thành tiền"
                            sx={{ width: '100%' }}
                            type="number"
                            disabled
                            value={states.riceSelectInfo.UnitPrice * states.riceSelectInfo.Amount}
                        />
                    </Col>
                    <Col md={2} sm={12} className="pt-1em">
                        <Button
                            variant="contained"
                            color="success"
                            type="button"
                            sx={{ width: '100%', height: '100%', borderRadius: '100px' }}
                            onClick={() => addBillDataToTableData(states.riceSelectInfo)}
                        >
                            <Typography gutterBottom variant="body1" component="div" className="bill-subheading" sx={{ textAlign: 'center' }}>
                                Thêm
                            </Typography>
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-1em mb-1-5em">
                    <Col>
                        <DynamicDataTableCreateBill
                            headers={['STT', 'Loại lúa', 'Số lượng', 'Đơn giá', 'Thành tiền']}
                            data={states.listRicesOfBill}
                        />
                    </Col>
                </Row>
                <Row className="mt-1em mb-1-5em flex-row-reverse">
                    <Col md={2} sm={12}>
                        <Button
                            variant="contained"
                            color="info"
                            type="button"
                            sx={{ width: '100%', height: '100%', borderRadius: '100px' }}
                            onClick={handleCreateBill}
                        >
                            Tạo hoá đơn
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default AddBillPage;