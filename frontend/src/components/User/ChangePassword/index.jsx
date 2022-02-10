import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import crypto from 'crypto';
import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';
import {
  TextField,
  Grid,
  Typography,
  IconButton,
  Fab,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Wrapper from './styles';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const regPwd = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,14}$/;
const regPwdCf = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,14}$/;

const successSign = withReactContent(Swal);

const InputComponent = props => {
  let { name } = props;
  const { inputValue, setInputValue } = useContext(ViewContext);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const OnChangeHandler = name => e => {
    setInputValue({ ...inputValue, [name]: e.target.value });
    if (name === '새 비밀번호') {
      if (e.target.value.length === 0) {
        setsInputPwdErr(false);
        setInputPwdErrMsg();
      } else {
        if (!regPwd.test(inputValue['새 비밀번호'])) {
          setsInputPwdErr(true);
          setInputPwdErrMsg('제대로 입력해주세요!');
        } else {
          setsInputPwdErr(false);
          setInputPwdErrMsg();
        }
      }
    }
    if (name === '새 비밀번호 확인') {
      if (e.target.value.length === 0) {
        setsInputPwdErr(false);
        setInputPwdErrMsg();
      } else {
        if (!regPwdCf.test(inputValue['새 비밀번호 확인'])) {
          setsInputPwdErr(true);
          setInputPwdErrMsg('제대로 입력해주세요!');
        } else {
          setsInputPwdErr(false);
          setInputPwdErrMsg();
        }
      }
    }
  };

  const [inputPwdErr, setsInputPwdErr] = useState(false);
  const [inputPwdErrMsg, setInputPwdErrMsg] = useState();

  useEffect(() => {
    if (
      // undefined 뭐냐...
      !!inputValue['현재 비밀번호'] &&
      !!inputValue['새 비밀번호'] &&
      !!inputValue['새 비밀번호 확인'] &&
      inputPwdErr === false
    ) {
      props.setDisabled(false);
    } else {
      props.setDisabled(true);
    }
    // console.log(!!!!inputValue['현재 비밀번호']);

    // if (
    //   inputValue['현재 비밀번호'] === '' ||
    //   inputValue['새 비밀번호'] === '' ||
    //   inputValue['새 비밀번호 확인'] === '' ||
    //   inputPwdErr === true
    // ) {
    //   props.setDisabled(true);
    // }
  }, [
    inputValue['현재 비밀번호'],
    inputValue['새 비밀번호'],
    inputValue['새 비밀번호 확인'],
    inputPwdErr,
  ]);

  const onClickHandler = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <Wrapper>
      <ContentDefaultComponent
        LefetComponent={
          <Typography variant="body1" className="title">
            {name}
          </Typography>
        }
        RightComponet={
          <>
            <TextField
              required
              error={inputPwdErr}
              helperText={inputPwdErrMsg}
              id={`outlined-password-input-${name}`}
              label={name}
              defaultValue={inputValue[name]}
              variant="outlined"
              autoComplete="current-password"
              onChange={OnChangeHandler(name)}
              type={isShowPassword ? '' : 'password'}
              className="input-component-text-field"
            />
            <IconButton
              onClick={onClickHandler}
              className="input-component-icon-button"
            >
              <VisibilityIcon />
            </IconButton>
          </>
        }
      />
    </Wrapper>
  );
};

// 글 왼쪽/오른쪽 나눈거 (왼쪽 = 라벨 / 오른쪽 = 인풋)
const ContentDefaultComponent = props => {
  const { LefetComponent, RightComponet } = props;
  return (
    <Wrapper>
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
        <Grid item xs={9}>
          {RightComponet}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

// 우하단 버튼들 관련
const MyInfoButtonGroupComponent = props => {
  let history = useHistory();
  const user = useSelector(state => state.Auth.user);
  // const [disabled, setDisabled] = useState(true);
  const { setUserDetailDialogOpen, serverUrlBase } = useContext(CommonContext);
  const { inputValue } = useContext(ViewContext);

  const handleClose = () => {
    setUserDetailDialogOpen(false);
    history.goBack();
  };

  // 확인버튼을 누르면 실행되는 기능
  const onMyInfoSaveHandelr = async props => {
    var Pwd = inputValue['현재 비밀번호'];
    var newPwd = inputValue['새 비밀번호'];
    var newPwdCf = inputValue['새 비밀번호 확인'];
    if (newPwd !== newPwdCf) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호 불일치',
        text: '직접 확인하며 작성해보세요!',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      return;
    }

    let hashPwd = '';
    let hashNewPwd = '';

    try {
      hashPwd = crypto
        .createHash('sha512')
        .update(Pwd)
        .digest('hex');
      hashNewPwd = crypto
        .createHash('sha512')
        .update(newPwd)
        .digest('hex');
    } catch (error) {
      console.log('signInHandler -> error', error);
      return;
    }
    Axios.defaults.headers.common['authorization'] = user.token;
    Axios.patch(serverUrlBase + '/user/updatepw/', {
      user_id: user.user_id,
      user_pw: hashPwd,
      user_new_pw: hashNewPwd,
    })
      .then(data => {
        if (data.status === 200) {
          if (data.data.result === 'success') {
            successSign.fire({
              icon: 'success',
              title: <strong>변경 완료!</strong>,
              html: <i>자동 로그인 됬어요~!</i>,
            });
            history.goBack();
          } else {
            Swal.fire({
              icon: 'error',
              title: '입력 정보 오류',
              text: '현재 비밀번호 틀렸어요!',
              footer: '<a href="">Why do I have this issue?</a>',
              target: document.querySelector('.MuiDialog-root'),
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '변경 실패!',
            text: '??',
            footer: '<a href="">Why do I have this issue?</a>',
            target: document.querySelector('.MuiDialog-root'),
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    // var body = {
    //   new_pwd: hashPassword,
    //   before_pwd: hashBeforePwd,
    //   user_id: user.user_id,
    // };

    // if (respone['status'] === 200) {
    //   alert('Has changed.');
    // } else {
    //   alert('Change failed.');
    // }
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        className="my-info-button-group-component-grid"
      >
        <Fab
          variant="extended"
          aria-label="like"
          onClick={handleClose}
          className="cancel-fab my-info-button-group-component-grid-fab1"
        >
          취소
        </Fab>

        <Fab
          variant="extended"
          disabled={props.disabled}
          aria-label="like"
          color="inherit"
          onClick={onMyInfoSaveHandelr}
          className="upload-fab my-info-button-group-component-grid-fab2"
        >
          확인
        </Fab>
      </Grid>
    </Wrapper>
  );
};

// 전체 구조
const ChangePasswordComponent = params => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Wrapper>
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <h2 className="section-title">비밀번호 변경</h2>
          <Grid
            item
            xs={12}
            className="change-password-component-grid-item"
          ></Grid>
          <Grid item xs={12}>
            <InputComponent name={'현재 비밀번호'} setDisabled={setDisabled} />
          </Grid>
          <Grid item xs={12}>
            <InputComponent name={'새 비밀번호'} setDisabled={setDisabled} />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              name={'새 비밀번호 확인'}
              setDisabled={setDisabled}
            />
          </Grid>
          <Grid item xs={12}>
            <MyInfoButtonGroupComponent disabled={disabled} />
          </Grid>
        </Grid>
      </form>
    </Wrapper>
  );
};

const ChangePassword = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <ViewContext.Provider value={{ inputValue, setInputValue }}>
      <ChangePasswordComponent />
    </ViewContext.Provider>
  );
};

export default ChangePassword;
