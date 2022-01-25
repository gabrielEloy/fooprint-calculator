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

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export default CalculateEmissionStyles;
