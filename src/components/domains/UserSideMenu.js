import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const SideNav = styled.nav`
    width: 300px;
    height: fit-content;
    position: sticky;
    top: 30px;
    overflow: auto;
    max-height: 100vh;
`

const UserSideMenu = () => {
  const navigate = useNavigate();

  return (
    <SideNav>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/user')}>
            <ListItemText primary="ユーザー管理" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/company')}>
            <ListItemText primary="企業管理" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/course')}>
            <ListItemText primary="コース管理" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="問題管理" />
          </ListItemButton>
        </ListItem>
      </List>
    </SideNav>
  )
}

export default UserSideMenu;