import React, { useContext, useState } from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import { Select, MenuItem } from '@mui/material';

import Wrapper from './styles';

import { ViewContext } from '../../../context/ViewContext';

const SearchComponent = () => {
  const { setSearchValue, searchCategory, setSearchCategory } = useContext(
    ViewContext,
  );

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

  const [value, setValue] = useState('');
  const onChangeSearchValueHandler = e => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <Grid
        container
        alignItems="flex-end"
        justifyContent="center"
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
                displayEmpty
                className="select-box"
                // sx={{fontFamily: `'Do Hyeon', sans-serif`, fontSize:18}}
              >
                <MenuItem value={0}>제목+내용</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <TextField
                value={value}
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
