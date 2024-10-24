import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axiosInstance from '../../common/AxiosInstance.js';
import DataTable from "../../components/DataTable.js";
import { formatDatetime } from "../../utils/FormatDateTime.js";
import Loading from '../../components/Loading.js';

function CustomersRestore() {
    const [customers, setCustomers] = useState([]);
    const headerNames = ['STT', 'Họ và tên', 'Email', 'Số điện thoại', 'Giới tính', 'Địa chỉ', 'Thời điểm xoá'];
    const [isLoading, setLoading] = useState(true);

    const fetchCustomersDeleted = async () => {
        try {
            const result = await axiosInstance.get('/customers/deleted');

            if (result.data.payload) {
                result.data.payload.forEach(customer => {
                    customer.Gender = customer.Gender ? 'Nam' : 'Nữ';
                    customer.deletedAt = formatDatetime(customer.deletedAt);
                });
            };

            setCustomers(result.data.payload);
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi khi lấy dữ liệu khách hàng bị xoá.');
        };
    };

    const restoreCustomers = async (customerIds) => {
        try {
            await Promise.all(
                customerIds.map(id => {
                    axiosInstance.patch(`/customers/restore/${id}`);
                }),
            );

            setCustomers(prevData => prevData.filter(customer => !customerIds.includes(customer.id)));

            toast.success('Khôi phục thành công');
        } catch (error) {
            console.log(error);
            toast.error('Khôi phục thất bại!');
        };
    };

    useEffect(() => {
        fetchCustomersDeleted();

        const timeoutId = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        isLoading ? (
            <Loading />
        ) : (
            <DataTable
                data={customers || []}
                columnHeadersName={headerNames}
                pageSize={customers.length}
                onRestore={restoreCustomers}
            />
        )
    )
}

export default CustomersRestore;