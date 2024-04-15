// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import TranslateBranch from 'src/components/_dash/Branch/Add_Edit/translate_branch'; 
import { useLocales } from 'src/locales';


// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();


  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      
      <CustomBreadcrumbs
        heading={t('edit')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('branchs'), href: paths.dashboard.branchs.root },
          { name: t('edit') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TranslateBranch />
    </Container>
  );
}
