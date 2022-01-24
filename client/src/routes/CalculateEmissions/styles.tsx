import styled from 'styled-components';

const CalculateEmissionStyles = styled.div`
    display: flex;
    flex-direction: row;
    

.calculate-emission-container{
    margin-top: 50px;
    .card-content{
        display: flex;
        flex-direction: row;
        min-height: 390px;
        .calculations-container, .results-container{
            flex: 1;
        }
    }
    
}
`;

export const InputContainer = styled.div`
    display: flex;
    margin: 15px 0;

    .antd-select{
        width: 120px;
        margin-left: 20px;
    }

    h3{
        display: block;
        min-width: 120px;
    }
    .span-container{
        display: flex;
        align-items: center;
        span{
        margin-left: 10px;
        }
    }

    .antd-input{
        width: 120px;
    }
`;

export default CalculateEmissionStyles;
