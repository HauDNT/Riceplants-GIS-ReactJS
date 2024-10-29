import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axiosInstance from '../../common/AxiosInstance.js';
import DataTable from "../../components/DataTable.js";
import { formatDatetime } from "../../utils/FormatDateTime.js";
import Loading from '../../components/Loading.js';

function RestoreStaffs() {
    const [staffsData, setStaffsData] = useState([]);
    const headerNames = ['Mã nhân viên', 'Họ và tên', 'Email', 'Số điện thoại', 'Giới tính', 'Địa chỉ', 'Thời điểm xoá'];
    const [isLoading, setLoading] = useState(true);

    const fetchStaffsDeleted = async () => {
        try {
            const result = await axiosInstance.get(`/staffs/deleted`);
            if (result) {
                result.data.forEach(staff => {
                    staff.Gender = staff.Gender ? 'Nam' : 'Nữ';
                    staff.deletedAt = formatDatetime(staff.deletedAt);
                });

                setStaffsData(result.data);
            };
        } catch (error) {
            toast.error('Không thể lấy dữ liệu nhân viên bị xoá!');
        };
    };

    const restoreStaffs = async (staffIds) => {
        try {
            await Promise.all(
                staffIds.map(id => {
                    axiosInstance.patch(`/staffs/restore/${id}`);
                }),
            );

            setStaffsData(prevData => prevData.filter(staff => !staffIds.includes(staff.id)));

            toast.success('Khôi phục thành công');
        } catch (error) {
            console.log(error);
            toast.error('Khôi phục thất bại!');
        };
    };

    useEffect(() => {
        fetchStaffsDeleted();

        const timeoutId = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        isLoading ? (
            <Loading />
        ) : (
            <DataTable
                data={staffsData || []}
                columnHeadersName={headerNames}
                pageSize={staffsData.length}
                onRestore={restoreStaffs}
            />
        )
    )
}

export default RestoreStaffs;