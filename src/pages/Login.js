import axios from "axios";
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Login() {

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

    return (
        <Container maxWidth="xs">
          <Box sx={{ bgcolor: 'aliceblue', p: '20px', }} >
          <Stack spacing={5}>
            <TextField 
                id="loginId" 
                label="ログインID またはメールアドレス" 
                variant="filled" 
                onChange={e => setLoginId(e.target.value)}
              />
            <TextField
                id="password"
                label="パスワード"
                variant="filled"
                type="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
          </Stack>
            <Stack direction="row" justifyContent="flex-end">
                <Button margin="normal" variant="contained" 
                  sx={{ m: 2 }}
                  onClick={() => {
                    axios.get(`${process.env.REACT_APP_URL}/sanctum/csrf-cookie`, { withCredentials: true })
                    .then(res => {
                      axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                        email: loginId,
                        password: password
                      }, { withCredentials: true })
                      .then(res => {
                        if(res.status === 200) {
                          console.log('ログイン成功')
                          console.log(res.data)
                        } else {
                          console.log('ログイン失敗')
                        }
                      }).catch(error => console.log(error))
                    }).catch(error => console.log(error))
                  }
                }
                >
                  ログイン
                </Button>
            </Stack>
          </Box>
        </Container>
    );
}

export default Login;
