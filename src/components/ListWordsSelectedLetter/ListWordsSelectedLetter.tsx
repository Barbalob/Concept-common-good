import { Box, List, ListItem, Typography } from "@mui/material";
import styles from "./SelectedLetter.module.scss";
import { TypesWords } from "../../const/types";
import { useAppDispatch, useAppSelector } from "../../hook";
import React, { useEffect } from "react";
import { fetchDictionary } from "../../store/dictionarySlice";
import { ClipLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import LoadingData from "../LoadingData/LoadingData";
import { toCamelCase } from "../../const/const";

const testArray = (list:TypesWords[]):{letter:string,listWords:TypesWords[]}[] => {
  const arrayLetter = list.reduce((accumulator:string[], word)=>{
    if (!accumulator.includes(word.letter)){
      accumulator.push(word.letter)
    }
    return accumulator
  }, [])

  const newArray: {letter:string,listWords:TypesWords[]}[] = []

  arrayLetter.forEach(letter => {
    newArray.push(
      list.reduce((accumulator:{letter:string, listWords:TypesWords[]}, word)=>{
        if (word.letter === letter){
          accumulator.listWords.push(word)
        }
        return accumulator
      },{letter,listWords:[]})
    )
  });

  return newArray
}

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
  <NavLink
    ref={ref}
    to={"/"+props.to}
    className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
  >
    {props.children}
  </NavLink>
));

const ListWordsSelectedLetter = () => {
  const { listWords, isLoading, error, letter, input } = useAppSelector(
    (state) => state.dictionary
  );
  const dispatch =  useAppDispatch()

  useEffect(()=>{
    dispatch(fetchDictionary({letter, word:input}))
  },[letter, input])

  useEffect(()=>{
    testArray(listWords)
  },[listWords])

  return (
    <>
      <LoadingData error={error} isLoading={isLoading} listlength={listWords.length} >
        <>
          {testArray(listWords).map(item => {
            return (
              <List key={item.letter} className={styles.selectedLetterList}>
                <ListItem className={styles.selectedLetter}>
                  <Typography className={styles.letter}>{item.letter.toUpperCase()}</Typography>
                </ListItem>
                <List className={styles.listWords}>
                  {item.listWords.map((word: TypesWords) => {
                    return (
                      <ListItem key={word.id} component={MyNavLink} to={`words/${word.id}`} className={styles.itemListWords}>
                        <Typography className={styles.wordRu}>{toCamelCase(word.ru)}</Typography>
                        <Typography className={styles.wordEn}>{word.en.toLowerCase()}</Typography>
                      </ListItem>
                    );
                  })}
                </List>
              </List>
            )
          })}
        </>
      </LoadingData>
    </>
  );
};

export default ListWordsSelectedLetter;
