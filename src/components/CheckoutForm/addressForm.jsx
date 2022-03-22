import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from './customTextField';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';


const AddressForm = ({ checkoutToken, next }) => {

  //    USESTATES   /////
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  //    USE COMMERCE FORM ELEMENTS   /////
  const methods = useForm();

  //    Convert to Countries Array
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
  //    Convert to Regions Array
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
  //    Populate Options Array
  const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));


 

  //    Fetch Countries Object
  useEffect(() => {

    //    FETCH COUNTRIES   /////
    const fetchShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutToken.id);

      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[43]);
    }
    
    fetchShippingCountries(checkoutToken.id)

  }, [checkoutToken.id])

  ///////////////////////////////

  //    FETCH REGIONS   /////
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  //    Fetch Regions Object
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);
  ///////////////////////////////

  //    FETCH OPTIONS   /////
  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  }

  //    Fetch Options Array
  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [checkoutToken.id, shippingCountry, shippingSubdivision])
  ///////////////////////////////

  //    MAIN FUNCTION   /////
  return (
    <>

      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          
          <Grid container spacing={3}>

            {/***   FORM INPUTS   *****/}
            <FormInput name='firstName' label='First Name :' />
            <FormInput name='lastName' label='Last Name :' />
            <FormInput name='address1' label='Address :' />
            <FormInput name='email' label='Email Address :' />
            <FormInput name='city' label='City :' />
            <FormInput name='postCode' label='Post Code :' />

            {/***   SHIPPING COUNTRY SELECT    *****/}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>

                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/***   SHIPPING REGION SELECT    *****/}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Region</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>

                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/***   SHIPPING OPTIONS SELECT    *****/}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>

                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

          </Grid>

          <br />
 
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined'>Return to Cart</Button>
            <Button type='submit' variant='contained' color='primary'>Continue to Payment Details</Button>
          </div>

        </form>
      </FormProvider>

    </>
  )
}

export default AddressForm