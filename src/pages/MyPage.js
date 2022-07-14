import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import UserSideMenu from '../components/domains/UserSideMenu';
import { Outlet, useParams } from "react-router-dom";


function MyPage() {

    const { menu } = useParams();

    return (
        <Stack direction={'row'} spacing="1" justifyContent="flex-start">
            <UserSideMenu />
            <Box sx={{ bgcolor: 'aliceblue', p: '20px', width: '100%' }} >
                <Outlet />
            </Box>
        </Stack>
    );
}

export default MyPage;
