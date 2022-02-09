import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Axios from 'axios';
import { CommonContext } from '../../context/CommonContext';

import Layout from '../../layout/';
import Wrapper from './styles';
import FarmInfo from './FarmInfo';
import FarmStatus from './FarmStatus';
import FarmHistory from './FarmHistory';

import dumpData from './dump.json';

const MyFarm = () => {
  const farm = useSelector(state => state.Farm.farm);

  return (
    <Layout>
      <Wrapper>
        <h2> 내 농장 페이지 </h2>
        <FarmInfo />
        <FarmStatus/>
        <FarmHistory />
      </Wrapper>
    </Layout>
  );
};

export default MyFarm;
