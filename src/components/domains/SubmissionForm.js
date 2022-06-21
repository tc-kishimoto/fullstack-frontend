import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';

function SubmissionForm() {
    return (
        <div>
            <h2>提出フォーム</h2>
            <TextField fullWidth margin="normal" id="category" label="カテゴリ" variant="outlined" size="small" />
            <TextField fullWidth margin="normal" id="name" label="演習名" variant="outlined" size="small" />
            <TextField fullWidth margin="normal" id="url" label="提出先URL" variant="outlined" size="small" />
            <TextField fullWidth margin="normal" id="comment" label="コメント" variant="outlined" 
                multiline
                rows={4}
            />
            <Stack direction="row" justifyContent="flex-end">
                <Button margin="normal" variant="contained">送信</Button>
            </Stack>
        </div>
    );
}

export default SubmissionForm;
