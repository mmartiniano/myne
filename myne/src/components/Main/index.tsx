import React, { PropsWithChildren } from 'react';
import { Main as StyledMain } from './styles';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <StyledMain>
            {children}
        </StyledMain>
    );
};

export default Main;