import React from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import EmptyBoxImg from '../assets/images/empty-box.png';

function EmptyData() {
    return (
        <Row>
            <Col sm={12} xs={12} className='empty-data-container'>
                <img
                    src={EmptyBoxImg}
                />
                <h5 className='empty-data-title'>Không có dữ liệu</h5>
            </Col>
        </Row>
    )
}

export default EmptyData;