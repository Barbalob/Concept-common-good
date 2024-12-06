import Header from '../components/Header/Header';
import Alphabet from '../components/Alphabet/Alphabet';
import ListWordsSelectedLetter from '../components/ListWordsSelectedLetter/ListWordsSelectedLetter';
import MainTitle from '../components/MainTitle/MainTitle';
import MainInput from '../components/MainInput/MainInput';
import MainContainer from '../components/MainContainer/MainContainer';
import { setInput } from '../store/dictionarySlice';
import { useAppDispatch, useAppSelector } from '../hook';

function App() {
  const { input,  } = useAppSelector(state => state.dictionary)
  const dispatch = useAppDispatch()
  const setInputValue = (value:string)=> dispatch(setInput({input:value}))

  return (
    <>
      <Header/>
      <MainContainer>
        <MainTitle>Словарь понятий</MainTitle>
        <MainInput 
          value={input} 
          placeholder='Поиск терминов' 
          onChange={event=>setInputValue(event.target.value)} 
          onClick={()=>{}}
        />
        <Alphabet />
        <ListWordsSelectedLetter></ListWordsSelectedLetter>
      </MainContainer>
    </>
  )
}

export default App
