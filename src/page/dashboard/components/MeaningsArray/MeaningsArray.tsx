import { Chip, List } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Control, Controller, FieldValues, Path} from "react-hook-form";
import MainInput from "../../../../components/MainInput/MainInput";
import InputEditChip from "../InputEditChip/InputEditChip";

interface InputHookFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; 
  rules?: any; 
  label?: string; 
}

const MeaningsArray =  <T extends FieldValues>({ control, name, label  }: InputHookFormProps<T>) => {  
    return (
      <Controller 
        control={control}
        name={name}
        render={({ field: { onChange, value}}) => {
          const [valueInput, setValueInput] = useState('')
          const [valueInputEdit, setValueInputEdit] = useState('')
          const [valueIndex, setValueIndex] = useState<number | null>(null)

          const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValueInput(e.target.value)
          }

          const onClick = ()=>{
            if (valueInput !== '' && valueInput !== ' '){
              onChange([...value, valueInput])
              setValueInput('')
            }
          }

          const handleDelete = (index:number) => {
            onChange((prevState:string[]) => [
              ...prevState.slice(0, index),
              ...prevState.slice(index + 1)
            ])

          }
          return (
            <>
              {valueIndex !== null ?
              <InputEditChip
                value={valueInputEdit}
                onChange={(e)=>{setValueInputEdit(e.target.value)}}
                sizeTextButton="14px"
                placeholder={`Редактирование определения`}
                onClickCancel={()=>{
                  setValueIndex(null)
                  setValueInputEdit('')
                }}
                onClickEdit={()=>{
                  onChange((prevState:string[]) => [
                    ...prevState.slice(0, valueIndex),
                    valueInputEdit,
                    ...prevState.slice(valueIndex + 1)
                  ])
                  setValueInputEdit('')
                  setValueIndex(null)
                }}
              /> :
              <MainInput
                onChange={(e)=>{onChangeInput(e)}}
                value={valueInput}
                onClick={onClick}
                placeholder={label}
                sizeTextButton="20px"
                textButton="Добавить"
              />  
              }
              
              <List >
                {value?.map((meaning:string,index:number)=>{
                  return (
                      <Chip
                      key={index} sx={{margin:1}} onClick={()=>{
                        setValueIndex(index) 
                        setValueInputEdit(meaning)
                      }} label={meaning} variant="outlined" onDelete={()=>handleDelete(index)}
                      />
                  )
                })}
              </List >
            </>
          )
      }}
      />
    );
};

export default MeaningsArray;