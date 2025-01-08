
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import MainTitle from '../components/MainTitle/MainTitle';
import MainInput from '../components/MainInput/MainInput';
import AuthorList from '../components/AuthorList/AuthorList';
import { useAppDispatch, useAppSelector } from '../hook';
import { setSearchWordAuthors } from '../store/authorsSlice';

const Authors = () => {
    const {searchWord} = useAppSelector(s => s.authors)
    const dispatch = useAppDispatch()
    const setValueSearch = (word:string) => dispatch(setSearchWordAuthors({searchWord:word}))

    return (
        <>
        <Header></Header>
        <MainContainer>
            <MainTitle>Авторы</MainTitle>
            <MainInput 
                placeholder='Поиск авторов' 
                onClick={()=>{}}
                onChange={(e)=>setValueSearch(e.target.value)}
                value={searchWord}
            ></MainInput>
            <AuthorList></AuthorList>
        </MainContainer>
    </>
    );
};

export default Authors;