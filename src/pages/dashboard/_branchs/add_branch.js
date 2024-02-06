// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import UserNewEditForm from 'src/components/_dash/Branch/Add_Edit/add_edit_branch_form'; 
import { useLocales } from 'src/locales';


// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();


  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      
      <CustomBreadcrumbs
        heading={t('addNew')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('branchs'), href: paths.dashboard.branchs.root },
          { name: t('addNew') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm />
    </Container>
  );
}
