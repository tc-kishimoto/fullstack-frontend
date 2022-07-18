import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RegisterBtn from './RegistBtn';
import DeleteBtn from './DeleteBtn';

const RegisterBtnArea = (props) => {

  return (
    <Stack direction="row" justifyContent="center">
      {props.mode === 'new' ?
        (
          <>
            <Button
              margin="normal"
              variant="contained"
              color="secondary"
              sx={{ m: 2 }}
              onClick={() => props.setData(props.dataInit)}
            >
              クリア
            </Button>
            <RegisterBtn
              endpoint={props.endpoint}
              data={props.data}
              validation={props.validation}
              mode={'new'}
            />
          </>
        )
        :
        (
          <>
            <RegisterBtn
              endpoint={props.endpoint}
              data={props.data}
              validation={props.validation}
              mode={'update'}
            />
            <DeleteBtn
              endpoint={props.endpoint}
              id={props.id}
            />
          </>
        )
      }
    </Stack>
  )
}

export default RegisterBtnArea;