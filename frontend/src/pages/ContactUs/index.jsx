import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from './../../layout/';
import Wrapper from './styles';
const ContactUs = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid className="subject">Contact Us</Grid>
        <Grid container className="info">
          <Grid xs={12} sm={4} md={4} item>
            <Grid className="img">
              <img src="/images/contact_us_img_1.png" alt="" />
            </Grid>
            <Grid className="title">CALL</Grid>
            <Grid className="text">02-6622-3300</Grid>
          </Grid>
          <Grid xs={12} sm={4} md={4} item>
            <Grid className="img">
              <img src="/images/contact_us_img_2.png" alt="" />
            </Grid>
            <Grid className="title">E-MAIL</Grid>
            <Grid className="text">help@samsungsupport.com</Grid>
          </Grid>
          <Grid
            xs={12}
            sm={4}
            md={4}
            item
            className="mouse-cursor"
            onClick={() => {
              window.open(
                'https://www.notion.so/349dbe5bc8b240b984abfa141192042c',
                '_blank',
              );
            }}
          >
            <Grid className="img">
              <img src="/images/contact_us_img_4.png" alt="" />
            </Grid>
            <Grid className="title">NOTION</Grid>
            <Grid className="text">👖청바지홈</Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default ContactUs;
