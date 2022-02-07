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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import Axios from 'axios';
import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';

import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const successSign = withReactContent(Swal);

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: 'user_id',
    numeric: false,
    disablePadding: true,
    label: '아이디',
  },
  {
    id: 'user_name',
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: 'user_nickname',
    numeric: true,
    disablePadding: false,
    label: '별명',
  },
  {
    id: 'user_email',
    numeric: true,
    disablePadding: false,
    label: '이메일',
  },
  {
    id: 'user_grade',
    numeric: true,
    disablePadding: false,
    label: '등급[코드]',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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

// 강퇴, 등급 변경 관련 메뉴!
const FadeMenu = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userId = props.checkId;
  const getUserList = props.getUserList;

  // 무한? console.log(userId);
  const { serverUrlBase } = useContext(CommonContext);

  // 라즈베리파이에서 만든거 강퇴 안됨(??)
  const onDeleteUser = async props => {
    setAnchorEl(null);
    Axios.delete(serverUrlBase + `/admin/delete/` + userId)
      .then(data => {
        getUserList();
        successSign.fire({
          icon: 'success',
          title: <strong>추방!</strong>,
          html: <i>되돌릴 수 없어요... 아시죠?</i>,
          target: document.querySelector('.MuiDialog-root'),
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangeUser01 = async props => {
    setAnchorEl(null);
    Axios.put(serverUrlBase + '/admin/update/', {
      user_id: userId,
      user_code: 'U01',
    })
      .then(data => {
        getUserList();
        successSign.fire({
          icon: 'success',
          title: <strong>일반으로!</strong>,
          html: <i>등급 변경 완료!</i>,
          target: document.querySelector('.MuiDialog-root'),
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangeUser02 = async props => {
    setAnchorEl(null);
    Axios.put(serverUrlBase + '/admin/update/', {
      user_id: userId,
      user_code: 'U02',
    })
      .then(data => {
        getUserList();
        successSign.fire({
          icon: 'success',
          title: <strong>멘토로!</strong>,
          html: <i>등급 변경 완료!</i>,
          target: document.querySelector('.MuiDialog-root'),
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangeUser03 = async props => {
    setAnchorEl(null);
    Axios.put(serverUrlBase + '/admin/update/', {
      user_id: userId,
      user_code: 'U03',
    })
      .then(data => {
        getUserList();
        successSign.fire({
          icon: 'success',
          title: <strong>운영자로!</strong>,
          html: <i>등급 변경 완료!</i>,
          target: document.querySelector('.MuiDialog-root'),
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangeUser04 = async props => {
    setAnchorEl(null);
    Axios.put(serverUrlBase + '/admin/update/', {
      user_id: userId,
      user_code: 'U04',
    })
      .then(data => {
        getUserList();
        successSign.fire({
          icon: 'success',
          title: <strong>관리자로!</strong>,
          html: <i>등급 변경 완료!</i>,
          target: document.querySelector('.MuiDialog-root'),
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Tooltip
        title="Filter list"
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuList>
          <MenuItem onClick={onDeleteUser}>
            <ListItemIcon>
              <PersonRemoveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>회원 강퇴</ListItemText>
          </MenuItem>
          <MenuItem onClick={onChangeUser01}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>등급 변경 [일반]</ListItemText>
          </MenuItem>
          <MenuItem onClick={onChangeUser02}>
            <ListItemIcon>
              <AssignmentIndIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>등급 변경 [멘토]</ListItemText>
          </MenuItem>
          <MenuItem onClick={onChangeUser03}>
            <ListItemIcon>
              <ManageAccountsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>등급 변경 [운영자]</ListItemText>
          </MenuItem>
          <MenuItem onClick={onChangeUser04}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>등급 변경 [관리자]</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = props => {
  const { numSelected } = props;
  const checkId = props.checkId;
  const getUserList = props.getUserList;
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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}명 선택
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          회원 목록
        </Typography>
      )}
      <FadeMenu checkId={checkId} getUserList={getUserList}></FadeMenu>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// 관리자 페이지에 갈 관리자리스트 컴포넌트
const AdminBoardList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('user_name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const [checkId, setCheckId] = useState('');

  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = userList.map(n => n.user_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    setCheckId(name);

    // 클릭시 id 찍힘 & 클릭 해제해도 찍힘 (클릭 행위자체로 찍힘)
    // console.log(name);

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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const getUserList = () => {
    Axios.get(serverUrlBase + `/admin/list`, {
      params: {
        id: user.user_id,
      },
    })
      .then(data => {
        setUserList(data.data.user);
      })
      .catch(function(error) {
        console.log('user list error ' + error);
      });
  };

  // 1번인가? 여러번인가?
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          checkId={checkId}
          numSelected={selected.length}
          getUserList={getUserList}
        />
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
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={userList.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(userList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.user_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.user_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.user_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.user_id}
                      </TableCell>
                      <TableCell align="right">{row.user_name}</TableCell>
                      <TableCell align="right">{row.user_nickname}</TableCell>
                      <TableCell align="right">{row.user_email}</TableCell>
                      <TableCell align="right">{row.user_code}</TableCell>
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
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default AdminBoardList;
