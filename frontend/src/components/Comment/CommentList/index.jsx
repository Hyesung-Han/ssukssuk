import React from 'react';
import CommentItem from '../CommentItem';

import { List } from '@mui/material';

const CommentList = ({
  commentList,
  onDeleteComment,
  onUpdateComment,
  updateDone,
}) => {
  return (
    <>
      <hr></hr>
      {commentList.length && (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {commentList.map(comment => (
            <CommentItem
              key={comment.comment_no}
              comment={comment}
              onDeleteComment={onDeleteComment}
              onUpdateComment={onUpdateComment}
              updateDone={updateDone}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default CommentList;
