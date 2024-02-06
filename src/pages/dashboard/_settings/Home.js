import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

// routes
import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';


import EditSettings from 'src/components/_dash/Settings/Edit'
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function UserListView() {
  const settings = useSettingsContext();
  const { t } = useLocales();
  // const { data: totalSales } = useData('api/Branches/Get', { DateFilterType: 0 })



  // console.log("total Branches",totalSales?.data.length);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>

      <CustomBreadcrumbs
        heading={t('siteSettings')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('siteSettings')},
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EditSettings />

    </Container>
  );
}
