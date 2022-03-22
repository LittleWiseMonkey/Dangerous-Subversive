import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../images/logo_White.gif';
import useStyles from './navbarStyles';

const NavBar = ({ totalItems}) => {

  const classes = useStyles();
  const location = useLocation();


  return (
    <div>
      <AppBar position='fixed' className={classes.AppBar} color='transparent'>

        <Toolbar>

          <Typography component={Link} to='/' variant='h6' className={classes.title} color="inherit">
            <img src={Logo} alt="Logo" height="25px" className={classes.image} />
            Dangerous Subversive
          </Typography>

          <div className={classes.grow} />

          {location.pathname !== '/cart' && (
            <div className={classes.button}>

              <IconButton component={Link} to='/cart' aria-label='Show Cart Items' color='inherit'>
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
          

        </Toolbar>

      </AppBar>
    </div>
  )
}

export default NavBar
