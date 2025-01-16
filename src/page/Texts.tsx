import Header from '../components/Header/Header';
import MainTitle from '../components/MainTitle/MainTitle';
import MainInput from '../components/MainInput/MainInput';
import MainContainer from '../components/MainContainer/MainContainer';
import TextList from '../components/TextList/TextList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchTexts, setSearchWordTexts } from '../store/textsSlice';
import LoadingData from '../components/LoadingData/LoadingData';

const Texts = () => {
    const {listTexts, error, isLoading, searchWord} = useAppSelector(s => s.texts)
    const dispatch = useAppDispatch()

    const handler = (word:string)=>dispatch(setSearchWordTexts({searchWord:word}))
    useEffect(()=>{
        dispatch(fetchTexts({word:searchWord}))
    },[searchWord])
    return (
        <>
            <Header></Header>
            <MainContainer>
                <MainTitle>Ключевые тексты</MainTitle>
                <MainInput placeholder='Поиск текстов' value={searchWord} onChange={(e)=>handler(e.target.value)}></MainInput>
                <LoadingData error={error} isLoading={isLoading} listlength={listTexts.length} >
                    <TextList data={listTexts}></TextList>
                </LoadingData>
            </MainContainer>
        </>
    );
};

export default Texts;