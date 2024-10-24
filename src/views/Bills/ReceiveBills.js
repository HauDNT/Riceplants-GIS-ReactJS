import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { Col, Container, Row } from "react-bootstrap";
import { CircularProgress } from '@mui/material';
import axiosInstance from '../../common/AxiosInstance';
import BillCard from "../../components/Cards/BillCard";
import { formatDatetime } from "../../utils/FormatDateTime";
import { formatCash } from "../../utils/FornatCash";

function ReceiveBills() {
    const [bills, setBills] = useState([]);
    const [stopLoading, setStopLoading] = useState(false);

    const [lazyLoad, setLazyLoad] = useState(true);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    const fetchBillsData = async () => {
        try {
            setLazyLoad(true);

            await new Promise(resolve => setTimeout(resolve, 1000));

            const result = await axiosInstance.get(`/receiving-slips?page=${page}`);
            if (result.data.payload.length > 0) {
                setBills((prevData) => [...prevData, ...result.data.payload]);
            }
            else {
                setStopLoading(true);
            };
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi khi tải hoá đơn nhập kho!');
        } finally {
            setLazyLoad(false);
        };
    };

    useEffect(() => {
        if (!stopLoading) {
            fetchBillsData();
        }
        else {
            toast.info('Toàn bộ dữ liệu đã được tải lên');
        }
    }, [page]);

    useEffect(() => {
        const handleObserve = (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !lazyLoad) {
                setPage(prev => prev + 1);
            };
        };

        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserve, options);
        if (loader.current) {
            observer.observe(loader.current);
        };

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [lazyLoad]);

    return (
        <Container fluid style={{ padding: '1.5em' }}>
            <Row>
                {
                    bills.map((item, index) => (
                        <Col xl={4} md={6} sm={12} key={item.billInfo.id}>
                            <BillCard
                                key={item.billInfo.id}
                                index={index + 1}
                                billId={item.billInfo.id}
                                customer={item.billInfo.customer}
                                staff={item.billInfo.staff}
                                warehouse={item.billInfo.warehouse}
                                amountRiceTypes={item.billInfo.receiveRices.length}
                                totalPrice={formatCash(item.totalBill, 'VND')}
                                createdAt={formatDatetime(item.billInfo.CreatedAt)}
                            />
                        </Col>
                    ))
                }
            </Row>
            <Row>
                <div ref={loader} style={{ textAlign: 'center', margin: '20px 0' }}>
                    {lazyLoad && <CircularProgress />}
                </div>
            </Row>
        </Container>
    );
}

export default ReceiveBills;