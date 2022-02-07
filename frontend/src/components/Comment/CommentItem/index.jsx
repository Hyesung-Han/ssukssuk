import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { CommonContext } from '../../../context/CommonContext';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import {
  TextField,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';

const CommentItem = ({
  comment,
  onDeleteComment,
  onUpdateComment,
  updateDone,
}) => {
  const user = useSelector(state => state.Auth.user);
  const [isEdit, setIsEdit] = useState(true);
  const [isVisible, setIsVisible] = useState('visible');
  const [isDoneVisible, setIsDoneVisible] = useState('hidden');
  const [newComment, setNewComment] = useState(comment);
  const [saveComment, setSaveComment] = useState(comment);
  const [writterCode, setWritterCode]=useState('U02');

  const { serverUrlBase } = useContext(CommonContext);

  const handleEditTextChange = e => {
    setNewComment({ ...newComment, comment_text: e.target.value });
  };

  const onClickCommentEditHandler = () => {
    setIsEdit(false);
    setIsVisible('hidden');
    setIsDoneVisible('visible');

    setSaveComment(comment);
  };

  const onUpdateCancelComment = () => {
    setNewComment(saveComment);

    setIsEdit(true);
    setIsVisible('visible');
    setIsDoneVisible('hidden');
  };

  function parsingDate(date) {
    const day = date.substr(0, 10);
    const time = date.substr(11, 5);

    return day + ' ' + time;
  }

  const getCommentList = async () => {
    try {
      Axios.get(serverUrlBase + '/user/myInfo/'+comment.comment_user_id)
        .then(data => {
          if (data.status === 200) {
            setWritterCode(data.data.user[0].user_code);
            // console.log(writterCode)
          }
        })
        .catch(e => {
          console.log('notice comment write error', e);
        });
    } catch (e) {
      console.log('getCommentList error', e);
    }
  };

  useEffect(() => {
    if (updateDone) {
      setIsEdit(true);
      setIsVisible('visible');
      setIsDoneVisible('hidden');
    }
  }, [updateDone]);

  getCommentList()

  return (
    <>
      <ListItem key={comment.comment_no} alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              {writterCode === 'U02' && (
                <IconButton aria-label="mento">
                  <EmojiEventsIcon />
                </IconButton>
              )}

              {writterCode === 'U03' ||
                writterCode === 'U04' && (
                  <IconButton aria-label="manager">
                    <ManageAccountsIcon />
                  </IconButton>
                )}

              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="subtitle2"
                color="text.primary"
              >
                {comment.comment_user_nickName}
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="caption"
              >
                {' '}
                | {parsingDate(comment.comment_date)}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <>
              <TextField
                fullWidth
                InputProps={{ disableUnderline: true }}
                multiline
                variant="standard"
                value={newComment.comment_text}
                onChange={handleEditTextChange}
                disabled={isEdit}
                inputRef={input => {
                  if (input != null) {
                    input.focus();
                  }
                }}
              />
            </>
          }
        />
        {user.user_id === comment.comment_user_id && (
          <React.Fragment>
            <IconButton
              aria-label="edit"
              sx={{ visibility: isVisible }}
              onClick={onClickCommentEditHandler}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              sx={{ visibility: isVisible }}
              onClick={() => onDeleteComment(comment.comment_no)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="done"
              sx={{ visibility: isDoneVisible }}
              onClick={() => onUpdateComment(newComment)}
            >
              <DoneOutlineIcon />
            </IconButton>
            <IconButton
              aria-label="cancel"
              sx={{ visibility: isDoneVisible }}
              onClick={() => onUpdateCancelComment()}
            >
              <CancelIcon />
            </IconButton>
          </React.Fragment>
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CommentItem;
