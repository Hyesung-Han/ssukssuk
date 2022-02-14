import styled from 'styled-components';

const Wrapper = styled.div`
  .wrapper {
    display: inline-block;
  }
  .card {
    width: 300px;
    height: 260px;
    position: relative;
    display: flex;
    align-items: flex-end;
    transition: 0.4s ease-out;
    // box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
    margin: 1em;
  }
  .card:hover {
    transform: translateY(20px);
  }
  .card:hover:before {
    opacity: 1;
  }
  .card:hover .info {
    opacity: 1;
    transform: translateY(0px);
  }
  .info {
    margin: 1em;
    left: -5%;
    top: 30%;
    width: 100%;
    place-items: center;
  }
  .card:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    transition: 0.5s;
    opacity: 0;
  }
  .card CardMedia {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .card .info {
    position: absolute;
    z-index: 3;
    color: white;
    opacity: 0;
    transform: translateY(30px);
    transition: 0.5s;
  }
  .card .info h3 {
    margin: 0px;
  }
`;

export default Wrapper;
