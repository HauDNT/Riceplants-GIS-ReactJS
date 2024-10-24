import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

const RicePlantCard = ({ id, Name, Description, imageUrl }) => {
    return (
        <Card className='rice-card-container zoom' key={id}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl || "https://images.pexels.com/photos/6129010/pexels-photo-6129010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {Name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} className='rice-card--description'>
                        {Description.length > 100 ? `${Description.slice(0, 100)}...` : Description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: 'end' }}>
                <Button size="small" color="primary" variant="text">
                    Xem chi tiết
                </Button>
            </CardActions>
        </Card>
    );
}

export default RicePlantCard;
