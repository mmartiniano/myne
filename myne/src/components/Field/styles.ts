import styled from 'styled-components';
import { IField } from '../../@types';


export const Field = styled.div<IField>`
    width: 65vmin;
    height: 65vmin;
    position: relative;
    display: grid;
    grid-template-columns: repeat(${(props: IField) => props.size}, 1fr);
    grid-template-rows: repeat(${(props: IField) => props.size}, 1fr);
`;