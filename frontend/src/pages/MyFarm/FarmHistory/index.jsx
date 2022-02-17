import React from 'react';
import { styled } from '@mui/material/styles';
import SurveyList from './SurveyList';
import MainCard from '../../../components/Card/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fafafa',
  position: 'relative',
  justifyContent: 'center',
  border: 'none',
  margin: '30px 0px 40px 0px',
  padding: '5px 30px 5px 30px',
}));
const FarmHistory = () => {
  return (
    <CardWrapper>
      <SurveyList />
    </CardWrapper>
  );
};

export default FarmHistory;
