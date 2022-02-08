import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  
  height: 48px;
  & .display-none {
    display: none;
  }
  & .hide {
    display: none;
  }
  & .logo {
    cursor: pointer;
    padding-left: 30px;
  }
  & .logo_img{
    height: 50px;
  }
  & .menu-button {
    position: fixed;
    left: 20px;
    top: 30px;
    
    z-index: 1300;
    margin-left: 0;
    width: 40px;
    height: 28px;
    cursor: pointer;

    & div {
      width: 100%;
      height: 3px;
      background: #3e7925;
      border-radius: 30px;

      /* transition: all 0.4s ease; */
      &:nth-child(1) {
        /* transition: all 0.4s ease; */
      }
      &:nth-child(2) {
        /* transition: all 0.4s ease; */
      }
      &:nth-child(3) {
        /* transition: all 0.4s ease; */
      }
    }
    &.on {
      z-index: 99999;
      
      & div {
        background: #3e7925;
        /* transition: all 0.4s ease; */
        &:nth-child(1) {
          transform: translateY(-10px) translateX(-10px) rotate(-315deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: translateY(-35px) translateX(-10px) rotate(315deg);
        }
      }
    }
  }

  & .appbar {
    width: 100%;
    height: 90px;
    
    // transition: all 0.3s ease;
    box-sizing: border-box;

    background-color: #ffffff;
    border-bottom: 1px solid grey;
    
    & .appbar-wrap{
      width:1100px;
      margin: 0 auto;
      padding: 15px 0;
    }
    &.appbar-shift {
      width: 100%;
    }
    & .title {
      flex-grow: 1;
      padding-left:100px;
    }
  }

  & .header-button {
    margin-right: 15px;
    font-weight: normal;
    box-shadow: none;
    letter-spacing: 1px;
    text-transform: none;
    opacity: 0.7;
    // transition: all 0.2s;

    font-size: 18px;
    color:#000000;
    background-color: #ffffff;

    &:hover {
      opacity: 1;
      background: none;
      box-shadow: none;
    }
  }
  @media (min-width: 1100px) {
    & .display-none {
      display: block;
    }
  }
  @media (max-width: 1100px) {
    & .logo {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      padding-left: 0 !important;
    }
  }
`;

export default Wrapper;
