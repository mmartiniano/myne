import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { ICell } from '../../@types';


export const Cell = styled.div<ICell>`
    border-radius: 10%;
    background-color: ${props => props.theme.color.secondary};
    color: ${props => props.theme.color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    border: .1rem solid ${props => props.theme.color.primary};
    transition: transform .2s cubic-bezier(1, -0.4, 0.4, 1);

    ${(props: ICell) => props.visible ? (
        (((props.bomb && !props.flag) || (!props.bomb && props.flag)) && css`
            background-color: ${props => props.theme.color.danger};
        `)

        ||

        ((props.bomb && props.flag) && css`
            background-color: ${props => props.theme.color.certainty};
        `)

        ||

        css`
            background-color: ${(props: any) => shade(-0.5 + 0.25 * props.nearby, props.theme.color.secondary)};
        `
    ) : css`
        cursor: pointer;
    
        ${(props: ICell) => props.bomb && css`
            &:active {
                transform: scale(90%, 90%);
            };
        `};
    `};
`;