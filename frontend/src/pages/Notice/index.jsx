// import { Grid, Button } from '@material-ui/core';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

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

import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';
import Wrapper from './styles';

import { useSelector, useDispatch } from 'react-redux';

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

function createData(no, hit, title, author, date, noticeCode, commentCnt) {
  return {
    no,
    hit,
    title,
    author,
    date,
    noticeCode,
    commentCnt,
  };
}

const Notice = () => {
  const user = useSelector(state => state.Auth.user);
  const { setIsSignUp, serverUrlBase } = useContext(CommonContext);

  let history = useHistory();

  const [listData, setListData] = useState([]);
  const [noticeLen, setnoticeLen] = useState(0);
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

  const onClickNoticeWriteHandler = () => {
    if (!user.status) {
      alert('로그인이 필요합니다');
      // setIsSignUp('SignIn');
      // history.push('/Auth');
    } else {
      history.push('/NoticeWrite');
    }
  };

  const pageLen = [];
  const setPageLen = () => {
    pageLen.splice(0, pageLen.length);
    pageLen.push(noticeLen === 1 ? 0 : parseInt(noticeLen / 10) + 1);
  };

  const getNoticeListCnt = () => {
    Axios.get(serverUrlBase + `/notice/listcount`, {
      params: {
        keyword: searchValue,
      },
    })
      .then(data => {
        let total = 0;
        const cnt_data = data.data.data;
        cnt_data.map(cur => {
          if (cur.notice_code === 'N01') total += cur.list_cnt;
          else if (cur.notice_code === 'N02') total += cur.list_cnt;
        });
        setnoticeLen(total);
      })
      .catch(function(error) {
        console.log('notice list count error: ' + error);
      });
  };

  const readNoticeList = () => {
    const keyword = searchValue ? searchValue : null;

    Axios.get(serverUrlBase + `/notice/list`, {
      params: {
        keyword: keyword,
        page_no: page,
      },
    })
      .then(data => {
        const tempList = [];
        data.data.data.map(row => {
          if (row.notice_author) {
            tempList.push(
              createData(
                row.notice_no,
                row.notice_hit,
                row.notice_title,
                row.notice_author,
                row.notice_date,
                row.notice_code,
                row.comment_cnt,
              ),
            );
          }
        });
        setListData(tempList);
      })
      .catch(function(error) {
        console.log('notice list error: ' + error);
      });
  };

  // useEffect를 3개로 나눠놓으니까 처음 실행할 때 서버에 3번 연결하네;;;;;
  useEffect(() => {
    getNoticeListCnt();
    setPageLen();

    if (page === 1) {
      readNoticeList();
      window.scrollTo(0, 0);
    } else {
      setPage(1);
    }
  }, [searchValue]);

  useEffect(() => {
    if (page === 1) {
      readNoticeList();
      window.scrollTo(0, 0);
    } else {
      setPage(1);
    }
  }, [category]);

  useEffect(() => {
    readNoticeList();
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
                    label={'전체 게시판 (' + noticeLen + ')'}
                  />
                </Tabs>
              </Grid>
            </ThemeProvider>
            <Grid item>
              <Button
                className="write-button"
                onClick={onClickNoticeWriteHandler}
              >
                글쓰기
              </Button>
            </Grid>
          </Grid>
          {/* {searchValue && <div className="result">{searchValue} 검색 결과</div>} */}
          <BoardList listType={'Notice'} listData={listData} />

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

export default Notice;
