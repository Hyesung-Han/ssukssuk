import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { CommonContext } from '../../context/CommonContext';

import Layout from '../../layout/';
import Wrapper from './styles';
import FarmInfo from './FarmInfo';
import FarmStatus from './FarmStatus';
import FarmHistory from './FarmHistory';

import RegiIot from '../../components/RegiIoT';

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
});

const MyFarm = () => {
  const { setRegiIotDialogOpen } = useContext(CommonContext);

  const farm = useSelector(state => state.Farm.farm);

  useEffect(() => {
    // 농장 iot 신청 여부 조사
    if (!farm) {
      // 신청 안했으면
      setRegiIotDialogOpen(true);
    }
  });

  if (!farm)
    return (
      <Layout>
        <RegiIot />
      </Layout>
    );
  return (
    <Layout>
      <Background
        sx={{
          backgroundColor: '#f1f8e9',
          backgroundPosition: 'center',
        }}
      />
      <Wrapper>
        <h1> 내 농장 페이지 </h1>
        <FarmInfo />
        <FarmStatus />
        <FarmHistory />
      </Wrapper>
    </Layout>
  );
};

export default MyFarm;
