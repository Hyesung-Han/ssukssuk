// import { Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import { Grid, Button, Pagination, Tabs, Tab } from '@mui/material';

import BoardList from '../../components/Board/BoardList/';
import { useHistory } from 'react-router-dom';
import SearchComponent from '../../components/Search/SearchComponent';

import Layout from '../../layout/';

import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';
import Wrapper from './styles';

import { useSelector } from 'react-redux';

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

function createData(no, hit, title, author, date, commentCnt) {
  return {
    no,
    hit,
    title,
    author,
    date,
    commentCnt,
  };
}

const Community = () => {
  const user = useSelector(state => state.Auth.user);
  const { serverUrlBase } = useContext(CommonContext);

  let history = useHistory();

  const [listData, setListData] = useState([]);
  const [freeLen, setFreeLen] = useState(0);
  const [mentoLen, setMentoLen] = useState(0);
  const [category, setCategory] = React.useState(0);
  const [searchValue, setSearchValue] = useState(null);
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
      alert('로그인이 필요합니다');
      // setIsSignUp('SignIn');
      // history.push('/Auth');
    } else {
      history.push('/CommunityWrite');
    }
  };

  const pageLen = [];
  const setPageLen = () => {
    pageLen.splice(0, pageLen.length);

    pageLen.push(
      freeLen + mentoLen === 1 ? 0 : parseInt((freeLen + mentoLen) / 10) + 1,
    );
    pageLen.push(freeLen === 1 ? 0 : parseInt(freeLen / 10) + 1);
    pageLen.push(mentoLen === 1 ? 0 : parseInt(mentoLen / 10) + 1);
  };

  const getCommunityListCnt = () => {
    Axios.get(serverUrlBase + `/community/listcount`, {
      params: {
        keyword: searchValue,
      },
    })
      .then(data => {
        let tf, tm;
        tf = tm = 0;

        const cnt_data = data.data.data;
        cnt_data.map(cur => {
          if (cur.community_code === 'C01') tf = cur.list_cnt;
          else if (cur.community_code === 'C02') tm = cur.list_cnt;
        });
        setFreeLen(tf);
        setMentoLen(tm);
      })
      .catch(function(error) {
        console.log('community list count error: ' + error);
      });
  };

  const readCommunityList = () => {
    const keyword = searchValue ? searchValue : null;
    let communityCode;
    if (category === 0) communityCode = null;
    else if (category === 1) communityCode = 'c01';
    else if (category === 2) communityCode = 'c02';

    Axios.get(serverUrlBase + `/community/list`, {
      params: {
        community_code: communityCode,
        keyword: keyword,
        page_no: page,
      },
    })
      .then(data => {
        const tempList = [];
        data.data.data.map(row => {
          if (row.community_author) {
            tempList.push(
              createData(
                row.community_no,
                row.community_hit,
                row.community_title,
                row.community_author,
                row.community_date,
                row.comment_cnt,
              ),
            );
          }
        });
        setListData(tempList);
      })
      .catch(function(error) {
        console.log('community list error: ' + error);
      });
  };

  // useEffect를 3개로 나눠놓으니까 처음 실행할 때 서버에 3번 연결하네;;;;;
  useEffect(() => {
    getCommunityListCnt();
    setPageLen();

    if (page === 1) {
      readCommunityList();
      window.scrollTo(0, 0);
    } else {
      setPage(1);
    }
  }, [searchValue]);

  useEffect(() => {
    if (page === 1) {
      readCommunityList();
      window.scrollTo(0, 0);
    } else {
      setPage(1);
    }
  }, [category]);

  useEffect(() => {
    readCommunityList();
    window.scrollTo(0, 0); // 스크롤 맨 위로 이동
  }, [page]);

  setPageLen();

  return (
    <ViewContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchCategory,
        setSearchCategory,
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
                    label={'전체 게시판 (' + (freeLen + mentoLen) + ')'}
                  />
                  <Tab
                    className="tab-style"
                    label={'자유 게시판 (' + freeLen + ')'}
                  />
                  <Tab
                    className="tab-style"
                    label={'멘토링 게시판 (' + mentoLen + ')'}
                  />
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
          {/* {searchValue && <div className="result">{searchValue} 검색 결과</div>} */}
          <BoardList listType={'Community'} listData={listData} />

          <Grid
            className="bottom-box"
            container
            alignItems="flex-end"
            direction="column"
          ></Grid>
          <Grid container alignItems="center" direction="column">
            <Pagination
              count={pageLen[category]}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
          <SearchComponent />
        </Wrapper>
      </Layout>
    </ViewContext.Provider>
  );
};

export default Community;
