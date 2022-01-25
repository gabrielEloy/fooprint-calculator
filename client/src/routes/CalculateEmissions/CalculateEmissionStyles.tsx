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

        .results-container{
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
    }
    
    @media (max-width: 670px) {
        .card-content{
            flex-direction: column;
        }

        .calculations-container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .results-container{
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span{
            margin-top: 20px;
            display: block;
        }
    }
`;

export default CalculateEmissionStyles;
