import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styled from "styled-components";
import mdList from "../../config/mdlist.json";
import { Link as RouterLink } from "react-router-dom";


const MenuIcon = styled.img`
    width: 30px;
    height: 30px;
    margin: 0 auto;
`

export default function ListMenu() {

  const contents = Object.keys(mdList.contents).map(e => {
    return (
      <RouterLink to={`/list/${e}`}>
        <ListItemButton sx={{ padding: '5px' }}>
          <ListItemIcon>
            <MenuIcon src={`${process.env.PUBLIC_URL}/images/index/${e}.png`} />
          </ListItemIcon>
          <ListItemText primary={`${e}`} sx={{ color: '#333333' }} />
        </ListItemButton>
      </RouterLink>
    );
  })

  return (
    <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'lightblue', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))' }}>
      <List>
        {contents}
      </List>
    </Box>
  );
}