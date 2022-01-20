import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';

import {
  Avatar,
  TextField,
  Button,
  Grid,
  Typography,
  Fab,
} from '@material-ui/core';
import Wrapper from './styles';

const MyInfoUploadImageComponent = () => {
  const { user } = useContext(CommonContext);

  const onDrop = useCallback(acceptedFiles => {
    console.log('Basic -> acceptedFiles', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone(onDrop);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Fragment>
          <Typography> {user.nick_name} </Typography>
          <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
            </div>
          </section>
        </Fragment>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

const MyInfoInputComponent = props => {
  let { keyValue, title, rows } = props;

  const { inputValue, setInputValue } = useContext(ViewContext);

  const OnChangeHandler = e => {
    setInputValue({ ...inputValue, [keyValue]: e.target.value });
  };

  return (
    <MyInfoContentDefaultComponent
      LefetComponent={
        <Typography variant="body1" className="title">
          {title}
        </Typography>
      }
      RightComponet={
        <TextField
          disabled={keyValue === 'nick_name' ? false : true}
          id={`outlined-basic-${keyValue}`}
          defaultValue={inputValue[keyValue]}
          variant="outlined"
          fullWidth={true}
          onChange={OnChangeHandler}
          multiline={rows !== null ? true : false}
          rows={rows !== null ? rows : 1}
          rowsMax={3}
        />
      }
    />
  );
};

const MyInfoButtonGroupComponent = props => {
  let history = useHistory();
  const { setUserDetailDialogOpen, user, serverUrl, setUser } = useContext(
    CommonContext,
  );
  const { inputValue } = useContext(ViewContext);

  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  const handleClose = () => {
    setUserDetailDialogOpen(false);
    history.goBack();
  };

  const onMyInfoSaveHandelr = async props => {
    let respone = [];
    let data = {};
    const formData = new FormData();

    let body = {
      ...inputValue,
    };

    formData.append('optionData', JSON.stringify(body));

    alert('Not implemented yet.');

    setUser({ ...data, status: 'login' });
  };

  useEffect(() => {
    if (inputValue.user_id !== user.user_id) {
      setIsReadyToUpload(true);
      return;
    }

    if (inputValue.user_nm !== user.user_nm) {
      setIsReadyToUpload(true);
      return;
    }

    if (inputValue.user_data !== '') {
      setIsReadyToUpload(true);
      return;
    }
  }, [inputValue.user_id, inputValue.user_nm, inputValue.user_data]);

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      className="on-my-info-save-handelr-grid"
    >
      <Fab
        variant="extended"
        aria-label="like"
        onClick={handleClose}
        className="cancel-fab on-my-info-save-handelr-grid-fab1"
      >
        CANCEL
      </Fab>

      <Fab
        variant="extended"
        aria-label="like"
        color="inherit"
        onClick={() => {
          if (isReadyToUpload) {
            onMyInfoSaveHandelr();
          }
        }}
        className="upload-fab"
        style={{
          backgroundColor: isReadyToUpload ? '#9aba11' : '#E0E0E0',
        }}
      >
        UPLOAD
      </Fab>
    </Grid>
  );
};

const MyInfoContentDefaultComponent = props => {
  const { LefetComponent, RightComponet } = props;
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={3}>
        {LefetComponent}
      </Grid>
      <Grid item xs={7}>
        {RightComponet}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

const MyInfoContentComponent = () => {
  return (
    <form noValidate autoComplete="off">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <h2 className="section-title">회원정보</h2>

        <Grid item xs={12}>
          <MyInfoInputComponent title="아이디" keyValue="user_id" />
        </Grid>
        <Grid item xs={12}>
          <MyInfoInputComponent title="이름" keyValue="user_nm" />
        </Grid>

        <Grid item xs={12}>
          <MyInfoInputComponent title="별명" keyValue="nick_name" />
        </Grid>

        <Grid item xs={12}>
          <MyInfoInputComponent title="이메일" keyValue="user_email" />
        </Grid>
        <Grid item xs={12}>
          <MyInfoInputComponent title="등급" keyValue="user_email" />
        </Grid>

        <Grid item xs={12}></Grid>
        <MyInfoButtonGroupComponent />
      </Grid>
    </form>
  );
};

const MyInfo = () => {
  const { user } = useContext(CommonContext);

  const [inputValue, setInputValue] = useState({
    user_nm: user.user_nm,
    user_id: user.user_id,
    web_site: user.web_site,
  });
  return (
    <ViewContext.Provider
      value={{
        inputValue,
        setInputValue,
      }}
    >
      <Wrapper>
        <MyInfoContentComponent />
      </Wrapper>
    </ViewContext.Provider>
  );
};

export default MyInfo;
