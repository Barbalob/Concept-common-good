import React from 'react';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import MainTitle from '../components/MainTitle/MainTitle';

const NotFound = () => {
    return (
        <>
            <Header/>
            <MainContainer>
                <MainTitle>Страница не найдена</MainTitle>
            </MainContainer>
        </>
    );
};

export default NotFound;