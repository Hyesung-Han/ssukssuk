import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 60px 0 80px;
  text-align: center;
  box-sizing: border-box;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  * {
    word-break: keep-all;
  }
  & .about-team {
    width: 100%;
    & > h2 {
      font-size: 44px;
      font-weight: 500;
    }
    & .picture {
      overflow: hidden;
      width: 200px;
      height: 200px;
      line-height: 200px;
      margin: 80px auto 48px;
      border: 1px solid #e1e1e1;
      border-radius: 200px;
      background: url('/images/picture.png') no-repeat center center;
      box-sizing: border-box;
    }
    & > h3 {
      font-size: 36px;
      font-weight: 300;
    }
    & .info {
      padding: 40px 0 160px;
      & > div {
        font-size: 24px;
        font-weight: 500;
        padding: 0 80px 0 50px;
        &.phone {
          position: relative;
          background: url('/images/about_me_img_1.png') no-repeat left center;
          &::before {
            content: '';
            position: absolute;
            right: 37px;
            top: 7px;
            width: 3px;
            height: 20px;
            background: #979797;
          }
        }
        &.email {
          background: url('/images/about_me_img_2.png') no-repeat left center;
          padding-right: 0;
        }
      }
    }
    & .license {
      text-align: center;
      & > div {
        padding-right: 60px;
        &:last-child {
          padding-right: 0;
        }
        & .emoji-image {
          overflow: hidden;
          width: 200px;
          height: 200px;
          line-height: 200px;
          margin: 30px auto 0px;
          border: 1px solid #e1e1e1;
          border-radius: 200px;
          box-sizing: border-box;
          background: url('https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAyMTdfMjA4%2FMDAxNjEzNTcxMjQyNjQy.0vcTpGwwZXny4mXEi9ZGNqkca-mrm7oMPKu5fq8SieQg.LQWZLMJSGRkG_3iL4yt1OXygZhkMY80fkLcZBtaX_KMg.JPEG.1999may28th%2FIMG_0931.JPG&type=a340')
            no-repeat center center;
        }
        & h2 {
          font-size: 36px;
          font-weight: bold;
          color: #ff73b8;
        }
        & p {
          font-weight: 400;
          font-size: 24px;
          color: #242424;
        }
      }
    }
  }
  @media (max-width: 960px) {
    & .license {
      & > div {
        margin-bottom: 40px;
        padding-right: 0 !important;
      }
    }
  }
  @media (max-width: 680px) {
    & .info {
      padding: 30px 0 120px;
      & > div {
        &.phone {
          padding-right: 0 !important;
        }
        &::before {
          display: none;
        }
      }
    }
  }
  @media (max-width: 600px) {
    padding: 80px 0 60px !important;
    & .info {
      & > div {
        &.phone {
          margin-bottom: 20px;
        }
        &::before {
        }
      }
    }
  }
`;

export default Wrapper;
