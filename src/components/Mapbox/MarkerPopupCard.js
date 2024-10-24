import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActionArea,
    CardActions,
    Divider,
    Chip,
} from '@mui/material';
import { SERVER_URL } from '../../config/config';

const MarkerPopupCard = ({ 
    data, 
    onShowStatisticsModal,
    onClose,
}) => {
    const navigate = useNavigate();

    return (
        <Card key={data.id} className="marker-popup-card">
            <CardActionArea onClick={() => navigate(`/warehouses/${data.id}`)}>
                <CardMedia
                    component="img"
                    width="100%"
                    image={SERVER_URL + '/warehouses/' + data.imageUrl}
                    alt="Ảnh nhà kho"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.Name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Địa chỉ: {data.Address.length > 100 ? `${data.Address.slice(0, 100)}...` : data.Address}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', paddingTop: '0.5em' }}>
                        Kinh độ: {data.Latitude}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', paddingTop: '0.5em' }}>
                        Vĩ độ: {data.Longitude}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Divider textAlign='center'>
                <Chip
                    label="Thao tác"
                    size="small"
                    color='primary'
                    variant='outlined'
                />
            </Divider>
            <CardActions style={{ justifyContent: 'space-between' }}>
                <Button size="small" color="error" variant="contained" style={{ marginTop: '0.5em' }} onClick={onClose}>
                    Đóng
                </Button>
                <Button size="small" color="primary" variant="contained" onClick={onShowStatisticsModal}>
                    Xem thống kê
                </Button>
            </CardActions>
        </Card>
    );
}

export default MarkerPopupCard;