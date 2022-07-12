import Stack from '@mui/material/Stack';
import UserSideMenu from '../components/domains/UserSideMenu';
import UserForm from '../components/domains/UserForm';

function User() {

    return (
        <Stack direction={'row'} spacing="1" justifyContent="flex-start">
            <UserSideMenu />
            <UserForm />
        </Stack>
    );
}

export default User;
