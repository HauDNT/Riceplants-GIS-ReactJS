import { Col } from "react-bootstrap";

const DashboardCard = ({
    title,
    icon,
    number,
}) => {
    return (
        <Col md={3} sm={12}>
            <div className='card-container'>
                <div className='w-100 card-header d-flex'>
                    <h5 className="m-0 w-100">
                        {title}
                    </h5>
                    <div className="text-end">
                        {icon}
                    </div>
                </div>
                <div className="card-content">
                    <h1>
                        {number}
                    </h1>
                </div>
            </div>
        </Col>
    );
}

export default DashboardCard;