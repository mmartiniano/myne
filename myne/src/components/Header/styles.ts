import styled from 'styled-components';

export const Header = styled.header`
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 6px 5px -5px rgba(0, 0, 0, 0.2);
    height: ${props => props.theme.header};
    width: 100%;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.color.primary};
    background-color: ${props => props.theme.color.primary};

`;

export const H1 = styled.h1`
    font-size: 1.2rem;
    font-weight: bold;
`;