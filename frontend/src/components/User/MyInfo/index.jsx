import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  useContext,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInit } from '../../../redux/reducers/AuthReducer';
import store from 'store';
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
import { setNickname } from '../../../redux/reducers/AuthReducer';

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
          disabled={keyValue === 'user_nickName' ? false : true}
          id={`outlined-basic-${keyValue}`}
          defaultValue={inputValue[keyValue]}
          variant="outlined"
          fullWidth={true}
          onChange={OnChangeHandler}
          multiline={rows !== null ? true : false}
          rows={rows !== null ? rows : 1}
          maxRows={3}
        />
      }
    />
  );
};

const MyInfoButtonGroupComponent = props => {
  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user);

  const { setUserDetailDialogOpen, serverUrlBase } = useContext(CommonContext);

  const { inputValue } = useContext(ViewContext);

  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  const handleClose = () => {
    setUserDetailDialogOpen(false);
    history.goBack();
  };

  const onMyInfoSaveHandelr = async props => {
    let body = {
      user_id: inputValue.user_id,
      user_nickName: inputValue.user_nickName,
    };

    Axios.defaults.headers.common['authorization'] = user.token;
    Axios.patch(serverUrlBase + `/user/updateinfo`, body)
      .then(data => {
        if (data.status === 200) {
          dispatch(setNickname(body.user_nickName));
          alert('변경 완료');
        } else {
          console.log('회원정보 수정 실패 : ' + data.status);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const regNnm = /^[ㄱ-ㅎ|가-힣]+.{1,}$/;
  useEffect(() => {
    console.log('수정테스트 : ' + inputValue.user_nickName, user.name);
    if (
      inputValue.user_nickName !== user.name &&
      regNnm.test(inputValue.user_nickName)
    ) {
      Axios.get(
        serverUrlBase + `/user/checknick/` + inputValue.user_nickName,
      ).then(data => {
        if (data.data.nickchk === false) {
          setIsReadyToUpload(false);
        } else {
          setIsReadyToUpload(true);
        }
      });
      return;
    } else {
      setIsReadyToUpload(false);
      return;
    }
  }, [inputValue.user_nickName]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      className="on-my-info-save-handelr-grid"
    >
      <Fab
        variant="extended"
        aria-label="like"
        onClick={handleClose}
        className="cancel-fab on-my-info-save-handelr-grid-fab1"
      >
        취소
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
        수정
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
      justifyContent="center"
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

const MyInfoContentComponent = props => {
  return (
    <form noValidate autoComplete="off">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <h2 className="section-title">회원정보</h2>

        <Grid item xs={12}>
          <MyInfoInputComponent title="아이디" keyValue="user_id" />
        </Grid>
        <Grid item xs={12}>
          <MyInfoInputComponent title="이름" keyValue="user_name" />
        </Grid>

        <Grid item xs={12}>
          <MyInfoInputComponent title="별명" keyValue="user_nickName" />
        </Grid>

        <Grid item xs={12}>
          <MyInfoInputComponent title="이메일" keyValue="user_email" />
        </Grid>
        <Grid item xs={12}>
          <MyInfoInputComponent title="등급" keyValue="user_code" />
        </Grid>

        <Grid item xs={12}></Grid>
        <MyInfoButtonGroupComponent />
      </Grid>
    </form>
  );
};

const MyInfo = () => {
  const user = useSelector(state => state.Auth.user);
  const { serverUrlBase } = useContext(CommonContext);
  const [inputValue, setInputValue] = useState({
    user_id: '',
    user_name: '',
    user_nickName: '',
    user_email: '',
    user_code: '',
  });
  let err = false;
  let errMsg = '';
  useEffect(() => {
    Axios.get(serverUrlBase + '/user/myInfo/' + user.user_id)
      .then(data => {
        const info_result = data.data.result;
        if (info_result === 'success') {
          const info_user = data.data.user[0];
          setInputValue(info_user);
        } else {
          alert('내 정보 불러오기 실패');
        }
      })
      .catch(error => {
        console.log('내정보 ' + error);
      });
  }, []);

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
