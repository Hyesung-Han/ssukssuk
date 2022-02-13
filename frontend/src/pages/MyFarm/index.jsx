import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';

import { Dialog, useMediaQuery } from '@material-ui/core';

import Layout from '../../layout/';
import Wrapper from './styles';
import FarmInfo from './FarmInfo';
import FarmStatus from './FarmStatus';
import FarmHistory from './FarmHistory';

import RegiIot from '../../components/RegiIoT';

import Swal from 'sweetalert2';

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
  // const user = useSelector(state => state.Auth.user);
  const { setRegiIotDialogOpen } = useContext(CommonContext);

  const farm = useSelector(state => state.Farm.farm);
  let history = useHistory();

  // useEffect(() => {
  //   if (!farm) {
  //     // 농장 iot 신청 여부 조사

  //     // 신청 했으면
  //     // Swal.fire({
  //     //   title: '기기등록이 되지 않았습니다',
  //     //   text: 'IoT에서 농장등록을 먼저 해주세요',
  //     // });
  //     // history.push('./')

  //     // 신청 안했으면
  //     setRegiIotDialogOpen(true);
  //   }
  // });

  // if (!farm)
  //   return (
  //     <Layout>
  //       <RegiIot />
  //     </Layout>
  //   );
  return (
    <Layout>
      <Background
        sx={{
          backgroundColor: '#f1f8e9',
          backgroundPosition: 'center',
        }}
      />
      <Wrapper>
        {/* <h2> 내 농장 페이지 </h2> */}
        <FarmInfo />
        <FarmStatus />
        <FarmHistory />
      </Wrapper>
    </Layout>
  );
};

export default MyFarm;
