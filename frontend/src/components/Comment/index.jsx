import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import Wrapper from './styles';
import CommentList from './CommentList';
import { CommonContext } from '../../context/CommonContext';

import { Grid, Button, FormControl, TextField } from '@mui/material';

const Comment = props => {
  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const boardUrl = '/' + props.listType;
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [updateDone, setUpdateDone] = useState(false);

  const handleTextChange = e => {
    setContent(e.target.value);
  };

  const onClickCommentWriteHandler = e => {
    Axios.post(serverUrlBase + boardUrl + '/comment/write', {
      comment_user_nickName: user.user_nickName,
      article_no: props.no,
      comment_text: content,
      comment_user_id: user.user_id,
    })
      .then(data => {
        if (data.status === 200) {
          setContent('');
          getCommentList();
        }
      })
      .catch(e => {
        console.log('notice comment write error', e);
      });
  };

  const getCommentList = async () => {
    try {
      const res = await Axios.get(serverUrlBase + boardUrl + '/comment/list', {
        params: { article_no: props.no },
      });
      setCommentList(res.data.data);
    } catch (e) {
      console.log('getCommentList error', e);
    }
  };

  const onDeleteComment = no => {
    Axios.delete(serverUrlBase + boardUrl + '/comment/delete/' + no)
      .then(data => {
        if (data.status === 200) {
          alert('삭제성공');
          getCommentList();
        } else {
          console.log('삭제실패');
        }
      })
      .catch(e => {
        console.log('comment delete error', e);
      });
  };

  const onUpdateComment = comment => {
    Axios.defaults.headers.common['authorization'] = user.token;
    Axios.patch(serverUrlBase + boardUrl + '/comment/update', {
      comment_no: comment.comment_no,
      comment_text: comment.comment_text,
    }).then(data => {
      if (data.status === 200) {
        alert('변경 완료');
        getCommentList();
        setUpdateDone(true);
      }
    });
  };

  useEffect(() => {
    getCommentList();
  }, []);

  useEffect(() => {
    setUpdateDone(false);
  }, [commentList]);

  return (
    <Wrapper alignItems="center">
      <FormControl fullWidth>
        <TextField
          id="filled-textarea"
          placeholder="댓글을 입력하세요"
          multiline
          variant="outlined"
          value={content}
          onChange={handleTextChange}
        />
      </FormControl>
      <Grid container direction="column" alignItems="flex-end">
        <Grid item>
          <Button className="write-button" onClick={onClickCommentWriteHandler}>
            댓글등록
          </Button>
        </Grid>
      </Grid>
      <CommentList
        commentList={commentList}
        onDeleteComment={onDeleteComment}
        onUpdateComment={onUpdateComment}
        updateDone={updateDone}
      />
    </Wrapper>
  );
};

export default Comment;
