
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import MainTitle from '../components/MainTitle/MainTitle';
import MainInput from '../components/MainInput/MainInput';
import AuthorList from '../components/AuthorList/AuthorList';

const Authors = () => {
    return (
        <>
        <Header></Header>
        <MainContainer>
            <MainTitle>Ключевые тексты</MainTitle>
            <MainInput placeholder='Поиск текстов' onClick={()=>{}}></MainInput>
            <AuthorList></AuthorList>
        </MainContainer>
    </>
    );
};

export default Authors;