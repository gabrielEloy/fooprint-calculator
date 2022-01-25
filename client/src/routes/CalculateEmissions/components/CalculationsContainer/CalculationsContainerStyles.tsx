import styled from 'styled-components';

export const InputContainer = styled.div`
    display: flex;
    margin: 10px 0;
    

    .antd-select{
        width: 120px;
        margin-left: 20px;
    }

    h3{
        display: block;
        min-width: 120px;
        justify-self: center;
    }
    .span-container{
        display: flex;
        align-items: center;
        span{
        margin-left: 10px;
        }
    }

    .antd-input{
        min-width: 120px;
        width: max-content;
    }


    @media (max-width: 670px) {
        min-width: 80%;
        display: flex;
        .antd-select{
        width: 120px;
        margin-left: 20px;
    

        .span-container{
            display: flex;
            align-items: center;
            span{
                margin-left: 20px;
            }
        }
        }
`;
