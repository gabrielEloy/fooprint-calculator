import styled from 'styled-components';

const BaseLayoutStyles = styled.div`
    width: 100%;
    body{
        background: black;
    }
    .content{
        min-width: 300px;
        min-height: calc(100vh - 134px);
    }

    .footer{
        text-align: center;
    }

`;

export default BaseLayoutStyles;
