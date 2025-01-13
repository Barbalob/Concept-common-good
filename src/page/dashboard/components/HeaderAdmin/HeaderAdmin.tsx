import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Container, List, ListItem, Typography } from '@mui/material';
import styles from './HeaderAdmin.module.scss'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../hook';
import { fetchAuthLogout } from '../../../../store/authSlice';


const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={"/"+props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));



const listLink = [
    {
        name:'Создание Текстов',
        href:"texts"
    },
    {
        name:'Создание Авторов',
        href:"authors"
    },
    {
        name:'Создание Слов',
        // href:"dictionary"
        href:"words"
    },
    // {
    //     name:'О проекте',
    //     href:"about"
    // },
]
const HeaderAdmin = () => {
    const dispatch = useAppDispatch()
    return (
        <AppBar position="static" sx={{boxShadow:0}}>
            <Container  fixed>
                <Toolbar sx={{display:"flex", justifyContent:"center", alignItems:"center", gap: 10}}>
                    <List className={styles.listLink}>
                        {listLink.map((link)=>{
                            return (
                                <ListItem 
                                    component={MyNavLink}
                                    to={`admin/${link.href}`}
                                    activeClassName={styles.active}
                                    className={styles.headerLink}
                                    key={link.name}
                                >
                                    <Typography className={styles.text}>{link.name}</Typography>       
                                </ListItem>
                            )
                        })}
                        
                    </List>
                    <Button onClick={()=>{dispatch(fetchAuthLogout())}} sx={{border:'1px solid black', color: 'black'}}><Typography className={styles.text}>Выход</Typography></Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default HeaderAdmin;