// import { Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import {
  Grid,
  Button,
  Pagination,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';

import BoardList from '../../components/Board/BoardList/';
import { useHistory } from 'react-router-dom';
import SearchComponent from '../../components/Search/SearchComponent';

import Layout from '../../layout/';

import { useLocalStorageSetState } from '../../common/CommonHooks';
import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';
import Wrapper from './styles';

import listData from './dump.json';
import noticeData from './notice.json';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@emotion/react';
const theme = createTheme({
  palette: {
    primary: {
      main: '#3e7925',
    },
    secondary: {
      main: '#000000',
    },
  },
});

const Community = () => {
  const { user, setIsSignUp } = useContext(CommonContext);

  let history = useHistory();

  const [category, setCategory] = React.useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useLocalStorageSetState('', 'search');
  const [searchCategory, setSearchCategory] = useState(0);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setCategory(value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onClickCommunityWriteHandler = () => {
    if (!user.status) {
      // 여기도 SignUp 변경하는거 다른 사람들이랑 충돌 안나도록 일단은 이렇게 하고 나중에 다 만들고 나서 바꿀 수 있으면 최적화
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      setIsSignUp('SignIn');
      history.push('/Auth');
    } else {
      history.push('/CommunityWrite');
    }
  };

  useEffect(() => {
    // 백엔드랑 연결되면 여기서 카테고리와 value, page를 사용해서 리스트 갱신해주는 것 추가
    console.log(category, searchCategory, searchValue, page);
    // 리스트 갱신되는지 확인함
    listData.items.push({
      community_no: listData.items.length + 1,
      community_title: '[정보글] 귀농 3년이면 과일도 심는다?',
      community_author: '도시보다 시골',
      community_date: '20220121',
      community_content: 'test_content6',
      community_hit: 0,
      community_code: 'free',
    });

    if (isSearch) {
      setPage(1);
      setIsSearch(!isSearch); // 이거때문에 한번 더 렌더링 되는거 같은데 어떻게 좀 바꿀 수 없을까
    }
  }, [isSearch, page, category]);

    // 이건 나중에 받아오는걸로
    const free_len = listData.items.length;
    const mento_len=10;


  return (
    <ViewContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchCategory,
        setSearchCategory,
        isSearch,
        setIsSearch,
      }}
    >
      <Layout>
        <Wrapper>
          <Grid
            container
            direction="row"
            className="top-box"
            justifyContent="space-between"
            alignItems="end"
          >
            <ThemeProvider theme={theme}>
              <Grid item>
                <Tabs
                  value={category}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab
                    className="tab-style"
                    label={'전체 게시판 ('+(free_len+mento_len)+')'}
                  />
                  <Tab
                    className="tab-style"
                    label={'자유 게시판 ('+free_len+')'}
                  />
                  <Tab className="tab-style" label={"멘토 게시판 (" + mento_len + ")"} />
                </Tabs>
              </Grid>
            </ThemeProvider>
            <Grid item>
              <Button
                className="write-button"
                onClick={onClickCommunityWriteHandler}
              >
                글쓰기
              </Button>
            </Grid>
          </Grid>

          <BoardList listData={listData} noticeData={noticeData} />

          <Grid
            className="bottom-box"
            container
            alignItems="flex-end"
            direction="column"
          >
          </Grid>
          <Grid container alignItems="center" direction="column">
            <Pagination count={10} page={page} onChange={handlePageChange} />
          </Grid>
          <SearchComponent />
        </Wrapper>
      </Layout>
    </ViewContext.Provider>
  );
};

export default Community;
