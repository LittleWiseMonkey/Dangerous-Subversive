import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import React from 'react';
import useStyles from './cartItemStyles';

const CartItem = ({ item, handleUpdateCartQty, handleRemoveCartItem }) => {

  const classes = useStyles();

  return (
    <Card className={classes.card}>

      <CardMedia image={item.image.url} alt={item.name} className={classes.media} />

      <CardContent className={classes.cardContent}>

        <Typography variant='h4'>
          {item.name}
        </Typography>

        <Typography variant='h5'>
          {item.line_total.formatted_with_symbol}
        </Typography>

      </CardContent>

      <CardActions className={classes.CardActions}>

        <div className={classes.buttons}>
          <Button className={classes.btn} type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
          <Typography>{item.quantity}</Typography>
          <Button className={classes.btn} type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
        </div>

        <Button variant="contained" type='button' color="secondary" onClick={() => handleRemoveCartItem(item.id)}>Remove Item</Button>

      </CardActions>

    </Card>
  )
}

export default CartItem;