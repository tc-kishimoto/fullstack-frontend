import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import UserSideMenu from '../components/domains/UserSideMenu';
import { useParams } from "react-router-dom";
import UserForm from '../components/domains/UserForm';
import CompanyForm from '../components/domains/CompanyForm';
import CourseForm from '../components/domains/CourseForm';

function MyPage() {

    const { menu } = useParams();

    return (
        <Stack direction={'row'} spacing="1" justifyContent="flex-start">
            <UserSideMenu />
            <Box sx={{ bgcolor: 'aliceblue', p: '20px', width: '100%' }} >
                {menu === 'user' ? <UserForm/> : <></>}   
                {menu === 'company' ? <CompanyForm/> : <></>}   
                {menu === 'course' ? <CourseForm/> : <></>}   
            </Box>
        </Stack>
    );
}

export default MyPage;
