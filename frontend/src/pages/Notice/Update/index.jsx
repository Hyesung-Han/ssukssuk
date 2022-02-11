import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../layout/';
import Wrapper from './styles';
import Axios from 'axios';
import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Grid, Button, InputBase } from '@mui/material';

const NoticeWrite = ({ match }) => {
  const no = match.params.no;
  let history = useHistory();

  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);

  const [code, setCode] = React.useState('N02');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const getNotice = async () => {
    try {
      const res = await Axios.get(serverUrlBase + `/notice/detail/` + no);
      const data = res.data.data;
      setTitle(data.notice_title);
      setContent(data.notice_content);
    } catch (e) {
      console.log('getNotice error!!', e);
    }
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleTextChange = e => {
    setContent(e.target.value);
  };

  const onClickNoticeUpdateHandler = () => {
    if (!user.status) {
      alert('회원정보 오류! 로그인을 확인해주세요');
      history.push('/Notice');
      return;
    }

    Axios.defaults.headers.common['authorization'] = user.token;
    Axios.patch(serverUrlBase + `/notice/update`, {
      notice_title: title,
      notice_content: content,
      notice_no: no,
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

  useEffect(() => {
    getNotice();
  }, []);

  useEffect(() => {
    if (user.user_code === 'U03' || user.user_code === 'U04') {
      setCode('N01');
    }
  }, [code]);

  return (
    <Layout>
      <Wrapper>
        <Grid container>
          <h2>문의사항 수정하기</h2>
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
              <Grid item className="body-header">
                분류
              </Grid>
              <Grid item className="body-content">
                {code === 'N01' ? '공지사항' : '문의하기'}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
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
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
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
              onClick={onClickNoticeUpdateHandler}
            >
              수정하기
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default NoticeWrite;
