import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container, List, ListItem, Typography } from '@mui/material';
import styles from './Header.module.scss'
import React from 'react';
import { NavLink } from 'react-router-dom';


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
        name:'Тексты',
        href:"texts"
    },
    {
        name:'Авторы',
        href:"authors"
    },
    {
        name:'Словарь понятий',
        // href:"dictionary"
        href:""
    },
    {
        name:'О проекте',
        href:"about"
    },
]
const Header = () => {
    return (
        <AppBar position="static" sx={{boxShadow:0}}>
            <Container  fixed>
                <Toolbar sx={{display:"flex", justifyContent:"center", alignItems:"center", gap: 10}}>
                    <List className={styles.listLink}>
                        {listLink.map((link)=>{
                            return (
                                <ListItem 
                                    component={MyNavLink}
                                    to={link.href}
                                    activeClassName={styles.active}
                                    className={styles.headerLink}
                                    key={link.name}
                                >
                                    <Typography className={styles.text}>{link.name}</Typography>       
                                </ListItem>
                            )
                        })}
                        
                    </List>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;