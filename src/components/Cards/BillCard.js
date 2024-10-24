import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Menu,
    MenuItem,
    Divider,
    Chip,
    Card,
    CardHeader,
    CardContent,
    Avatar,
    IconButton,
    Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BillCard = ({
    index,
    billId,
    customer,
    staff,
    warehouse,
    amountRiceTypes,
    totalPrice,
    createdAt,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOptionSelect = (option) => {
        console.log(`Đã chọn: ${option}`);
        handleMenuClose();
    };

    return (
        <Card className='zoom' sx={{ marginBottom: '1.5em', paddingBottom: '1.5em' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue['A400'] }} aria-label="recipe">
                        {index}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <>
                        Khách hàng: &nbsp;
                        <Link className='default-link'>
                            {customer.Fullname}
                        </Link>
                    </>
                }
                subheader={`Thời gian: ${createdAt}`}
            />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleOptionSelect('Tuỳ chọn 1')}>
                    Xem chi tiết
                </MenuItem>
            </Menu>
            <Divider textAlign='center' sx={{ color: '#1976d2', fontSize: '17px', fontWeight: '500' }}>
                Thông tin
            </Divider>
            <CardContent>
                <Typography variant="body1" sx={{ color: 'text.primary', paddingBottom: '0.5em' }}>
                    Nhân viên lập: &nbsp;
                    <Link to={`/staffs/${staff.id}`} className='default-link'>
                        {staff.Fullname}
                    </Link>
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', paddingBottom: '0.5em' }}>
                    Kho: &nbsp;
                    <Link to={`/warehouses/${warehouse.id}`} className='default-link'>
                        {warehouse.Name}
                    </Link>
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', paddingBottom: '0.5em' }}>
                    Số loại lúa: {amountRiceTypes}
                </Typography>
            </CardContent>
            <Divider textAlign='center'>
                <Chip
                    label={totalPrice}
                    size="small"
                    color='primary'
                    variant='filled'
                    sx={{ width: '300px', height: '30px', fontSize: '20px' }}
                />
            </Divider>
        </Card>
    );
}

export default BillCard;