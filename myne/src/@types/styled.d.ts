import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;

        color: {
            primary: string;
            secondary: string;
            unselected: string;
            danger: string;
            certainty: string;
        },

        shadow: string;

        radius: string;

        header: string;
    }
}