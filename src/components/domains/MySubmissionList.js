import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAxios } from '../../service/axios';

const MySubmissionList = () => {

  const navigate = useNavigate();
  const axios = useAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get('/getMySubmissions');
      setData(result.data);
    };
    fetchDate();
  }, [])

  const columns = [
    {
      field: 'category',
      headerName: 'カテゴリ',
      width: 300,
    },
    {
      field: 'lesson_name',
      headerName: '演習名',
      width: 300,
    },
    {
      field: 'url',
      headerName: 'URL',
      width: 300,
    },
    {
      field: 'detail',
      headerName: '詳細',
      width: 100,
      renderCell: (params) => <Button
        variant="contained"
        color="primary"
        onClick={() => { navigate('/mypage/submission/' + params.id) }}>
        編集
      </Button>
    },
  ];

  return (
    <DataGrid
      rows={data}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      autoHeight={true}
    />
  )
}

export default MySubmissionList;