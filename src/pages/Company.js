import Stack from '@mui/material/Stack';
import UserSideMenu from '../components/domains/UserSideMenu';
import CompanyForm from '../components/domains/CompanyForm';

function Company() {

    return (
      <Stack direction={'row'} spacing="1" justifyContent="flex-start">
        <UserSideMenu />
        <CompanyForm />
      </Stack>
    );
}

export default Company;
