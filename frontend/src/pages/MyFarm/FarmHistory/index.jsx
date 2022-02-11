import React from 'react';
import { styled } from '@mui/material/styles';
import SurveyList from './SurveyList';
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
