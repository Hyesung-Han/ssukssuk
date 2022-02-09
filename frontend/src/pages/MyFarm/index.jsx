import React, { useState, useContext, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import Axios from 'axios';
import { CommonContext } from '../../context/CommonContext';
import { setFarm_no } from '../../redux/reducers/FarmReducer';

import Layout from '../../layout/';
import Wrapper from './styles';
import FarmInfo from './FarmInfo';
import FarmStatus from './FarmStatus';
import FarmHistory from './FarmHistory';

const MyFarm = () => {
  const farm = useSelector(state => state.Farm.farm);
  const user = useSelector(state => state.Auth.user);
  const { serverUrlBase } = useContext(CommonContext);

  // const [isReady,setIsReady]=useState(false);
  const dispatch = useDispatch();

  const [farmNo,setFarmNo]=useState('');

  const getFarmData = () => {
    Axios.get(serverUrlBase + `/myfarm/list`, {
      params: {
        id: user.user_id,
        keyword: '',
      },
    })
      .then(data => {
        // console.log(data.data.data);
        const list = data.data.data[0];
        // dispatch(setFarm_no(list.farm_no));
        // setIsReady(true);
        setFarmNo(list.farm_no);
      })
      .catch(function(error) {
        console.log('get farmdata error: ' + error);
      });

  };

  useEffect(()=>{
    getFarmData()
    // console.log(farm)
  },[])

  if(!farmNo) return (<Layout>로딩중 혹은 데이터없음</Layout>)
  return (
    <Layout>
      <Wrapper>
        <h2> 내 농장 페이지 </h2>
        <FarmInfo />
        <FarmStatus farmNo={farmNo}/>
        <FarmHistory />
      </Wrapper>
    </Layout>
  );
};

export default MyFarm;
