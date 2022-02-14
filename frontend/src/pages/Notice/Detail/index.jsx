import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../layout/';
import Comment from '../../../components/Comment';
import Wrapper from './styles';
import Axios from 'axios';
import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Grid, Button, Paper } from '@mui/material';

const NoticeDetail = ({ match }) => {
  const no = match.params.no;
  let history = useHistory();

  const { serverUrlBase, parsingDate } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const [notice, setNotice] = useState();
  const getNotice = async () => {
    try {
      const res = await Axios.get(serverUrlBase + `/notice/detail/` + no);
      setNotice(res.data.data);
    } catch (e) {
      console.log('getNotice error!!', e);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  const onClickNoticeUpdateHandler = () => {
    if (!user.status) {
      alert('회원정보 오류! 로그인을 확인해주세요');
      return;
    }
    history.push('/NoticeUpdate/' + no);
  };

  const onClickNoticeDeleteHandler = () => {
    if (!user.status) {
      alert('회원정보 오류! 로그인을 확인해주세요');
      return;
    }
    Swal.fire({
      icon: 'warning',
      title: '정말 삭제하시겠습니까?',
      text: '삭제하시면 다시 복구시킬 수 없습니다.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(result => {
      if (result.value) {
        Axios.delete(serverUrlBase + '/notice/delete/' + no)
          .then(result => {
            console.log(result);
            history.push('/Notice');
          })
          .catch(e => {
            console.log('notice delete error', e);
          });
      }
    });
  };

  const onClickNoticeHandler = () => {
    history.goBack();
  };

  if (!notice) return (<Layout>loading중..</Layout>);
  return (
    <Layout>
      <Wrapper>
        <Grid container>
          <h2>{notice.notice_code === 'N01' ? '공지사항' : '문의사항'}</h2>
        </Grid>
        <Grid container className="root-box" direction="column">
          <Grid item className="body-box">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="category-box"
            >
              <Grid item className="body-header" xs={2}>
                제목
              </Grid>
              <Grid item className="body-content" xs={8} sx={{ fontSize:18,fontFamily: `'Do Hyeon', sans-serif`,}}>
                {notice.notice_title}
              </Grid>
              <Grid item className="body-content" xs={2} sx={{ fontSize:18,fontFamily: `'Do Hyeon', sans-serif`,}}>
                {parsingDate(notice.notice_date)}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              className="title-box"
            >
              <Grid item className="body-header" xs={2}>
                작성자
              </Grid>
              <Grid item className="body-content" xs={8}>
                <Grid sx={{ fontSize:18,fontFamily: `'Do Hyeon', sans-serif`,}}>{notice.notice_author}</Grid>
              </Grid>
              <Grid item className="body-header" xs={1}>
                조회수
              </Grid>
              <Grid item className="body-content" xs={1} sx={{ fontSize:18,fontFamily: `'Do Hyeon', sans-serif`,}}>
                {notice.notice_hit}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              className="text-box"
            >
              <Grid item className="body-header" xs={2}>
                내용
              </Grid>
              <Grid item className="body-content body-content-text" xs={10} sx={{ fontSize:18,fontFamily: `'Do Hyeon', sans-serif`,}}>
                <Paper elevation={0}>{notice.notice_content}</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" alignItems="center">
          <Comment listType={'notice'} no={notice.notice_no} />
        </Grid>
        <hr></hr>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Button className="write-button" onClick={onClickNoticeHandler}>
              목록{' '}
            </Button>
          </Grid>
        </Grid>
        {user.user_id != '' && user.user_id === notice.notice_user_id && (
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <Button
                className="write-button"
                onClick={onClickNoticeUpdateHandler}
              >
                게시글 수정
              </Button>
              &nbsp;
              <Button
                className="write-button"
                onClick={onClickNoticeDeleteHandler}
              >
                게시글 삭제
              </Button>
            </Grid>
          </Grid>
        )}
      </Wrapper>
    </Layout>
  );
};

export default NoticeDetail;
