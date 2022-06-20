import * as React from 'react';
import styled from 'styled-components';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MenuList from '@mui/material/MenuList';

const MenuHeader = styled.div`
    display: flex;
    font-size: 12px;
    min-width: 150px;
    padding: 0 8px;
    justify-content: space-between;
`

const MenuFooter = styled.div`
    text-align: center;
    font-size: 12px;
`

const MenuImg = styled.img`
    width: 30px;
    height: 30px;
    margin: 10px 5px 5px 5px;
    border-radius: 50%;
`

const MenuContents = styled.div`
    display: flex;
`

const ContentTitle = styled.h3`
    font-size: 14px;
`

const ContentP = styled.p`
    font-size: 12px;
`

const ContentDate = styled.p`
    font-size: 10px;
    color: gray;
`

function NotifiMenu() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <Badge color="secondary" badgeContent={1000} max={999}>
                <NotificationsIcon fontSize="large" onClick={handleClick} />
            </Badge>
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'aliceblue',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuList sx={{ padding: 0}}>
                <MenuHeader>
                    <p>通知メニュー</p>
                    <a component="a" href="#">通知設定</a>
                </MenuHeader>
            </MenuList>
            <Divider />
            <MenuItem component="a" href="#" sx={{padding: '0px'}}>
                <MenuContents>
                    <MenuImg src={`${process.env.PUBLIC_URL}/images/index/Java1.png`} />
                    <div>
                        <ContentTitle>演習問題提出通知</ContentTitle>
                        <ContentP>〇〇さんがJava1単元課題4を提出しました。</ContentP>
                        <ContentDate>2022-6-20 17:33:24</ContentDate>
                    </div>
                </MenuContents>
            </MenuItem>


            <MenuItem component="a" href="#" sx={{padding: '0px'}}>
                <MenuContents>
                    <MenuImg src={`${process.env.PUBLIC_URL}/images/index/Java1.png`} />
                    <div>
                        <ContentTitle>演習問題提出通知</ContentTitle>
                        <ContentP>〇〇さんがJava1単元課題4を提出しました。</ContentP>
                        <ContentDate>2022-6-20 17:33:24</ContentDate>
                    </div>
                </MenuContents>
            </MenuItem>
            <MenuItem component="a" href="#" sx={{padding: '0px'}}>
                <MenuContents>
                    <MenuImg src={`${process.env.PUBLIC_URL}/images/index/Java1.png`} />
                    <div>
                        <ContentTitle>演習問題提出通知</ContentTitle>
                        <ContentP>〇〇さんがJava1単元課題4を提出しました。</ContentP>
                        <ContentDate>2022-6-20 17:33:24</ContentDate>
                    </div>
                </MenuContents>
            </MenuItem>

            <Divider />
            <MenuFooter>
                <a href="#">通知一覧へ</a>
            </MenuFooter>
        </Menu>
        </div>
    )
}

export default NotifiMenu;