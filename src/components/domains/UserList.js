import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAxios } from '../../service/axios';
import UserDataGrid from './UserDataGrid';

const UserList = () => {

  const axios = useAxios();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const search = async () => {
    const result = await axios.get('/filterUser', {
      params: {
        keyword: keyword
      }
    });
    setData(result.data);
  }

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get('/getUsers');
      setData(result.data);
    };
    fetchDate();
  }, [])

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="left" spacing={5} >
        <Button
          margin="normal"
          variant="contained"
          color="secondary"
          sx={{ m: 2 }}
          onClick={() => navigate('/mypage/user/new')}
        >
          新規登録
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={5} >
        <FormControl>
          <TextField
            label="キーワード"
            variant="outlined"
            size="small"
            color="secondary"
            onChange={e => setKeyword(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" color="secondary" onClick={() => search()}><SearchIcon /></Button>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={5} >
        <UserDataGrid 
          data={data}
        />
      </Stack>
    </Stack>
  )
}

export default UserList;