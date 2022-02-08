import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Wrapper from './styles';

import { Grid, TableCell, TableRow } from '@mui/material';

const BoardItem = props => {
  let history = useHistory();
  const { kind, row } = props;

  function onRowClick(community_no) {
    history.push('/CommunityDetail/' + community_no);
  }

  function onNoticeClick(notice_no) {
    //나중에 noticeDetail로 변경
    history.push('/CommunityDetail/' + notice_no);
  }

  return (
    <Wrapper>
      {kind === 'notice' ? (
        <TableRow
          key={row.no}
          onClick={() => onNoticeClick(row.no)}
          className="table-row"
        >
          <TableCell
            component="th"
            scope="row"
            align="center"
            className="notice-front"
          >
            Notice
          </TableCell>
          <TableCell className="cell-body">
            <Grid
              container
              direction="column"
              justifyContent="space-around"
              className="cell-body-main"
            >
              {row.title}
            </Grid>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow
          key={row.no}
          // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={() => onRowClick(row.no)}
          className="table-row"
        >
          <TableCell
            component="th"
            scope="row"
            align="center"
            className="cell-front"
          >
            {row.no}
          </TableCell>
          <TableCell className="cell-body">
            <Grid
              container
              // direction="column"
              spacing={1}
              direction="column"
              justifyContent="space-around"
              className="cell-body-main"
            >
              <Grid item className="cell-body-top">
                {row.title}
              </Grid>
              <Grid item className="cell-body-buttom">
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item className="cell-body-buttom-front">
                    {row.author + ' | ' + row.date}
                  </Grid>
                  <Grid item>
                    <div className="cell-body-buttom-back">
                      <div className="item">
                        <VisibilityOutlinedIcon />
                        &nbsp;&nbsp;{row.hit}
                      </div>
                      <div className="item">
                        <VisibilityOutlinedIcon />
                        &nbsp;&nbsp;{row.hit}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      )}
    </Wrapper>
  );
};

export default BoardItem;
