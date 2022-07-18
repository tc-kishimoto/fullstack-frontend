import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { useAxios } from '../../service/axios';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

const SubmissionDetail = () => {

  const axios = useAxios();
  const [data, setData] = useState({ comments: [] })
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('getSubmission/' + id);
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <Stack spacing={5}>
      <h3>提出内容</h3>
      <Stack direction="row" justifyContent="center" spacing={5} >
        <TextField
          fullWidth
          margin="normal"
          id="category"
          label="カテゴリ"
          variant="outlined"
          size="small"
          value={data.category}
        />
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={5} >
        <TextField
          fullWidth
          margin="normal"
          id="name"
          label="演習名"
          variant="outlined"
          size="small"
          value={data.lesson_name}
        />
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={5} >
        <TextField
          fullWidth
          margin="normal"
          id="url"
          label="提出先URL"
          variant="outlined"
          size="small"
          value={data.url}
        />
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={5} >
        <TextField
          fullWidth
          margin="normal"
          id="comment"
          label="コメント"
          variant="outlined"
          multiline
          rows={4}
        />
      </Stack>
      <hr />
      <h3>コメント</h3>
      {data.comments.map(e => {
        return (
          <Stack direction="row" justifyContent="center" spacing={5} id={e}>
            <TextField
              fullWidth
              margin="normal"
              id={e}
              label="コメント"
              variant="outlined"
              multiline
              rows={4}
              value={e}
            />
          </Stack>
        )
      })}
      <Stack direction="row" justifyContent="center" spacing={5} >
        <TextField
          fullWidth
          margin="normal"
          id="addComment"
          label="コメント"
          variant="outlined"
          multiline
          rows={4}
        />
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={5} >
        <Button
          margin="normal"
          variant="contained"
          color="secondary"
          sx={{ m: 2 }}
        >
          追加
        </Button>
      </Stack>
    </Stack>
  )
}

export default SubmissionDetail;