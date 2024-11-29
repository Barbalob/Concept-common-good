import Header from '../components/Header/Header';
import MainTitle from '../components/MainTitle/MainTitle';
import MainInput from '../components/MainInput/MainInput';
import MainContainer from '../components/MainContainer/MainContainer';
import TextList from '../components/TextList/TextList';

const data = [
    {
    id:1,
    author:"Рассуждение о чудесах",
    textTitle:"Локк Дж",
    year:1701
},
{
    id:2,
    author:"Левиафан",
    textTitle:"Томас Гоббс",
    year:1025
},
{
    id:3,
    author:"О чудесах",
    textTitle:"Д. Юм",
    year:1025
},
]

const Texts = () => {
    return (
        <>
            <Header></Header>
            <MainContainer>
                <MainTitle>Ключевые тексты</MainTitle>
                <MainInput placeholder='Поиск текстов' onClick={()=>{}}></MainInput>
                <TextList data={data}></TextList>
            </MainContainer>
        </>
    );
};

export default Texts;