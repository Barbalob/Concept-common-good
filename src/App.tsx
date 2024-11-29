import Header from './components/Header/Header';
import Alphabet from './components/Alphabet/Alphabet';
import SelectedLetter from './components/SelectedLetter/SelectedLetter';
import MainTitle from './components/MainTitle/MainTitle';
import MainInput from './components/MainInput/MainInput';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  return (
    <>
      <Header/>
      <MainContainer>
        <MainTitle>Словарь понятий</MainTitle>
        <MainInput placeholder='Поиск терминов' onClick={()=>{}}></MainInput>
        <Alphabet />
        <SelectedLetter></SelectedLetter>
      </MainContainer>
    </>
  )
}

export default App
