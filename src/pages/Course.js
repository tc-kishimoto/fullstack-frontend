import Stack from '@mui/material/Stack';
import UserSideMenu from '../components/domains/UserSideMenu';
import CourseForm from '../components/domains/CourseForm';

function Course() {

    return (
      <Stack direction={'row'} spacing="1" justifyContent="flex-start">
        <UserSideMenu />
        <CourseForm />
      </Stack>
    );
}

export default Course;
