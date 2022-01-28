import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    margin:20px 0;

    .result{
        font-size: 15px;
        color:grey;
        padding:5px 10px;
    }

    .table-wrapper{
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        box-shadow: none;

        .notice-front{
            font-weight:bold;
            font-size: 16px;
            color:#849635;
        }
        .table-row{
            cursor:pointer;
            height:80px;
        }
        .table-head{
            background: #ddd;
        }

        .table-front{
            width:10%;
            font-size: 16px;
        }

        .table-mid{
            width:50%;
        }

        .table-end{
            width:40%;
        }

        .cell-body-buttom-front{
            color:grey;
        }

        .cell-body-buttom-back{
            display: flex;
            align-items: center;
        }
        .item{
            display: flex;
            align-items: center;
            padding:0px 10px;

            color:grey;
        }
    }
`;

export default Wrapper;
