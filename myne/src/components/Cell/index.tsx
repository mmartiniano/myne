import React, { HTMLAttributes } from 'react';
import { ICell } from '../../@types';
import { Cell as StyledCell } from './styles';
import FlagIcon from '@mui/icons-material/Report';
import FlagErrorIcon from '@mui/icons-material/ReportOff';
import BombIcon from '@mui/icons-material/Circle';


interface Props extends ICell, HTMLAttributes<HTMLDivElement> { };

const Cell: React.FC<Props> = (props) => {
    return (
        <StyledCell {...props}>
            {(props.nearby > 0 && !props.bomb && props.visible && !props.flag && (
                props.nearby
            )) || (((!props.visible && props.flag) || (props.visible && props.flag && props.bomb)) && (
                <FlagIcon />
            )) || (props.visible && props.flag && !props.bomb && (
                <FlagErrorIcon />
            )) || (props.visible && props.bomb && (
                <BombIcon />
            ))}
        </StyledCell>
    );
};

export default Cell;