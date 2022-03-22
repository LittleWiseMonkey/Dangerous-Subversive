import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './productStyles';

const Product = ({ product, onAddToCart }) => {

  const classes = useStyles();
  const age = 20;


  return (
    <Card className={classes.root}>

      {/***   IMAGE   ******/}
      <CardMedia
        className={classes.media}
        image={product.image.url}
        title={product.name}
      />

      <CardContent>
        <div className={classes.cardContent}>

          {/***   TITLE   ******/}
          <div className="row">
            <div className="col">
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
            </div>

            {/***   DESCRIPTION   ******/}
            <div className="col">
              <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" />
            </div>
          </div>

          {/***   PRICE   ******/}
          <div className="row">
            <Typography variant="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>

        </div>
      </CardContent>

      {/***   CART BUTTON    ******/}
      <CardActions disableSpacing className={classes.CardActions}>
        <IconButton className={classes.addToCart} onClick={() => onAddToCart(product.id, 1)}>
          <AddShoppingCart />
          <Typography variant="body1">
            &nbsp; add to cart
          </Typography>
         
        </IconButton>
      </CardActions>

    </Card>
  )
}

export default Product
