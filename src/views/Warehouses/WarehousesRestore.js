import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import axiosInstance from '../../common/AxiosInstance.js';
import DataTable from "../../components/DataTable.js";
import { WarehousesContext } from '../../context/WarehousesContext.js';

function WarehousesRestore() {
    const [warehousesDeleted, setWarehousesDeleted] = useState([]);
    const { loadWarehousesData } = useContext(WarehousesContext);
    const headerNames = ['Mã kho', 'Tên kho', 'Địa chỉ', 'Kinh độ', 'Vĩ độ', 'Thời điểm xoá'];

    const fetchWarehousesDeletedData = async () => {
        try {
            const result = await axiosInstance.get('/warehouses/deleted');

            if (result) {
                setWarehousesDeleted(result.data);
            };
        } catch (error) {
            toast.error('Không thể lấy dữ liệu các kho bị xoá!');
        };
    };

    const forceDeletedWarehouses = async () => {

    };

    const restoreWarehouses = async (warehouseIds) => {
        try {
            await Promise.all(
                warehouseIds.map(id => axiosInstance.patch(`/warehouses/restore/${id}`))
            );

            setWarehousesDeleted(prevData =>
                prevData.filter(item => !warehouseIds.includes(item.id))
            );

            await loadWarehousesData();

            toast.success('Khôi phục kho thành công');
        } catch (error) {
            console.error("Error loading warehouses data: ", error);
            toast.error('Đã xảy ra lỗi trong quá trình khôi phục kho. Vui lòng kiểm tra lại.');
        }
    };

    useEffect(() => {
        fetchWarehousesDeletedData();
    }, []);

    return (
        <DataTable
            data={warehousesDeleted || []}
            columnHeadersName={headerNames}
            pageSize={warehousesDeleted.length}
            onDelete={forceDeletedWarehouses}
            onRestore={restoreWarehouses}
        />
    );
}

export default WarehousesRestore;