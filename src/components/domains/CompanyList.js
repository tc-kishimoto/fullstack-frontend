import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAxios } from '../../service/axios';

const CompanyList = () => {

  const axios = useAxios();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const search = async () => {
    const result = await axios.get('/filterCompany', {
      params: {
        keyword: keyword
      }
    });
    setData(result.data);
  }
  
  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get('/getCompanies');
      setData(result.data);
    };
    fetchDate();
  }, [])

  const columns = [
    {
      field: 'name',
      headerName: '企業名',
      width: 300,
    },
    {
      field: 'short_name',
      headerName: '企業名（略称）',
      width: 200,
    },
    {
      field: 'URL',
      headerName: 'URL',
      width: 500,
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
          onClick={() => navigate('/mypage/newCompany')}
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

export default CompanyList;