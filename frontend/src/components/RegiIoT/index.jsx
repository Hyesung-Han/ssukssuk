import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';

import Swal from 'sweetalert2';

import {
  TextField,
  Grid,
  DialogTitle,
  DialogContent,
  Dialog,
  useMediaQuery,
  Typography,
  Button,
} from '@material-ui/core';

const inputBoxStyle = {
  // display:"inline-block",
  width: '400px',
  // height:"50px",
  // background:"orange"
  margin: '5px 10px',
};

const fontBoxStyle = {
  fontSize: 20,
};

const titleStyle = {
  fontSize: 30,
  margin: '10px 0px',
  textAlign: 'center',
};

const buttonStyle = {
  fontWeight: '500',
  fontSize: '20px',
  padding: '5px 15px',
  color: '#ffffff',
  backgroundColor: '#9aba11',
};

const RegiIoT = () => {
  const { regiIoTDialogOpen, setRegiIotDialogOpen, serverUrlBase } = useContext(
    CommonContext,
  );
  const user = useSelector(state => state.Auth.user);
  let history = useHistory();
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const handleClose = () => {
    setRegiIotDialogOpen(false);
    history.goBack();
  };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChangeAddressHandler = e => {
    setAddress(e.target.value);
  };

  const onChangePhonessHandler = e => {
    setPhoneNumber(e.target.value);
  };

  const onChangeNameHandler = e => {
    setName(e.target.value);
  };

  const onClickRegiButton = e => {
    Swal.fire({
      icon: 'question',
      title: '정보를 확인해주세요',
      html:
        '이름:' + name + '<br>주소:' + address + '<br>전화번호:' + phoneNumber,
      confirmButtonText: '등록',
      showCancelButton: true,

      target: document.querySelector('.MuiDialog-root'),
    }).then(result => {
      if (result.isConfirmed) {
        // 통신 코드 삽입
        Axios.post(serverUrlBase + `/myfarm/device`, {
          user_id: user.user_id,
          user_name: name,
          user_address: address,
          user_phone: phoneNumber,
        })
          .then(data => {
            console.log(data);

            // DB에 에러 없이 값이 올라가면
            Swal.fire({
              icon: 'success',
              title: '등록되었습니다',
              text: '궁금하신 점은 문의하기에서 문의해주세요',
              confirmButtonText: '확인',

              target: document.querySelector('.MuiDialog-root'),
            }).then(result => {
              handleClose();
            });
          })
          .catch(function(error) {
            console.log('sensor data error: ' + error);

            Swal.fire({
              icon: 'error',
              title: '서버와 통신 중 문제가 생겼습니다',
              text: '궁금하신 점은 문의하기에서 문의해주세요',
              confirmButtonText: '확인',

              target: document.querySelector('.MuiDialog-root'),
            }).then(result => {
              handleClose();
            });
          });
      }
    });
  };

  return (
    <ViewContext.Provider value={{}}>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={'md'}
        open={regiIoTDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: 'white',
            boxShadow: 'none',
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0,0,0,0.7)',
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
              <Typography style={titleStyle}>IoT 기기 신청</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid
                style={inputBoxStyle}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item md={3} style={fontBoxStyle}>
                  이름
                </Grid>
                <Grid item md={9}>
                  <TextField
                    required
                    defaultValue={name}
                    // helperText={'주소를 입력해주세요'}
                    id="outlined-required"
                    // label="주소"
                    className="text-field"
                    variant="outlined"
                    fullWidth={true}
                    onChange={onChangeNameHandler}
                  />
                </Grid>
              </Grid>
              <Grid
                style={inputBoxStyle}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item md={3} style={fontBoxStyle}>
                  주소
                </Grid>
                <Grid item md={9}>
                  <TextField
                    required
                    defaultValue={address}
                    // helperText={'주소를 입력해주세요'}
                    id="outlined-required"
                    // label="주소"
                    className="text-field"
                    variant="outlined"
                    fullWidth={true}
                    onChange={onChangeAddressHandler}
                  />
                </Grid>
              </Grid>
              <Grid
                style={inputBoxStyle}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item md={3} style={fontBoxStyle}>
                  전화번호
                </Grid>
                <Grid item md={9}>
                  <TextField
                    required
                    defaultValue={phoneNumber}
                    id="outlined-required"
                    className="text-field"
                    variant="outlined"
                    fullWidth={true}
                    onChange={onChangePhonessHandler}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                style={inputBoxStyle}
                direction="row"
                justify="flex-end"
              >
                <Button style={buttonStyle} onClick={onClickRegiButton}>
                  제출
                </Button>
              </Grid>
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </ViewContext.Provider>
  );
};

export default RegiIoT;
