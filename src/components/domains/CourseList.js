import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAxios } from '../../service/axios';

const CourseList = () => {

  const axios = useAxios();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const search = async () => {
    const result = await axios.get('/filterCourse', {
      params: {
        keyword: keyword
      }
    });
    setData(result.data);
  }
  
  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get('/getCourses');
      setData(result.data);
    };
    fetchDate();
  }, [])

  const columns = [
    {
      field: 'detail',
      headerName: '詳細',
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => <Button variant="contained" color="primary"  onClick={() => {navigate('/mypage/course/' + params.id)}}>詳細</Button>
    },
    {
      field: 'name',
      headerName: 'コース名',
      width: 300,
    },
    {
      field: 'id',
      headerName: '編集',
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => <Button variant="contained" color="primary"  onClick={() => {navigate('/mypage/course/' + params.id)}}>編集</Button>
    },
    
  ];
  
  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="left" spacing={5} >
        <Button 
          margin="normal" 
          variant="contained" 
          color="secondary"
          sx={{ m: 2 }}
          onClick={() => navigate('/mypage/course/new')}
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
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight={true}
        />
      </Stack>
    </Stack>
  )
}

export default CourseList;