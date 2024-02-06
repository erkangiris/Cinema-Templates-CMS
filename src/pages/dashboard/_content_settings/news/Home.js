import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

// routes
import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { WebServices } from 'src/utils/requests';

import NewsList from 'src/components/_dash/News/Home/NewsList';
import { useEffect, useState } from 'react';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function UserListView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  const [res_data, setRes_data] = useState([]);

  async function fetchData() {
    const { data } = await WebServices.getAllNews();
    setRes_data(data);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("News Pages :",res_data);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('news')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('contentSettings'), href: paths.dashboard.managamet.banner.root },
          { name: t('news') },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.managamet.news.add}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t('addNew')}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <NewsList data={res_data} />
    </Container>
  );
}
