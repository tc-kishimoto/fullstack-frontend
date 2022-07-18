import { useState } from 'react';
import { useAxios } from '../../service/axios';
import Button from '@mui/material/Button';
import RegisterDialog from './RegisterDialog';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CustomizedSnackbars from './CustomizedSnackbarsSnackbar';

const DeleteBtn = (props) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const axios = useAxios();

  const onDelete = () => {
    setDialogOpen(true)
  }

  const handleSubmit = () => {
    setDialogOpen(false)
    setProgressOpen(true)
    axios.delete(props.endpoint + '/' + props.id)
    .then(res => {
        setSeverity('success')
        setMessage('削除が完了しました。')
        setSnackbarOpen(true);
    }).catch(error => {
        setSeverity('error')
        setMessage('削除に失敗しました。')
        setSnackbarOpen(true);
    }
    ).finally(() => setProgressOpen(false))
}

  return (
    <>
      <Button 
        margin="normal" 
        variant="contained" 
        color="error"
        sx={{ m: 2 }}
        onClick={onDelete}
        >
        削除
      </Button>
      <RegisterDialog 
        open={dialogOpen}
        setOpen={setDialogOpen}
        handleSubmit={handleSubmit}
        modeName={'削除'}
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

export default DeleteBtn;