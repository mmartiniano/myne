import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    body {
        background: ${props => props.theme.color.primary};
        transition: background-color 0.2s ease-in-out;
        font-size: 0.8em;
        color: ${props => props.theme.color.secondary};
        transition: color 0.2s ease-in-out;
        font-family: 'Quicksand', sans-serif;
    }

    a {
        text-decoration: underline;
        color: inherit;
    }
`;