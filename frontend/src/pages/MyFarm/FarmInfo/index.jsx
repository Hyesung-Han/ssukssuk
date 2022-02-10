import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';

import MainCard from '../../../components/Card/MainCard';
import InfoCard from './InfoCard';
import CurrentImage from './CurrentImage';
import FarmImage from './FarmImage';

import { CommonContext } from '../../../context/CommonContext';

import {
  Avatar,
  Box,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Button,
  CardActionArea,
} from '@mui/material';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fafafa',
  position: 'relative',
  justifyContent: 'center',
  border: 'none',
  margin: '30px 0px 40px 0px',
  padding: '5px 30px 5px 30px',
}));
// 캐러셀 참고 사이트
// https://codesandbox.io/examples/package/react-material-ui-carousel

const FarmPicture = () => {
  return (
    <CardWrapper>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={7}>
          <FarmImage />
        </Grid>
        <Grid item xs={5} alignSelf="center">
          <InfoCard />
          <CurrentImage />
        </Grid>
      </Grid>
    </CardWrapper>
  );
};

export default FarmPicture;
