import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import RicePlantCard from '../../components/Cards/RicePlantCard';
import axiosInstance from '../../common/AxiosInstance';

function Riceplants() {
    const [rices, setRices] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(true);
    const [stopLoading, setStopLoading] = useState(false);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    const fetchCustomers = async () => {
        try {
            setLazyLoading(true);

            await new Promise(resolve => setTimeout(resolve, 1000));

            const result = await axiosInstance.get(`/riceplants?page=${page}&limit=12`);

            if (result.data.payload) {
                if (result.data.payload.length > 0) {
                    setRices((prevData) => [...prevData, ...result.data.payload]);
                }
                else {
                    setStopLoading(true);
                    toast.info('Đã tải hết dữ liệu');
                };
            };
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi trong quá trình tải dữ liệu. Vui lòng kiểm tra lại.');
        } finally {
            setLazyLoading(false);
        };
    };

    useEffect(() => {
        if (!stopLoading) {
            fetchCustomers();
        };
    }, [page]);

    useEffect(() => {
        const handleObserve = (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !lazyLoading) {
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
    }, [lazyLoading]);

    return (
        <Container fluid style={{ padding: '1.5em' }}>
            <Row>
                {
                    rices.map((rice) => (
                        <Col md={3} sm={12}>
                            <RicePlantCard
                                id={rice.id}
                                Name={rice.Name}
                                Description={rice.Description}
                                imageUrl={rice.imageUrl}
                            />
                        </Col>
                    ))
                }
            </Row>
            <Row>
                <div ref={loader} style={{ textAlign: 'center', margin: '20px 0' }}>
                    {lazyLoading && <CircularProgress />}
                </div>
            </Row>
        </Container>
    )
}

export default Riceplants;