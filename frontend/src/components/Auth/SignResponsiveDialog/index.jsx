import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux/reducers/AuthReducer';
import { setFarm } from '../../../redux/reducers/FarmReducer';
import crypto from 'crypto';
import { ViewContext } from '../../../context/ViewContext';
import { CommonContext } from '../../../context/CommonContext';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
} from '@material-ui/core';

import Wrapper from './styles';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// 아이디 체크 (영소문자+숫자, 4자이상)
const regId = /^[a-z0-9]{4,}$/;

// 비번/비번확인 체크 (영문소문자+숫자+특수문자 최소 1개 이상, 8~15자리)
const regPwd = /^[a-z0-9#?!@$ %^&*-]{7,14}$/;
const regPwdCf = /^[a-z0-9#?!@$ %^&*-]{7,14}$/;

// 이름/닉네임 체크 (한글만, 2자이상)
const regNm = /^[가-힣]{2,}$/;
const regNnm = /^[가-힣]{2,}$/;

// 이메일 체크 (대소문자 구분 X, 문자/숫자연속가능)
const regEma = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const successSign = withReactContent(Swal);

const DialogTitleComponent = () => {
  return (
    <Wrapper>
      <h1 className="dialog-title-component">
        <img className="logo_img" src="images/ssug_green.png" alt="logo" />
      </h1>
    </Wrapper>
  );
};

const SignInSection01 = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [disabled, setDisabled] = useState(true);

  const { signInUserData, setSignInUserData, setIsSignUp } = useContext(
    ViewContext,
  );

  const { setSignDialogOpen, serverUrlBase, setIsShowKeyborad } = useContext(
    CommonContext,
  );

  // 변화가 일어날 때마다 (값)
  const OnChangeHandler = name => e => {
    setSignInUserData({ ...signInUserData, [name]: e.target.value });
  };

  const [signInIdErr, setsSgnInIdErr] = useState(false);
  const [singInidErrMsg, setSingInidErrMsg] = useState();

  const [signInPwdErr, setSignInPwdErr] = useState(false);
  const [signInPwdErrMsg, setSignInPwdErrMsg] = useState();

  // 로그인 버튼을 누르면 실행되는 기능
  const onSignInHandler = async e => {
    var { id, password } = signInUserData;
    let hashPassword = '';
    try {
      hashPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
    } catch (error) {
      return;
    }

    Axios.post(serverUrlBase + `/user/login/`, {
      user_id: id,
      user_pw: hashPassword,
    })
      .then(data => {
        const login_user = data.data;
        if (login_user.status === 'login') {
          dispatch(setToken(login_user));
          // 농장이 있는지 확인 후 redux에 저장
          Axios.get(serverUrlBase + '/myfarm/list/', { params: { id } })
            .then(data => {
              if (data.status === 200) {
                const farm = data.data.data[0];
                dispatch(setFarm(farm));
              }
            })
            .catch(e => {
              console.log('login myfarm list error', e);
            });

          setSignDialogOpen(false);
          setIsSignUp('SignIn');
          successSign.fire({
            icon: 'success',
            title: <strong>어서오십쇼~</strong>,
            html: <i>다양하게 즐겨보십쇼...</i>,
          });
          history.goBack();
        } else {
          // 로그인 실패
          Swal.fire({
            icon: 'error',
            title: '입력 정보 오류!',
            text: '아이디 또는 비밀번호를 확인 바랍니다!',
            target: document.querySelector('.MuiDialog-root'),
          });
        }
      })
      .catch(function(error) {
        console.log('로그인 오류 발생 : ' + error);
      });
  };

  useEffect(() => {
    if (signInUserData.id.length === 0) {
      setsSgnInIdErr(false);
      setSingInidErrMsg();
    } else {
      if (!regId.test(signInUserData.id)) {
        setsSgnInIdErr(true);
        setSingInidErrMsg('제대로 입력해주세요!');
      } else {
        setsSgnInIdErr(false);
        setSingInidErrMsg();
      }
    }

    if (signInUserData.password.length === 0) {
      setSignInPwdErr(false);
      setSignInPwdErrMsg();
    } else {
      if (!regPwd.test(signInUserData.password)) {
        setSignInPwdErr(true);
        setSignInPwdErrMsg('제대로 입력해주세요!');
      } else {
        setSignInPwdErr(false);
        setSignInPwdErrMsg();
      }
    }

    if (
      signInUserData.id !== '' &&
      signInUserData.password !== '' &&
      signInIdErr === false &&
      signInPwdErr === false
    ) {
      setDisabled(false);
    }

    if (
      signInUserData.id === '' ||
      signInUserData.password === '' ||
      signInIdErr === true ||
      signInPwdErr === true
    ) {
      setDisabled(true);
    }
  }, [signInUserData.id, signInUserData.password, signInIdErr, signInPwdErr]);

  const onSingInEnter = e => {
    if (e.key === 'Enter') {
      onSignInHandler();
    }
  };

  return (
    <Wrapper>
      <Grid
        onKeyPress={onSingInEnter}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        className="grid"
      >
        <Grid item xs={12}>
          <TextField
            required
            helperText={singInidErrMsg}
            id="outlined-required"
            label="아이디"
            className="text-field"
            defaultValue={signInUserData.id}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('id')}
            onFocus={event => {
              setIsShowKeyborad(true);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={signInPwdErr}
            helperText={signInPwdErrMsg}
            id="outlined-password-input"
            label="비밀번호"
            className="text-field"
            type="password"
            autoComplete="current-password"
            defaultValue={signInUserData.password}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('password')}
            onFocus={event => {
              setIsShowKeyborad(true);
            }}
          />
        </Grid>
        <Grid item xs={12} className="grid-item">
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth={true}
            // color="primary"
            onClick={onSignInHandler}
            className="grid-item-button"
            type="submit"
          >
            로그인
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignInSection02 = () => {
  const { setIsSignUp } = useContext(ViewContext);

  const onClickHandler = e => {
    setIsSignUp('SignUp');
  };
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        className="grid"
      >
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            onClick={onClickHandler}
            className="grid2-item-button"
          >
            {`회원가입`}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignInGroupComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <SignInSection01 />
      </Grid>
      <Grid item xs={12}>
        <SignInSection02 />
      </Grid>
      <Grid item xs={12}>
        <div>&nbsp;</div>
      </Grid>
    </Grid>
  );
};

////////////////////////////////////////////////////////////////////////////////

const SignUpSection01 = () => {
  return (
    <Wrapper>
      <Typography align="center" className="sign-up1">
        쑥쑥에 가입해서 수확 많이 하세요💚
      </Typography>
    </Wrapper>
  );
};

const SignUpSection02 = () => {
  const [disabled, setDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true); // 이메일 인증버튼
  const [emailConfirm, setEmailConfirm] = useState(false); // 이메일 입력창

  const { signUpUserData, setSignUpUserData, setIsSignUp } = useContext(
    ViewContext,
  );
  const { serverUrlBase } = useContext(CommonContext);

  // 변화가 일어날 때마다 (값)
  const OnChangeHandler = name => e => {
    setSignUpUserData({ ...signUpUserData, [name]: e.target.value });
  };

  const [signUpIdErr, setSignUpIdErr] = useState(false);
  const [signUpIdErrMsg, setSignUpIdErrMsg] = useState();

  const [signUpPwdErr, setSignUpPwdErr] = useState(false);
  const [signUpPwdErrMsg, setSignUpPwdErrMsg] = useState();

  const [signUpPwdCfErr, setSignUpPwdCfErr] = useState(false);
  const [signUpPwdCfErrMsg, setSignUpPwdCfErrMsg] = useState();

  const [signUpNmErr, setSignUpNmErr] = useState(false);
  const [signUpNmErrMsg, setSignUpNmErrMsg] = useState();

  const [signUpNnmErr, setSignUpNnmErr] = useState(false);
  const [signUpNnmErrMsg, setSignUpNnmErrMsg] = useState();

  const [signUpEmaErr, setSignUpEmaErr] = useState(false);
  const [signUpEmaErrMsg, setSignUpEmaErrMsg] = useState();

  // 회원가입 버튼 클릭시
  const onSignUpHandler = async () => {
    var { id, password, name, nickname, email, grade } = signUpUserData;

    if (signUpUserData.password !== signUpUserData.passwordConfirmation) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호 불일치',
        text: '다시 한번 확인해 주세요!',
        target: document.querySelector('.MuiDialog-root'),
      });
      return;
    }

    let hashPassword = '';
    try {
      hashPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
    } catch (error) {
      console.log('PPAP: signInHandler -> error', error);
    }
    Axios.post(serverUrlBase + `/user/regi`, {
      user_id: id,
      user_pw: hashPassword,
      user_name: name,
      user_nickName: nickname,
      user_email: email,
      user_code: grade,
    })
      .then(data => {
        const join_result = data.data.result;
        if (join_result === 'success') {
          successSign.fire({
            title: <strong>환영합니다~</strong>,
            html: <i>회원가입 성공!</i>,
            icon: 'success',
            target: document.querySelector('.MuiDialog-root'),
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '회원가입 실패!',
            text: '?',
            target: document.querySelector('.MuiDialog-root'),
          });
        }
      })
      .catch(function(error) {
        console.log('회원가입 오류 발생 : ' + error);
      });

    setIsSignUp('SignIn');

    setSignUpUserData({
      id: '',
      password: '',
      passwordConfirmation: '',
      name: '',
      nickname: '',
      email: '',
      emailConfirm: false,
      grade: '',
    });
  };

  // 이메일 인증 버튼 클릭
  const onEmailConfirmHandler = () => {
    var { email } = signUpUserData;
    setEmailDisabled(true);
    Axios.post(serverUrlBase + `/user/regi-email`, {
      user_email: email,
    })
      .then(data => {
        if (data.status === 200 && data.data.result !== 'fail') {
          (async () => {
            const { value: confirmNum } = await Swal.fire({
              target: document.querySelector('.MuiDialog-container'),
              title: '이메일을 확인해 인증번호를 입력해주세요.',
              input: 'text',
              inputPlaceholder: '인증번호를 입력하세요',
              inputAttributes: {
                autocapitalize: 'off',
              },
              showCancelButton: true,
              confirmButtonText: '완료',
              showLoaderOnConfirm: true,
            });

            if (confirmNum) {
              const query = 'user_email=' + email + '&authNum=' + confirmNum;
              Axios.get(serverUrlBase + '/user/regi-email?' + query)
                .then(data => {
                  if (data.data.result === 'success') {
                    setEmailDisabled(true);
                    setEmailConfirm(true);
                    Swal.fire({
                      target: document.querySelector('.MuiDialog-container'),
                      title: '인증완료',
                    });
                    setEmailDisabled(true);
                    setEmailConfirm(true);
                  } else {
                    // 틀린 인증번호 입력했을때
                    setEmailDisabled(false);
                    setEmailConfirm(false);
                    Swal.fire({
                      target: document.querySelector('.MuiDialog-container'),
                      title: '인증실패',
                    });
                  }
                })
                .catch(error => {
                  setEmailDisabled(false);
                  setEmailConfirm(false);
                  Swal.fire({
                    target: document.querySelector('.MuiDialog-container'),
                    title: '인증실패',
                  });
                  console.log('email confirm error', error);
                });
            } else {
              setEmailDisabled(false);
              setEmailConfirm(false);
            }
          })();
        } else {
          setEmailConfirm(false);
          setEmailDisabled(true);
          if (data.data.result === 'fail') {
            // 사용중인 이메일일 때
            Swal.fire({
              target: document.querySelector('.MuiDialog-container'),
              icon: 'error',
              title: data.data.msg,
            });
          } else {
            Swal.fire({
              target: document.querySelector('.MuiDialog-container'),
              icon: 'error',
              title: '이메일 전송 실패 관리자에게 문의하세요!',
            });
          }
        }
      })
      .catch(function(error) {
        setEmailDisabled(false);
        console.log('email confirm error', error);
      });
  };

  const grades = [
    {
      value: 'U01',
      label: '일반',
    },
    {
      value: 'U02',
      label: '멘토',
    },
  ];

  useEffect(() => {
    if (signUpUserData.id.length === 0) {
      setSignUpIdErr(false);
      setSignUpIdErrMsg();
    } else {
      if (!regId.test(signUpUserData.id)) {
        // 통과 못하면
        setSignUpIdErr(true);
        setSignUpIdErrMsg('영문 소문자 + 숫자 / 4자 이상');
      } else {
        // 통과 하면
        Axios.get(serverUrlBase + `/user/checkid/` + signUpUserData.id).then(
          data => {
            if (data.data.idchk === false) {
              setSignUpIdErr(true);
              setSignUpIdErrMsg('이미 있는 아이디입니다!');
            } else {
              setSignUpIdErr(false);
              setSignUpIdErrMsg();
            }
          },
        );
      }
    }

    if (signUpUserData.password.length === 0) {
      setSignUpPwdErr(false);
      setSignUpPwdErrMsg();
    } else {
      if (!regPwd.test(signUpUserData.password)) {
        setSignUpPwdErr(true);
        setSignUpPwdErrMsg(
          '영문 소문자 + 숫자 + 특수문자(각 1개 이상) /  8 ~ 15자',
        );
      } else {
        setSignUpPwdErr(false);
        setSignUpPwdErrMsg();
      }
    }

    if (signUpUserData.passwordConfirmation.length === 0) {
      setSignUpPwdCfErr(false);
      setSignUpPwdCfErrMsg();
    } else {
      if (!regPwdCf.test(signUpUserData.passwordConfirmation)) {
        setSignUpPwdCfErr(true);
        setSignUpPwdCfErrMsg('비밀번호를 다시 한번 입력 바람');
      } else if (
        signUpUserData.password == signUpUserData.passwordConfirmation
      ) {
        setSignUpPwdCfErr(false);
        setSignUpPwdCfErrMsg();
      } else {
        setSignUpPwdCfErr(true);
        setSignUpPwdCfErrMsg('비밀번호가 일치하지 않습니다.');
      }
    }

    if (signUpUserData.name.length === 0) {
      setSignUpNmErr(false);
      setSignUpNmErrMsg();
    } else {
      if (!regNm.test(signUpUserData.name)) {
        setSignUpNmErr(true);
        setSignUpNmErrMsg('한글만 / 2자 이상');
      } else {
        setSignUpNmErr(false);
        setSignUpNmErrMsg();
      }
    }

    if (signUpUserData.nickname.length === 0) {
      setSignUpNnmErr(false);
      setSignUpNnmErrMsg();
    } else {
      if (!regNnm.test(signUpUserData.nickname)) {
        // 통과 못하면
        setSignUpNnmErr(true);
        setSignUpNnmErrMsg('한글만 / 2자 이상');
      } else {
        // 통과 하면
        Axios.get(
          serverUrlBase + `/user/checknick/` + signUpUserData.nickname,
        ).then(data => {
          if (data.data.nickchk === false) {
            setSignUpNnmErr(true);
            setSignUpNnmErrMsg('이미 있는 별명입니다!');
          } else {
            setSignUpNnmErr(false);
            setSignUpNnmErrMsg();
          }
        });
      }
    }

    if (signUpUserData.email.length === 0) {
      setEmailDisabled(true);
      setSignUpEmaErr(false);
      setSignUpEmaErrMsg();
    } else {
      if (!regEma.test(signUpUserData.email)) {
        setEmailDisabled(true);
        setSignUpEmaErr(true);
        setSignUpEmaErrMsg('이메일 형식에 맞게 작성 바람');
      } else {
        setEmailDisabled(false);
        setSignUpEmaErr(false);
        setSignUpEmaErrMsg();
      }
    }

    if (
      signUpUserData.id !== '' &&
      signUpUserData.password !== '' &&
      signUpUserData.passwordConfirmation !== '' &&
      signUpUserData.name !== '' &&
      signUpUserData.nickname !== '' &&
      signUpUserData.email !== '' &&
      signUpUserData.grade !== '' &&
      signUpIdErr === false &&
      signUpPwdErr === false &&
      signUpPwdCfErr === false &&
      signUpNmErr === false &&
      signUpNnmErr === false &&
      signUpEmaErr === false &&
      emailConfirm === true
    ) {
      setDisabled(false);
    }
    if (
      signUpUserData.id === '' ||
      signUpUserData.password === '' ||
      signUpUserData.passwordConfirmation === '' ||
      signUpUserData.name === '' ||
      signUpUserData.nickname === '' ||
      signUpUserData.email === '' ||
      signUpUserData.grade === '' ||
      signUpIdErr === true ||
      signUpPwdErr === true ||
      signUpPwdCfErr === true ||
      signUpNmErr === true ||
      signUpNnmErr === true ||
      signUpEmaErr === true ||
      emailConfirm === false
    ) {
      setDisabled(true);
    }
  }, [
    signUpUserData.id,
    signUpUserData.password,
    signUpUserData.passwordConfirmation,
    signUpUserData.name,
    signUpUserData.nickname,
    signUpUserData.email,
    signUpUserData.grade,
    signUpIdErr,
    signUpPwdErr,
    signUpPwdCfErr,
    signUpNmErr,
    signUpNnmErr,
    signUpEmaErr,
    emailConfirm,
  ]);

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        className="grid"
      >
        <Grid item xs={12} className="sign-up-grid">
          <TextField
            required
            error={signUpIdErr}
            helperText={signUpIdErrMsg}
            id="outlined-required1"
            label="아이디"
            inputProps={{ maxLength: 20 }}
            defaultValue={signUpUserData.id}
            className="text-field"
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('id')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <TextField
            required
            error={signUpPwdErr}
            helperText={signUpPwdErrMsg}
            id="outlined-password-input"
            label="비밀번호"
            className="text-Field"
            type="password"
            autoComplete="current-password"
            defaultValue={signUpUserData.password}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('password')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <TextField
            required
            error={signUpPwdCfErr}
            helperText={signUpPwdCfErrMsg}
            id="outlined-password-input2"
            label="비밀번호확인"
            className="text-Field"
            type="password"
            autoComplete="current-password"
            defaultValue={signUpUserData.passwordConfirmation}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('passwordConfirmation')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item1">
          <TextField
            required
            error={signUpNmErr}
            helperText={signUpNmErrMsg}
            id="outlined-required2"
            inputProps={{ maxLength: 20 }}
            label="이름"
            defaultValue={signUpUserData.name}
            className="text-field"
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('name')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item1">
          <TextField
            required
            error={signUpNnmErr}
            helperText={signUpNnmErrMsg}
            id="outlined-required3"
            label="별명"
            inputProps={{ maxLength: 20 }}
            defaultValue={signUpUserData.nickname}
            className="text-field"
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('nickname')}
          />
        </Grid>
        <Grid item xs={8} className="sign-up-grid">
          <TextField
            required
            error={signUpEmaErr}
            helperText={signUpEmaErrMsg}
            disabled={emailConfirm}
            id="outlined-required4"
            label="이메일"
            defaultValue={signUpUserData.email}
            className="text-field"
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('email')}
          />
        </Grid>
        <Grid item xs={4} className="sign-up-grid">
          <Button
            disabled={emailDisabled}
            variant="contained"
            fullWidth={true}
            onClick={onEmailConfirmHandler}
            className="grid-item-button"
            style={{
              fontSize: 14,
              fontFamily: 'Noto Sans KR',
              fontWeight: 500,
            }}
          >
            이메일 인증
          </Button>
        </Grid>
        <Grid item xs={12} className="sign-up-grid">
          <TextField
            id="outlined-select-grade"
            select
            required
            label="등급"
            defaultValue="U01"
            onChange={OnChangeHandler('grade')}
            variant="outlined"
            fullWidth={true}
          >
            {grades.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item3">
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth={true}
            onClick={onSignUpHandler}
            className="grid-item-button"
            style={{
              fontSize: 14,
              fontFamily: 'Noto Sans KR',
              fontWeight: 500,
            }}
          >
            회원가입
          </Button>
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item4">
          <Typography align="center" className="sign-up-grid-item4-typography">
            쑥쑥 시스템에 가입함으로써
            <br /> 귀하는 저희의 약관과 <b>데이터 및 쿠키 정책</b>에 동의하시게
            됩니다.
          </Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpSection03 = () => {
  return (
    <Wrapper>
      <Grid item xs={12} className="sign-up3-grid">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          className="sign-up3-grid-item"
        >
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpSection04 = () => {
  const { setIsSignUp } = useContext(ViewContext);

  const onClickHandler = e => {
    setIsSignUp('SignIn');
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        className="sign-up4-grid"
      >
        <Grid item xs={1} />
        <Grid item xs={6}>
          <Typography align="center" className="sign-up4-grid-item-typography">
            {'이미 계정이 있습니까?'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth={true}
            onClick={onClickHandler}
            className="sign-up4-grid-item-button"
          >
            {'로그인하기'}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpGroupComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <SignUpSection01 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection02 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection03 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection04 />
      </Grid>
      <Grid item xs={12}>
        <div>&nbsp;</div>
      </Grid>
    </Grid>
  );
};

const ResponsiveDialogSign = () => {
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('xs'));
  let history = useHistory();

  const {
    signDialogOpen,
    setSignDialogOpen,
    isSignUp,
    setIsSignUp,
  } = useContext(CommonContext);

  const handleClose = () => {
    setSignDialogOpen(false);

    history.goBack();
  };

  const [signInUserData, setSignInUserData] = useState({
    id: '',
    password: '',
  });
  const [signUpUserData, setSignUpUserData] = useState({
    id: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    nickname: '',
    email: '',
    grade: 'U01',
  });
  const [recoverPwUserData, setRecoverPwUserData] = useState({
    email: '',
    code: '',
    pwd: '',
  });

  return (
    <ViewContext.Provider
      value={{
        signUpUserData,
        setSignUpUserData,
        signInUserData,
        setSignInUserData,
        isSignUp,
        setIsSignUp,
        recoverPwUserData,
        setRecoverPwUserData,
      }}
    >
      <Dialog
        // disableEnfoceFocus={true}
        fullScreen={fullScreen}
        maxWidth={'xs'}
        open={signDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: '#ffffff',
            boxShadow: 'none',
          },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <DialogTitle id="responsive-dialog-title">
              <DialogTitleComponent />
            </DialogTitle>
            <DialogContent>
              {isSignUp === 'SignUp' && <SignUpGroupComponent />}
              {isSignUp === 'SignIn' && <SignInGroupComponent />}
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </ViewContext.Provider>
  );
};
export default ResponsiveDialogSign;
