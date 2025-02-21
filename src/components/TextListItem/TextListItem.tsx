import React, { FC } from 'react';
import { TypesText } from '../../const/types';
import { NavLink } from 'react-router-dom';
import { ListItem } from '@mui/material';
import TextGrid from '../TextGrid/TextGrid';


interface TypeTextListItem {
    textData:TypesText,
    isAdmin:boolean
}

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));

const TextListItem:FC<TypeTextListItem> = ({textData, isAdmin}) => {
    return (
        <>
            <ListItem 
                component={MyNavLink}
                to={isAdmin ? `${textData.id}` : `/textDescription/${textData.id}`}
                sx={{p:0}}
            >
                <TextGrid textData={textData}></TextGrid>
            </ListItem>
        </>
    );
};

export default TextListItem;