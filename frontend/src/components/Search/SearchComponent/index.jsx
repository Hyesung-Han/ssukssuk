import React, { useContext, useState } from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import { FormControl, Select, MenuItem } from '@mui/material';

import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';

import { ViewContext } from '../../../context/ViewContext';

const SearchComponent = () => {
  const {
    searchValue,
    setSearchValue,
    searchCategory,
    setSearchCategory,
    // setIsSearch,
  } = useContext(ViewContext);

  const handleChange = event => {
    setSearchCategory(event.target.value);
  };

  const TopSearchCloseHandler = e => {
    if (e.target.type !== 'text') {
      return;
    }
  };

  const SearchHandler = () => {
    setSearchValue(value);
  };

  const [value, setValue]=useState('');
  const onChangeSearchValueHandler = e => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <Grid
        container
        alignItems="flex-end"
        justify="center"
        direction="column"
        className="search-component-grid"
        onClick={TopSearchCloseHandler}
      >
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Select
                value={searchCategory}
                onChange={handleChange}
                // autoWidth="false"
                displayEmpty
                className="select-box"
              >
                <MenuItem value={0}>제목+내용</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <TextField
                value={value}
                // placeholder="찾고싶은 내용을 입력하세요"
                // autoFocus={true}
                variant="outlined"
                size="small"
                onChange={onChangeSearchValueHandler}
                className="input1"
              />
            </Grid>
            <Grid item>
              <Button className="write-button" onClick={SearchHandler}>
                검색
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SearchComponent;
