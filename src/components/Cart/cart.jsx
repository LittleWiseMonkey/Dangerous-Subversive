import { Button, Card, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/cartItem';
import useStyles from './cartStyles';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveCartItem, handleEmptyCart}) => {

    const classes = useStyles();

    //      EMPTY CART FUNCTION     /////
    const EmptyCart = () => (
        <Typography variant='subtitle1'>
            There are no items in your shopping cart.<br />
            <Link to='/' className={classes.link}>Return to Display Page</Link>
        </Typography>
    );

    //      FILLED CART FUNCTION        /////
    const FilledCart = () => (
        <>
            
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <CartItem
                                item={item}
                                handleUpdateCartQty={handleUpdateCartQty}
                                handleRemoveCartItem={handleRemoveCartItem}
                            />
                        </Grid>
                ))}
            </Grid>
            
            <div className={classes.cardDetails}>

                <Typography variant='h4'>
                    SubTotal : {cart.subtotal.formatted_with_symbol}
                </Typography>

                <div>

                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>

                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
                        CheckOut
                    </Button>

                </div>

            </div>

        </>
    );

    //      To await response from Commerce.js on refresh       /////
    if (!cart.line_items) return 'Loading...';

    //      PAGE DISPLAY        /////
    return (
        <Container>
            <div className={classes.toolbar} />

            <Typography className={classes.title} variant="h3" gutterBottom>
                Your Shopping Cart
            </Typography>

            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}

        </Container>
    )
}

export default Cart
