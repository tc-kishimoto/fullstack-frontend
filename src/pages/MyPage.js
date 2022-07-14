import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import UserSideMenu from '../components/domains/UserSideMenu';
import { useParams } from "react-router-dom";
import UserForm from '../components/domains/UserForm';
import CompanyForm from '../components/domains/CompanyForm';
import CourseForm from '../components/domains/CourseForm';
import CompanyList from '../components/domains/CompanyList';
import CourseList from '../components/domains/CourseList';
import UserList from '../components/domains/UserList';

function MyPage() {

    const { menu } = useParams();

    return (
        <Stack direction={'row'} spacing="1" justifyContent="flex-start">
            <UserSideMenu />
            <Box sx={{ bgcolor: 'aliceblue', p: '20px', width: '100%' }} >
                {menu === 'company' ? <CompanyList/> : <></>}
                {menu === 'course' ? <CourseList/> : <></>}
                {menu === 'user' ? <UserList/> : <></>}
                {menu === 'newCompany' ? <CompanyForm/> : <></>}
                {menu === 'newCourse' ? <CourseForm/> : <></>} 
                {menu === 'newUser' ? <UserForm/> : <></>} 
            </Box>
        </Stack>
    );
}

export default MyPage;
