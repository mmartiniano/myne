import React, { useEffect, useMemo, useState, MouseEvent, useCallback } from 'react';
import { ICell, IField } from '../../@types';
import Myne, { Status } from '../../game';
import Cell from '../Cell';
import { Field as StyledField } from './styles';


const Field: React.FC<IField> = (props) => {

    const game = useMemo(() => {
        return new Myne(props.size, props.bombs);
    }, [props.size, props.bombs]);

    const [cells, setCells] = useState<ICell[][] | undefined>();

    const updateCells = useCallback(() => {
        setCells(
            game.cells!.map((arr) => {
                return arr.slice();
            })
        );
    }, [game]);

    const play = () => {
        game.start();
        updateCells();
    };

    const handleGG = useCallback((lost: boolean, duration: number) => {
        console.log('lost: ' + lost + ' duration: ' + duration);
        updateCells();
    }, [updateCells]);

    const handleChange = useCallback(() => {
        setCells(game.cells!);
        updateCells();
    }, [game.cells, updateCells]);

    const handleLeftClick = (x: number, y: number) => {
        if (game.status === Status.ready)
            play();

        game.handleCellView(x, y);
    };

    const handleRightClick = (event: MouseEvent, x: number, y: number) => {
        if (event.button !== 2)
            return

        event.preventDefault();

        if (game.status === Status.ready)
            play();

        game.handleCellFlag(x, y);
    };

    useEffect(() => {
        game.onGG = handleGG;
        game.onChange = handleChange;
        updateCells();
    }, [game, handleChange, handleGG, updateCells]);

    const render_cells = (
        cells && cells.map((group, row) => group.map((cell, col) => {
            return (
                <Cell
                    {...cell}
                    key={row * props.size + col}
                    onClick={() => { handleLeftClick(cell.x, cell.y) }}
                    onContextMenu={event => handleRightClick(event, cell.x, cell.y)}
                />
            )
        }))
    )

    return (
        <StyledField {...props}>
            {render_cells}
        </StyledField>
    );
};

export default Field;