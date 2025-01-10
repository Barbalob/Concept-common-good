
import { Typography } from "@mui/material"
import MainContainer from "../../components/MainContainer/MainContainer"
import MainTitle from "../../components/MainTitle/MainTitle"
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin"

function MainAdmin() {
  return (
    <>
      <HeaderAdmin/>
      <MainContainer>
        <MainTitle>Админская панель</MainTitle>
        <Typography>
        Добро пожаловать в админскую панель! 
        Здесь вы можете управлять всеми аспектами вашего проекта: 
        от добавления и редактирования данных до мониторинга аналитики в реальном времени. 
        Интуитивно понятный интерфейс обеспечивает удобную навигацию и быстрое выполнение задач. 
        Настройте права доступа для пользователей, чтобы гарантировать безопасность и контроль. 
        Работайте эффективно с продвинутыми инструментами автоматизации и интеграции.
        </Typography>
      </MainContainer>
    </>
  )
}

export default MainAdmin
