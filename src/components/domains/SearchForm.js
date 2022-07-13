import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';

function SearchForm() {

    function search() {
        // alert('検索');
        // console.log('search')
        return (
            <Link to="/search"></Link>
        );
    }

    return (
        <form>
            <FormControl fullWidth>
                <TextField label="キーワード検索" variant="outlined" size="small" color="secondary" />
            </FormControl>
            <Button variant="contained" color="secondary" onClick={search}><SearchIcon /></Button>
        </form>
    )
}

export default SearchForm;