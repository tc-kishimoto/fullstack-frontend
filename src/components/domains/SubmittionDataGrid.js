import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../service/axios';
import { waitForNone } from "recoil";

const SubmissionDataGrid = (props) => {

  const axios = useAxios();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  
  useEffect(() => {
      const params = props.params;
      const endpoint = props.target === 'my' ? '/getMySubmissions' : '/getSubmissions/'
      const fetchSubmissions = async() => {
        const result = await axios.get(endpoint, params
        );
        setSubmissions(result.data);
      }
      fetchSubmissions();
  }, [])

  const columns = [
    {
      field: 'user_name',
      headerName: 'ユーザー名',
      width: 200,
      hide: props.target === 'my' ? true : false,
    },
    {
      field: 'category',
      headerName: 'カテゴリ',
      width: 200,
    },
    {
      field: 'lesson_name',
      headerName: '演習名',
      width: 150,
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
      rows={submissions}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      autoHeight={true}
    />
  )
}

export default SubmissionDataGrid;