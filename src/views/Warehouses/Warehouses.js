import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axiosInstance from '../../common/AxiosInstance';
import { WarehousesContext } from '../../context/WarehousesContext.js';
import { hideField } from '../../utils/HideFieldInData.js';
import AddWarehouseModal from '../../components/Modals/AddWarehouseModal.js';
import DataTable from "../../components/DataTable.js";
import Loading from '../../components/Loading.js';

function Warehouses() {
    const navigate = useNavigate();
    const { listWarehouses, loadWarehousesData, addToListWarehouses, deleteWarehouse } = useContext(WarehousesContext);
    const headerNames = ['Mã kho', 'Tên kho', 'Địa chỉ', 'Kinh độ', 'Vĩ độ'];
    const [enableAddModal, setEnableAddModal] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const softDeleteWarehouses = async (warehouseIds) => {
        try {
            warehouseIds.forEach(id => {
                axiosInstance.patch(`/warehouses/soft-delete/${id}`);
                deleteWarehouse(id);
            });

            toast.success('Xoá kho thành công');
        } catch (error) {
            toast.error('Đã xảy ra lỗi trong quá trình xoá kho. Vui lòng kiểm tra lại.');
        };
    };

    useEffect(() => {
        if (listWarehouses.length === 0) {
            loadWarehousesData();
        };

        const intervalId = setInterval(() => setLoading(false), 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container fluid>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <DataTable
                            data={hideField(listWarehouses, 'imageUrl') || []}
                            columnHeadersName={headerNames}
                            pageSize={listWarehouses.length}
                            onCreate={() => setEnableAddModal(true)}
                            onDelete={softDeleteWarehouses}
                            onRestore={() => navigate('restore')}
                            action={{
                                type: 'redirect',
                                field: 'actions',
                                name: 'Xem chi tiết',
                                icon: <BorderColorIcon />,
                                callback: (itemValue) => navigate(`/warehouses/${itemValue}`)
                            }}
                            autoHeight={false}
                        />

                        {
                            enableAddModal &&
                            <AddWarehouseModal
                                isEnable={enableAddModal}
                                handleClose={() => setEnableAddModal(false)}
                                afterAdd={(newWarehouse) => addToListWarehouses(newWarehouse)}
                            />
                        }
                    </>
                )
            }
        </Container>
    )
}

export default Warehouses;