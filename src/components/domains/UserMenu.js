import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../states/atoms/userAtom';
import { useAxios } from '../../service/axios';

function UserMenu() {

	const axios = useAxios();
	const navigate = useNavigate();
	const setUser = useSetRecoilState(userState);
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
			<AccountCircleIcon color="secondary" fontSize="large" onClick={handleClick} />
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
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={() => navigate('/mypage')}>
					<Avatar />マイページ
				</MenuItem>
				<Divider />
				<MenuItem component="a" href="#">
					設定
				</MenuItem>
				<Divider />
				<MenuItem
					onClick={() => {
						// console.log('logout')
						axios.post('/logout')
							.then(res => {
								setUser(() => { });
								localStorage.removeItem('access_token');
							})
					}}
				>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					ログアウト
				</MenuItem>
			</Menu>
		</div>
	)
}

export default UserMenu;