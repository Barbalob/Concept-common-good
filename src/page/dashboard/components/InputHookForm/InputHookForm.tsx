
import { TextField } from "@mui/material";
import { Control, FieldValues, Path, useController} from "react-hook-form";

interface InputHookFormProps<T extends FieldValues> {
  control: Control<T>; // Контроллер формы
  name: Path<T>; // Поле в объекте формы
  rules?: any; // Правила валидации
  label?: string; // Опциональный текст метки
}

const InputHookForm =  <T extends FieldValues>({ control, name, rules, label  }: InputHookFormProps<T>) => {
  const {
    field,
    fieldState: { error },
    // fieldState: { invalid, isTouched, isDirty },
    // formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules,
    // defaultValue
  });

  return (
    <TextField 
      {...field}
      label={label}
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error ? error.message : ''}
      sx={{marginBottom:2}}
    />
  );
}

export default InputHookForm;