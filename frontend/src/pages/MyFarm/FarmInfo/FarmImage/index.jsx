import React, { useContext, useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { CommonContext } from '../../../../context/CommonContext';
import { setPath } from '../../../../redux/reducers/FarmReducer';
import Wrapper from './styles';

// material-ui
import { styled } from '@mui/material/styles';
import { CardActionArea, CardMedia, Typography, Grid } from '@mui/material';

// project imports
import MainCard from '../../../../components/Card/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  width: '95%',
  height: '300',
  border: 'none',
}));

const FarmImage = () => {
  const { serverUrlBase } = useContext(CommonContext);
  const farm = useSelector(state => state.Farm.farm);
  const [defaultImage, setDefaultImage] = useState(farm.file_path);
  const dispatch = useDispatch();

  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append('farm_no', farm.farm_no);
    formData.append('farm', acceptedFiles[0]);

    getList(formData);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const getList = async formData => {
    try {
      const res = await Axios.post(serverUrlBase + '/myfarm/upload', formData);
      const { data } = res;
      if (data.result === 'success') {
        dispatch(setPath(data.path));
        setDefaultImage(data.path);
      }
    } catch (e) {
      console.log('farm image upload error', e);
    }
  };

  useEffect(() => {}, [defaultImage]);
  useEffect(() => {
    if (!defaultImage) {
      setDefaultImage('/images/default_farm_image.png');
    }
  }, []);

  return (
    <CardWrapper
      style={{
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
      }}
    >
      <Wrapper>
        <Grid className="wrapper">
          <CardActionArea {...getRootProps()}>
            <input {...getInputProps()} />
            <Grid className="card">
              <CardMedia component="img" image={defaultImage} alt="myFarmImg" />
              <Grid className="info">
                <Typography
                  sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}
                >
                  클릭해서 사진을 등록하세요!
                </Typography>
              </Grid>
            </Grid>
          </CardActionArea>
        </Grid>
      </Wrapper>
    </CardWrapper>
  );
};

export default FarmImage;
