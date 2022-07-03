import * as React from 'react';
import styled from 'styled-components';
import UserMenu from './UserMenu';
import NotifiMenu from './NotifiMenu';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const Logo = styled.img`
    width: 200px;
    height: 50px;
    margin: 5px 5px 5px 5px;
    cursor: pointer;
`

const Ul = styled.ul`
    list-style: none;
    display: flex;
    margin-right: 50px;
`

const Li = styled.li`
    margin: 0px 10px;
`

function Header() {

    return (
        <Grid container spacing={1} m={1} borderBottom={1}>
            <Grid item xs={6}>
                <Logo 
                    src={`${process.env.PUBLIC_URL}/images/index/logo.png`} 
                    onClick={() => {
                        window.location.href='/'
                    }} 
                />
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth>
                    <TextField label="キーワード検索" variant="outlined" size="small" color="secondary" />
                </FormControl>
            </Grid>
            <Grid item xs={1}>
                <Button variant="contained" color="secondary" ><SearchIcon /></Button>
            </Grid>
            <Grid item xs={2} >
                <Ul>
                    <Li>
                        <NotifiMenu />
                    </Li>
                    <Li>
                        <UserMenu />
                    </Li>
                </Ul>
            </Grid>
        </Grid>
    )
}

export default Header;