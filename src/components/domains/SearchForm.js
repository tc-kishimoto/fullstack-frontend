import * as React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function SearchForm() {
    const [selectItem, setSelectItem] = React.useState('');
    const [item, setItem] = React.useState({
        0: {
            label: 'コンテンツ',
            value: 'content'
        },
        1: {
            label: 'ユーザー',
            value: 'user'
        },
        2: {
            label: '企業',
            value: 'company'
        },
        3: {
            label: 'コース',
            value: 'course'
        },
        4: {
            label: '通知',
            value: 'notification'
        },
    });

    const handleChange = (event) => {
    setSelectItem(event.target.value);
    };

    const SelectList =  Object.keys(item).map(s =>  {
        return (
            <MenuItem value={item[s].value}>{ item[s].label }</MenuItem>
        )
    });

    function search() {
        alert('検索');
    }

    return (
        <form>
            <Select
            size="small"
            defaultValue='content'
            displayEmpty={true}
            value={selectItem}
            onChange={handleChange}
            >
                { SelectList }
            </Select>
            <TextField label="キーワード検索" variant="outlined" size="small" />
            <Button variant="contained" color="secondary" onClick={search}><SearchIcon /></Button>
        </form>
    )
}

export default SearchForm;