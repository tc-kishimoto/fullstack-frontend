import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styled from "styled-components";
import mdList from "../../config/mdlist.json"


const MenuIcon = styled.img`
    width: 30px;
    height: 30px;
    margin: 0 auto;
`

export default function ListMenu() {

    const contents = Object.keys(mdList.contents).map(e => {
        return (
            <ListItemButton href={`/list/${e}`} sx={{padding: '5px'}}>
                <ListItemIcon>
                    <MenuIcon src={`${process.env.PUBLIC_URL}/images/index/${e}.png`} />
                </ListItemIcon>
                <ListItemText primary={`${e}`} />
            </ListItemButton>
        );
    })

  return (
    <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'lightblue' }}>
      <List>
        { contents }
      </List>
    </Box>
  );
}