import styled from 'styled-components';


export const Main = styled.main`
    width: 100%;
    height: calc(100vh - ${props => props.theme.header});
    display: flex;
    justify-content: center;
    align-items: center;
`;