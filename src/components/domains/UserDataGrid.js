import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const UserDataGrid = (props) => {

  const navigate = useNavigate();

  const columns = [
    {
      field: 'detail',
      headerName: '詳細',
      width: 100,
      renderCell: (params) => <Button
        variant="contained"
        color="primary"
        onClick={() => { navigate('/mypage/userDetail/' + params.id) }}>
        詳細
      </Button>
    },
    {
      field: 'name',
      headerName: '名前',
      width: 230,
      disableSelectionOnClick: true,
    },
    {
      field: 'name_kana',
      headerName: 'カナ',
      width: 230,
    },
    {
      field: 'role_name',
      headerName: '権限',
      width: 150,
    },
    {
      field: 'company_short_name',
      headerName: '所属企業',
      width: 150,
    },
    {
      field: 'created_date',
      headerName: '登録日時',
      width: 100,
    },
    {
      field: 'id',
      headerName: '編集',
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => <Button
        variant="contained"
        color="primary"
        onClick={() => { navigate('/mypage/user/' + params.id) }}>
        編集
      </Button>
    },
  ];

  return (
    <DataGrid
      rows={props.data}
      columns={columns}
      pageSize={20}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      autoHeight={true}
    />
  )
}

export default UserDataGrid;