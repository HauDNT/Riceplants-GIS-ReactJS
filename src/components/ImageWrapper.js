import { useState, useEffect } from 'react';
import { SERVER_URL } from '../config/config';
import axiosInstance from '../common/AxiosInstance';
import {
    Button,
    Container,
    Box,
} from '@mui/material';
import { Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ImageWrapper = ({ objectId, type, imgName, enableChange = true, afterChange = () => { } }) => {
    const [fileName, setFileName] = useState(imgName);

    const handleFileChange = async (event) => {
        const fileselected = event.target.files[0];

        if (!fileselected) {
            toast.warning("Vui lòng chọn một tệp.");
            return;
        };

        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
        if (fileselected.size > maxSizeInBytes) {
            toast.warning("Kích thước tệp phải nhỏ hơn 2MB");
            return;
        };

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(fileselected.type)) {
            toast.warning("Chỉ cho phép tệp hình ảnh JPEG hoặc PNG");
            return;
        };

        await uploadImage(fileselected);
    };

    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const updateResult = await axiosInstance.post(
                `/files/upload?type=${type}&id=${objectId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (updateResult.data.status) {
                toast.success("Cập nhật ảnh thành công!");
                setFileName(updateResult.data.fileName);
                afterChange(updateResult.data.fileName);
            };
        } catch (error) {
            console.log(error);
            toast.error("Đã xảy ra lỗi trong quá trình cập nhật ảnh!");
        }
    };

    return (
        <Container className='pt-1em px-0'>
            <Col className="avatar-wrapper">
                <img
                    src={`${SERVER_URL}/${type}/${fileName}`}
                />
            </Col>
            {
                enableChange &&
                <Col className="avatar-btn-wrapper mt-1em">
                    <input
                        type="file"
                        id="fileInputPicker"
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileInputPicker">
                        <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                        >Đổi ảnh</Button>
                    </label>
                </Col>
            }
        </Container>
    )
}

export default ImageWrapper;