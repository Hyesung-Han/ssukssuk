import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';

import SurveyList from './SurveyList';

import { Grid } from '@mui/material';
import MainCard from '../../../components/Card/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fff',
  position: 'relative',
  border: 'solid',
  bordercolor: 'green',
  margin: '50px 0px 50px 0px',
}));
const FarmHistory = () => {
  return (
    <CardWrapper>
      <SurveyList />
    </CardWrapper>
  );
};

export default FarmHistory;
