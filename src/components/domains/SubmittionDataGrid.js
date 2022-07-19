import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const SubmissionDataGrid = (props) => {

  const navigate = useNavigate();

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
      rows={props.data}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      autoHeight={true}
    />
  )
}

export default SubmissionDataGrid;