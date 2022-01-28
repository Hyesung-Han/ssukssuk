import React, { useContext, useEffect, useState } from 'react';

import Layout from '../../layout/';

import Wrapper from './styles';

import { Grid, button } from '@mui/material';

const CommunityWrite = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid container direction="row" justifyContent="space-between">
          <h2>커뮤니티 글쓰기</h2>
          <button>등록</button>
        </Grid>
        <Grid container direction="column">
          <Grid item className='grid-box'>
            <h3>카테고리</h3>
          </Grid>
          <Grid item className='grid-box'>
            <h3>제목 입력</h3>
          </Grid>
          <Grid item className='grid-box'>
            <h3>텍스트에디터</h3>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default CommunityWrite;
