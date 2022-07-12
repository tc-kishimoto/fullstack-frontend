import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAxios } from '../../service/axios';
import RegisterBtn from './RegistBtn';

function UserForm() {

    const axios = useAxios();
    const dataInit = {
        email: '',
        login_id: '',
        name: '',
        name_kana: '',
        password: '',
        rePassword: '',
        role: 4,
        company_id: '',
    }

    const roles = [
        {id: 1, name: 'システム管理者'},
        {id: 2, name: '企業担当者'},
        {id: 3, name: '講師'},
        {id: 4, name: '一般'},
    ]

    const [data, setData] = useState(dataInit);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchDate = async () => {
            const result = await axios.get('/getCompanies');
            setCompanies(result.data);
        }
        fetchDate();
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData(
            {...data, [name]: value}
        )
    }

    const textFields = [
        {name: 'email', label: 'メールアドレス', type: 'text'},
        {name: 'login_id', label: 'ログインID', type: 'text'},
        {name: 'name', label: '名前', type: 'text'},
        {name: 'name_kana', label: '名前（カナ）', type: 'text'},
        {name: 'password', label: 'パスワード', type: 'password'},
        {name: 'rePassword', label: 'パスワード（確認用）', type: 'password'},
    ]

    const validation = () => {

    }

    return (
        <Stack spacing={5}>
            {textFields.map(e => {
                return(
                    <Stack direction="row" justifyContent="center" spacing={5} key={e.name}>
                        <TextField 
                            required
                            name={e.name}
                            label={e.label}
                            type={e.type}
                            variant="filled"
                            sx={{ width: '50%' }} 
                            value={data[e.name]}
                            onChange={handleChange}
                            />
                    </Stack>
                )
            })}
            <Stack direction="row" justifyContent="center">
                <FormControl sx={{ width: '50%'}}>
                    <InputLabel>権限</InputLabel>
                    <Select
                        required
                        name="role"
                        label="権限"
                        value={data.role}
                        onChange={handleChange}
                    >
                            {roles.map(e => {
                                return (
                                    <MenuItem 
                                        value={e.id}
                                        key={e.id}
                                    >
                                        {e.name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
            </Stack>
            <Stack direction="row" justifyContent="center">
                <FormControl sx={{ width: '50%'}}>
                    <InputLabel>所属企業</InputLabel>
                    <Select
                        required
                        name="company_id"
                        label="所属企業"
                        value={data.company_id}
                        onChange={handleChange}
                        >
                            {companies.map(e => {
                                return (
                                    <MenuItem 
                                        value={e.id}
                                        key={e.id}
                                    >
                                        {e.name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
            </Stack>
            <Stack direction="row" justifyContent="center">
                <Button 
                    margin="normal" 
                    variant="contained" 
                    color="secondary"
                    sx={{ m: 2 }}
                    onClick={() => setData(dataInit)}
                    >
                    クリア
                </Button>
                <RegisterBtn 
                endpoint={'/user'}
                data={data}
                validation={validation}
                /> 
            </Stack>
        </Stack>
    );
}

export default UserForm;