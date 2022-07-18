import { useState } from 'react';
import { useAxios } from '../../service/axios';
import Button from '@mui/material/Button';
import RegisterDialog from './RegisterDialog';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CustomizedSnackbars from './CustomizedSnackbarsSnackbar';

const RegisterBtn = (props) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const axios = useAxios();
  // const validation = props.validation;

  const onRegister = () => {
    if (!props.validation()) {
      return;
    }
    setDialogOpen(true)
  }
  const method = props.mode === 'new' ? axios.post : axios.put;

  const handleSubmit = () => {
    setDialogOpen(false)
    setProgressOpen(true)
    method(props.endpoint, {
      ...props.data
    }).then(res => {
      console.log(res)
      setSeverity('success')
      setMessage('更新完了しました。')
      setSnackbarOpen(true);
    }).catch(error => {
      console.log(error)
      setSeverity('error')
      setMessage('更新に失敗しました。')
      setSnackbarOpen(true);
    }
    ).finally(() => setProgressOpen(false))
  }

  return (
    <>
      <Button
        margin="normal"
        variant="contained"
        color="secondary"
        sx={{ m: 2 }}
        onClick={onRegister}
      >
        {props.mode === 'new' ? '登録' : '更新'}
      </Button>
      <RegisterDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        handleSubmit={handleSubmit}
        modeName={props.mode === 'new' ? '登録' : '更新'}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progressOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={severity}
        message={message}
      />
    </>
  )
}

export default RegisterBtn;