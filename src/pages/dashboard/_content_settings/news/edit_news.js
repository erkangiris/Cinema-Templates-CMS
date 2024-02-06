
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import AddEditNew from 'src/components/_dash/News/Add-Edit/add-edit';


import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
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
        heading={t('edit')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('contentSettings'), href: paths.dashboard.managamet.news.root },
          { name: t('news'), href: paths.dashboard.managamet.offer.root },
          { name: t('edit') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <AddEditNew />
    </Container>
  );
}
