import { Button, CircularProgress, CssBaseline, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddressForm from '../addressForm';
import PaymentForm from '../paymentForm';
import { commerce } from '../../../lib/commerce';

import useStyles from './checkoutStyles';

//    STEPS ARRAY   /////
const steps = ['Shipping Address', 'Payment Details'];

//    MAIN FUNCTION   /////
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

  //    USESTATES   /////
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  //    GENERATE TOKEN    /////
  useEffect(() => {

    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

        setCheckoutToken(token);
      }
      catch (error) {
          history.pushState('/')
      }
    }

    generateToken();


  }, [cart, history]);
  //////////////////////////////////////

  //    SET ACTIVE STEP   /////
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  //    FETCH FORM DATA   /////
  const next = (data) => {
    setShippingData(data);

    nextStep();
  }

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  }

  //    CONFIRMATION ELEMENT    /////
  let Confirmation = () => order.customer ? (
    <>
      <div>

        <Typography variant='h5'>
          Thank you for your purchase, {order.customer.firstname}!
        </Typography>

        <Divider className={classes.divider} />

        <Typography variant='subtitle2'>Order Ref: {order.customer_reference}</Typography>
      </div>

      <br />

      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home Page</Button>

    </>
  ) : isFinished ? (
      <>
        <div>

          <Typography variant='h5'>Thank you for your purchase</Typography>

          <Divider className={classes.divider} />

        </div>

        <br />

        <Button component={Link} to='/' variant='outlined' type='button'>Back to Home Page</Button>

      </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );

  if (error) {
    <>
      <Typography variant='h5'>Error : {error}</Typography>

      <br />

      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home Page</Button>
    </>
  }

  //    FORM ELEMENT    /////
  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      nextStep={nextStep}
      backStep={backStep}
      onCaptureCheckout={onCaptureCheckout}
      timeout={timeout}
    />

  return (
    <>
      <CssBaseline />
      {/***   SPACER    *****/}
      <div className={classes.toolbar} />

      <main className={classes.layout}>

        <Paper className={classes.paper}>

          <Typography variant='h4' align='center'>
            Checkout
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>

            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}

          </Stepper>

          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}

        </Paper>

      </main>

    </>
  )
}

export default Checkout;