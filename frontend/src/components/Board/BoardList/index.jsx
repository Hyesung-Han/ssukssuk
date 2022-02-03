import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Wrapper from './styles';

import BoardItem from '../BoardItem';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const BoardList = props => {
  let history = useHistory();

  const noticeData = props.noticeData;
  const listData = props.listData;

  console.log(listData);

  function onRowClick(community_no) {
    history.push('/CommunityDetail/' + community_no);
  }

  function onNoticeClick(notice_no) {
    //나중에 noticeDetail로 변경
    history.push('/CommunityDetail/' + notice_no);
  }

  return (
    <Wrapper>
      <Grid container>
        <TableContainer component={Paper} className="table-wrapper">
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead className="table-head"></TableHead>
            <TableBody>
              {noticeData.map(row => (
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
              ))}
              {listData.map(row => (
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
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                        >
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Wrapper>
  );
};

export default BoardList;
