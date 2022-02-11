import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../layout/';
import Comment from '../../../components/Comment';
import Wrapper from './styles';
import Axios from 'axios';
import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Grid, Button, InputBase, Paper } from '@mui/material';

import '../../../App.css';

const CommunityDetail = ({ match }) => {
  const no = match.params.no;
  let history = useHistory();

  const { serverUrlBase, parsingDate } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const [Community, setCommunity] = useState();
  const getCommunity = async () => {
    try {
      const res = await Axios.get(serverUrlBase + `/community/detail/` + no);
      setCommunity(res.data.data);
    } catch (e) {
      console.log('getCommunity error!!', e);
    }
  };

  useEffect(() => {
    getCommunity();
  }, []);

  const onClickCommunityUpdateHandler = () => {
    if (!user.status) {
      alert('회원정보 오류! 로그인을 확인해주세요');
      return;
    }
    history.push('/CommunityUpdate/' + no);
  };

  const onClickCommunityDeleteHandler = () => {
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
        Axios.delete(serverUrlBase + '/Community/delete/' + no)
          .then(result => {
            console.log(result);
            history.push('/Community');
          })
          .catch(e => {
            console.log('Community delete error', e);
          });
      }

      Swal.fire({
        icon: 'success',
        title: '글이 삭제되었습니다',
      });
    });
  };

  const onClickCommunityHandler = () => {
    history.goBack();
  };

  if (!Community) return <>loading중..</>;
  return (
    <Layout>
      <Wrapper>
        <Grid container>
          <h2 >
            {Community.community_code === 'C01'
              ? '자유 게시판'
              : '멘토링 게시판'}
          </h2>
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
              <Grid item className="body-content" xs={8}>
                {Community.community_title}
              </Grid>
              <Grid item className="body-content" xs={2}>
                {parsingDate(Community.community_date)}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="title-box"
            >
              <Grid item className="body-header" xs={2}>
                작성자
              </Grid>
              <Grid item className="body-content" xs={7}>
                <InputBase value={Community.community_author} />
              </Grid>
              <Grid item className="body-header" xs={2}>
                조회수
              </Grid>
              <Grid item className="body-content" xs={1}>
                {Community.community_hit}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="text-box"
            >
              <Grid item className="body-header" xs={2}>
                내용
              </Grid>
              <Grid item className="body-content body-content-text" xs={9}>
                <Paper elevation={0}>{Community.community_content}</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" alignItems="center">
          <Comment listType={'community'} no={Community.community_no} />
        </Grid>
        <hr></hr>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Button className="write-button" onClick={onClickCommunityHandler}>
              목록{' '}
            </Button>
          </Grid>
        </Grid>
        {user.user_id != '' && user.user_id === Community.community_user_id && (
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <Button
                className="write-button"
                onClick={onClickCommunityUpdateHandler}
              >
                게시글 수정
              </Button>
              &nbsp;
              <Button
                className="write-button"
                onClick={onClickCommunityDeleteHandler}
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

export default CommunityDetail;
