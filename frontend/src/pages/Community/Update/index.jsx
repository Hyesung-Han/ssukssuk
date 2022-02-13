import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../layout/';
import Wrapper from './styles';
import Axios from 'axios';
import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Typography, Grid, Button, InputBase } from '@mui/material';

const CommunityUpdate = ({ match }) => {
  const no = match.params.no;
  let history = useHistory();

  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const getCommunity = async () => {
    try {
      const res = await Axios.get(serverUrlBase + `/community/detail/` + no);
      const data = res.data.data;

      setCode(data.community_code);
      setTitle(data.community_title);
      setContent(data.community_content);
    } catch (e) {
      console.log('getCommunity error!!', e);
    }
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleTextChange = e => {
    setContent(e.target.value);
  };

  const onClickCommunityUpdateHandler = () => {
    if (!user.status) {
      alert('회원정보 오류! 로그인을 확인해주세요');
      history.push('/Community');
      return;
    }

    Axios.defaults.headers.common['authorization'] = user.token;
    Axios.patch(serverUrlBase + `/community/update`, {
      community_title: title,
      community_content: content,
      community_no: no,
    })
      .then(data => {
        if (data.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '글이 성공적으로 수정되었습니다.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '에러',
          });
        }
        history.push('/Community');
      })
      .catch(function(error) {
        console.log('community regi error:' + error);

        Swal.fire({
          icon: 'error',
          title: '에러',
        });
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCommunity();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Grid container>
          <h2>글 수정하기</h2>
        </Grid>

        <Grid container className="root-box" direction="column">
          <Grid item className="body-box">
            <Grid
              container
              direction="row"
              alignItems="center"
              className="category-box"
            >
              <Grid item className="body-header">
                분류
              </Grid>
              <Grid item className="body-content">
              <Typography sx={{fontSize:20, color:'#495057', fontFamily: `'Do Hyeon', sans-serif`,}}>{code === 'C01' ? '자유 게시판' : '멘토링 게시판'}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              className="title-box"
            >
              <Grid item className="body-header">
                제목
              </Grid>
              <Grid item className="body-content">
                <InputBase
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="제목을 입력하세요"
                  className="body-content-input"
                  sx={{fontSize:20,fontFamily: `'Do Hyeon', sans-serif`,}}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              className="text-box"
            >
              <Grid item className="body-header">
                내용
              </Grid>
              <div className="body-content-text">
                <Grid item className="body-content">
                  <InputBase
                    value={content}
                    onChange={handleTextChange}
                    placeholder="내용을 입력하세요"
                    multiline={true}
                    className="body-content-input"
                    sx={{fontSize:20,fontFamily: `'Do Hyeon', sans-serif`,}}
                    />
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" alignItems="flex-end">
          <Grid item>
            <Button
              className="write-button"
              onClick={onClickCommunityUpdateHandler}
              sx={{fontSize:20,fontFamily: `'Do Hyeon', sans-serif`,}}
            >
              수정하기
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default CommunityUpdate;
