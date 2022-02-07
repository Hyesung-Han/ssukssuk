import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import Wrapper from './styles';

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
  const listType = props.listType;
  const listData = props.listData;
  const [moveDetail, setMoveDetail] = useState([]);

  useEffect(() => {
    if (listType === 'Notice') {
      setMoveDetail('NoticeDetail');
    } else if (listType === 'Community') {
      setMoveDetail('CommunityDetail');
    }
  }, []);

  function onRowClick(no) {
    history.push('/' + moveDetail + '/' + no);
  }

  function parsingDate(date){
    const day=date.substr(0,10)
    const time=date.substr(11,5)

    return day+" "+time;
  }

  return (
    <Wrapper>
      <Grid container>
        <TableContainer component={Paper} className="table-wrapper">
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead className="table-head"></TableHead>
            <TableBody>
              {listData.map(row =>
                row.noticeCode === 'N01' ? (
                  <TableRow
                    key={row.no}
                    onClick={() => onRowClick(row.no)}
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
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Grid item className="cell-body-buttom-front">
                              {row.author + ' | ' + parsingDate(row.date)}
                            </Grid>
                            <Grid item>
                              <div className="cell-body-buttom-back">
                                <div className="item">
                                  <VisibilityOutlinedIcon />
                                  &nbsp;&nbsp;{row.hit}
                                </div>
                                <div className="item">
                                  <CommentIcon />
                                  &nbsp;&nbsp;{row.commentCnt}
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Wrapper>
  );
};

export default BoardList;
