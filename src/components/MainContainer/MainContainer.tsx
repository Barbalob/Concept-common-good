import { Container } from '@mui/material';
import React, { FC } from 'react';

interface TypesMainComtainers {
    children : React.ReactNode
}

const MainContainer:FC<TypesMainComtainers> = ({children}) => {
    return (
        <Container sx={{ flexGrow: 1 }}>
            {children}
        </Container>
    );
};

export default MainContainer;