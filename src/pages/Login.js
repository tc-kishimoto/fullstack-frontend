import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Login() {
    return (
        <Container maxWidth="xs">
          <Box sx={{ bgcolor: 'aliceblue', p: '20px', }} >
          <Stack spacing={5}>
            <TextField 
                id="loginId" 
                label="ログインID またはメールアドレス" 
                variant="filled" />
            <TextField
                id="password"
                label="パスワード"
                variant="filled"
                type="password"
                autoComplete="current-password"
                />
          </Stack>
            <Stack direction="row" justifyContent="flex-end">
                <Button margin="normal" variant="contained" sx={{ m: 2 }}>ログイン</Button>
            </Stack>
          </Box>
        </Container>
    );
}

export default Login;
