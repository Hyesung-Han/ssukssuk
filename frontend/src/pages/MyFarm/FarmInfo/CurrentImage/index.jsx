import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CommonContext } from '../../../../context/CommonContext';
import Loader from './Loader';

// firebase
import { ref, getDownloadURL } from 'firebase/storage';
import firebaseInit from '../../../../firebaseInit';

// material-ui
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  CardActionArea,
  Dialog,
} from '@mui/material';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// project imports
import MainCard from '../../../../components/Card/MainCard';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const { serverUrlBase } = useContext(CommonContext);
  const farm = useSelector(state => state.Farm.farm);

  const [farmImg, setFarmImg] = useState('');

  const handleClose = () => {
    onClose(selectedValue);
  };

  const getFarmImg = async () => {
    try {
      const fileName = 'farm' + farm.farm_no + '.png';
      await getDownloadURL(ref(firebaseInit, 'image_store/' + fileName))
        .then(url => {
          setFarmImg(url);
        })
        .catch(e => {
          console.log('get url error', e);
        });
    } catch (e) {
      console.log('firebase get url error', e);
    }
  };

  const openImg = async () => {
    try {
      if (farmImg !== '') return;
      await Axios.post(serverUrlBase + '/myfarm/live', {
        farm_no: farm.farm_no,
      }).then(data => {
        if (data.data.result === 'success') {
          getFarmImg();
        }
      });
    } catch (e) {
      console.log('openImg error', e);
    }
  };

  const closeImg = async () => {
    try {
      await Axios.delete(serverUrlBase + '/myfarm/live', {
        data: {
          farm_no: farm.farm_no,
        },
      }).then(data => {
        console.log(data.data.result);
        if (data.data.result === 'success') {
          setFarmImg('');
        }
      });
    } catch (e) {
      console.log('closeImg error', e);
    }
  };

  if (open) {
    openImg();
  }
  if (!open) {
    closeImg();
  }
  console.log('asdf');
  return (
    <Dialog onClose={handleClose} open={open}>
      {farmImg === '' ? (
        <Loader type="spin" color="#009cff" />
      ) : (
        <img src={farmImg} alt="실시간 이미지"></img>
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#E3F2FD',
  overflow: 'hidden',
  position: 'relative',
  marginTop: '10px',
}));

const CurrentImage = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <CardWrapper border={false} content={false}>
        <CardActionArea onClick={handleClickOpen}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="row">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar variant="rounded">
                      <PhotoCameraIcon />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ ml: 2 }}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: '25px',
                        fontWeight: 500,
                        fontFamily: `'Do Hyeon', sans-serif`,
                      }}
                    >
                      실시간 농장 확인하기
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardActionArea>
      </CardWrapper>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default CurrentImage;
