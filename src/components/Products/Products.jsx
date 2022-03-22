import { Grid } from "@material-ui/core";
import React from "react";
import Product from "./Product/product";
import useStyles from './procuctsStyles';


const Products = ({products, onAddToCart}) => {

    const classes = useStyles();
    const age = 20;

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent='center' spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Product product={product} onAddToCart={onAddToCart} />
                        
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products
