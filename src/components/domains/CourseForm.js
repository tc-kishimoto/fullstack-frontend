import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState, useRef } from 'react';
import RegisterBtnArea from './RegisterBtnArea';
import { useParams } from "react-router-dom";
import FetchData from './FetchData';

const CourseForm = () => {

  const { id } = useParams();

  const dataInit = {
    name: '',
  }

  const [data, setData] = useState(dataInit);
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target
    setData(
      { ...data, [name]: value }
    )
  }

  const validation = () => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setInputError(true);
        return false;
      } else {
        setInputError(false);
        return true;
      }
    }
  }

  return (
    <Stack spacing={5}>
      <Stack direction="row" justifyContent="center" spacing={5}>
        <TextField
          error={inputError}
          inputProps={{ maxLength: 50 }}
          inputRef={inputRef}
          required
          name="name"
          label="コース名"
          variant="filled"
          sx={{ width: '50%' }}
          value={data.name}
          onChange={handleChange}
          helperText={inputRef?.current?.validationMessage}
        />
      </Stack>
      <RegisterBtnArea
        id={id}
        mode={id === 'new' ? 'new' : 'update'}
        setData={setData}
        dataInit={dataInit}
        data={data}
        validation={validation}
        endpoint={'/course'}
      />
      <FetchData
        id={id}
        setData={setData}
        endpoint={'getCourse'}
      />
    </Stack>
  );
}

export default CourseForm;