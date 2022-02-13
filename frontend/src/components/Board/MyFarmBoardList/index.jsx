import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { visuallyHidden } from '@mui/utils';

import Axios from 'axios';
import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';

import { SeverityPill } from './severity-pill';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'survey_date',
    numeric: false,
    disablePadding: false,
    label: '📅날짜',
  },
  {
    id: 'temperature',
    numeric: false,
    disablePadding: false,
    label: '🔅온도',
  },
  {
    id: 'humidity',
    numeric: false,
    disablePadding: false,
    label: '💧습도',
  },
  {
    id: 'survey_result',
    numeric: false,
    disablePadding: false,
    label: '💯상태',
  },
  {
    id: 'survey_etc',
    numeric: false,
    disablePadding: false,
    label: '📝특이사항',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {/* 여기는 히스토리 목차 색상! */}
      <TableRow sx={{ bgcolor: '#fff9c4' }}>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = props => {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 500,
          fontFamily: `'Do Hyeon', sans-serif`,
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        📚설문 히스토리
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const MyFarmBoardList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('user_name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [myFarmHistory, setMyFarmHistory] = useState([]);

  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const farm = useSelector(state => state.Farm.farm);

  const parsingDate = date => {
    const day = date.substr(0, 10);
    const time = date.substr(11, 5);

    return day + ' ' + time;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myFarmHistory.length) : 0;

  const getMyFarmHistory = () => {
    Axios.get(serverUrlBase + `/myfarm_survey/list`, {
      params: {
        user_id: user.user_id,
        farm_no: farm.farm_no,
      },
    })
      .then(data => {
        setMyFarmHistory(data.data.data);
      })
      .catch(function(error) {
        console.log('user list error ' + error);
      });
  };

  useEffect(() => {
    getMyFarmHistory();
  }, []);

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: '#f5f5f5',
        width: '100%',
      }}
    >
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={myFarmHistory.length}
            />
            <TableBody>
              {stableSort(myFarmHistory, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.survey_date);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.survey_date)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.survey_date}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        <Typography>{parsingDate(row.survey_date)}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.temperature}°C</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.humidity}%</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <SeverityPill
                          color={
                            (row.survey_result === 0 && 'success') ||
                            (row.survey_result === 1 && 'warning') ||
                            'error'
                          }
                        >
                          {row.survey_result === 0 ? (
                            <Typography>상</Typography>
                          ) : row.survey_result === 1 ? (
                            <Typography>중</Typography>
                          ) : (
                            <Typography>하</Typography>
                          )}
                        </SeverityPill>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.survey_etc}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={myFarmHistory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        sx={{ ml: 1 }}
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default MyFarmBoardList;
