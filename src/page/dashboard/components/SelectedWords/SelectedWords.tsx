import { Autocomplete,  CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Control, Controller, ErrorOption, FieldValues, Path} from "react-hook-form";
import { getAuthors, getDictionary } from "../../../../api";
import { TypesAuthor, TypesWords } from "../../../../const/types";


interface IWords{
  ru:string;
  id: string
}

interface InputHookFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; 
  rules?: any; 
  label?: string; 
  errors:any
}

const transform = (data:TypesWords[]):IWords[] => {
  return data.map(i => {return {id: i.id, ru:i.ru}})
}

const SelectedWords =  <T extends FieldValues>({ control, name, label, rules }: InputHookFormProps<T>) => {  
    return (
      <Controller 
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value}}) => {
          const [open, setOpen] = useState(false);
          const [options, setOptions] = useState<readonly IWords[]>([]);
          const [loading, setLoading] = useState(false);
        
          const handleOpen = () => {
            setOpen(true);
            (async () => {
              setLoading(true);
              const fetchData = await getDictionary({params:{}})
              console.log(fetchData);
              setLoading(false);
              setOptions([...transform(fetchData)]);
            })();
          };
        
          const handleClose = () => {
            setOpen(false);
            setOptions([]);
          };
        
          return (
            <Autocomplete
              multiple
              // sx={{ width: 500 }}
              value={value}
              onChange={(e:any, newValue: any) => {
                console.log(111111);
                console.log(newValue);
                onChange(newValue);
              }}
              open={open}
              onOpen={handleOpen}
              onClose={handleClose}
              isOptionEqualToValue={(option, value) => option.ru === value.ru}
              getOptionLabel={(option) => option.ru}
              defaultValue={[]}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  fullWidth
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
            />
          );
      }}
      />
    );
};

export default SelectedWords;