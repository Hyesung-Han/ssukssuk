import React, { useContext, useEffect, useState } from 'react';

import BoardList from '../../components/Board/BoardList/';
import Layout from '../../layout/';

import Wrapper from './styles';

const CommunityDetail = ({history,location,match}) => {
    const [data, setData]=useState({});

    const {no}=match.params;

    useEffect(()=>{
        setData(no);
    },[]);

  return (
    <Layout>
        <br/>
        <h2> {no}번 게시글 </h2>
        <br/>
    </Layout>);
};

export default CommunityDetail;
