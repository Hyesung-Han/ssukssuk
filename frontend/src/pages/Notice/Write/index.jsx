import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../layout/';
import Wrapper from './styles';
import Axios from 'axios';
import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Typography, Grid, Button, InputBase } from '@mui/material';

const NoticeWrite = () => {
  let history = useHistory();

  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);

  const [code, setCode] = React.useState('N02');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (user.user_code === 'U03' || user.user_code === 'U04') {
      setCode('N01');
    }
  }, [code]);

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleTextChange = e => {
    setContent(e.target.value);
  };

  const onClickNoticeWriteHandler = () => {
    if (!user.status) {
      alert('회원정보 오류! 로그인을 확인해주세요');
      history.push('/Notice');
      return;
    }

    Axios.post(serverUrlBase + `/notice/write`, {
      notice_title: title,
      notice_author: user.user_nickName,
      notice_content: content,
      notice_code: code,
      notice_user_id: user.user_id,
    })
      .then(data => {
        if (data.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '글이 성공적으로 등록되었습니다.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '에러',
          });
        }
        history.push('/Notice');
      })
      .catch(function(error) {
        console.log('notice regi error:' + error);

        Swal.fire({
          icon: 'error',
          title: '에러',
        });
      });
  };

  return (
    <Layout>
      <Wrapper>
        <Grid container>
          <h2>문의사항 글쓰기</h2>
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
                <Typography sx={{fontSize:18, color:'#495057', fontFamily: `'Do Hyeon', sans-serif`,}}>{code === 'N01' ? '공지사항' : '문의하기'}</Typography>
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
                  sx={{fontSize:18,fontFamily: `'Do Hyeon', sans-serif`,}}
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
                    sx={{fontSize:18,fontFamily: `'Do Hyeon', sans-serif`,}}
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
              onClick={onClickNoticeWriteHandler}
              sx={{fontSize:18,fontFamily: `'Do Hyeon', sans-serif`,}}
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default NoticeWrite;
