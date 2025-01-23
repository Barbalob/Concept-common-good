
import { Box, Button, MenuItem, Select, TextareaAutosize, Typography  } from "@mui/material";
import { Control, FieldValues, Path, useController} from "react-hook-form";
import styles from './TextAuthors.module.scss'
import { useEffect, useState } from "react";

interface IAuthor {
  id: string,
  name: string
}

interface IFragment {
  id: string,
  language: string,
  text: string,
}


interface InputHookFormProps<T extends FieldValues> {
  control: Control<T>; // Контроллер формы
  name: Path<T>; // Поле в объекте формы
  rules?: any; // Правила валидации
  label?: string; // Опциональный текст метки
  watchTranslators: IAuthor[] | undefined;
  watchAutors: IAuthor | null;
  error:any
}


const TextAuthors =  <T extends FieldValues>({ control, name, rules, watchTranslators,watchAutors }: InputHookFormProps<T>) => {
  const {
    field,
    // fieldState: { error },
    // fieldState: { invalid, isTouched, isDirty },
    // formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules,
    // defaultValue
  });

  const {value, onChange} = field

  useEffect(()=>{
    if (watchTranslators && watchTranslators?.length > 0){
      if (!valueSelect){
        setValueSelect(watchTranslators[0].id)
      }  
      else if(!watchTranslators?.find(translator => translator.id === valueSelect)){
        setValueSelect(watchTranslators[0].id)
      }
    } 
    else {
      setValueSelect('')
    }
  },[watchTranslators])

  useEffect(()=>{
    let newArray:IAuthor[] = []
    if (watchTranslators && watchTranslators?.length > 0){
      newArray = [...watchTranslators]
    }
    if (watchAutors){
      newArray.push(watchAutors)
    }
    if (newArray && newArray?.length > 0){
      onChange(
        [...[...value.map((part:any) => {
          const newPart = [...part]
          newArray.map(authors => {
            const isFind = !!newPart.find(fragment => fragment.id === authors.id)
            if (!isFind) {
              newPart.push({
                id:authors.id,
                language:'ru',
                text:'',
              })
            }
          })
          return newPart
        })]]
      )
    }
  },[watchTranslators, watchAutors])


  const handlerPush = () => {
    const part:IFragment[] = []
    if (watchAutors?.id){
      part.push({
        id: watchAutors.id,
        language: 'ru',
        text: ''
      })
    }
    watchTranslators?.map(translator => {
      part.push({
        id: translator?.id,
        language: 'ru',
        text: ''
      })
    })
    if (part.length > 0){
    onChange([...value, part])}
  }

  const handlerDelete = () => {
    onChange([...value.slice(0,-1)])
  }

  const handlerChangeText = (i:number, id:string, text:string) => {
    const part = value[i]
    if (part) {
      const item = part.find((fragment:any) => fragment.id === id)
      if (item){
        item.text = text
        return [...value]
      }else{
        console.log("Error Item!", value);     
      }
    } else {
      console.log("Error Part!", value);     
    }
    return [...value] 
  }
  const [valueSelect, setValueSelect] = useState('')
  
  return (
    <>
      {watchAutors?.id ? <Box sx={{display:'flex', flexDirection:'column', gap:2, alignItems:'center', justifyContent:'center',marginBottom:3}}>
        <Box sx={{display:'flex', flexDirection:'column', gap:2, alignItems:'center', justifyContent:'center', width:'100%'}}>
            <Box className={styles.wrapper}>
              <Typography className={styles.item}>Оригинальный текст</Typography>
              <Typography className={styles.item}>Перевод</Typography>
            </Box>
            <Box className={styles.wrapper}>
              <Typography className={styles.item}>Автор: {watchAutors ? watchAutors.name : ''}</Typography>
              {
              watchTranslators 
              && watchTranslators?.length > 0 
              && !(watchTranslators.length === 1 && watchTranslators[0].id === watchAutors?.id)
              ? 
                <Select
                  value={valueSelect}
                  defaultValue={watchTranslators[0].id}
                  onChange={(e)=>setValueSelect(e.target.value)}
                >
                  {watchTranslators?.map(translator => {    
                  return <MenuItem key={translator.id} value={translator.id}>{translator.name}</MenuItem>
                  })}
                </Select>
              :
                <Typography className={styles.item}>Не выбрано ни одного переводчика</Typography>
              }
            </Box>
            {value && value?.map((part:IFragment[], index:number) => {
              const authorText = part?.find(fragment => fragment.id === watchAutors?.id)
              const translatorText = part?.find(fragment =>  fragment.id === valueSelect)
              return(
                <Box key={index} className={styles.wrapper}>
                  {authorText && watchAutors?.id ?
                  <TextareaAutosize 
                    value={authorText.text} 
                    onChange={(e)=>onChange(handlerChangeText(index, watchAutors?.id, e.target.value))} 
                    className={styles.item} 
                    minRows={3}
                  />
                  :
                  <Box className={styles.item}/>
                  }
                  {translatorText && 
                    <TextareaAutosize 
                      value={translatorText.text} 
                      className={styles.item} 
                      onChange={(e)=>onChange(handlerChangeText(index, valueSelect, e.target.value))}
                      minRows={3}
                    />
                  }
                </Box>
              )
            })}
        </Box>
        <Box sx={{display:'flex', gap:5}}>
          <Button variant="contained"  onClick={handlerPush}>Добавить</Button>
          {value && value.length > 0 &&
          <Button variant="outlined"  onClick={handlerDelete}>Удалить</Button>
          }
        </Box>
      </Box>
      :
      <Typography sx={{marginBottom:3,textAlign:'center'}}>Выберите автора для создания текста</Typography>
      }
    </>
  );
}

export default TextAuthors;