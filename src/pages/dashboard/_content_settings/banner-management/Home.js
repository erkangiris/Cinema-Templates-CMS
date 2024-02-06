import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';

import { useLocales } from 'src/locales';
import { WebServices } from 'src/utils/requests';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify/iconify';
import BannerList from '../../../../components/_dash/BannerManagement/Home/BannerList';

export default function Banner_Management() {
  const settings = useSettingsContext();

  const { t } = useLocales();

  const [res_data, setRes_data] = useState([]);

  async function fetchData() {
    const { data } = await WebServices.getAllBanners();
    setRes_data(data);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("banner management : ",res_data);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('bannerManagement')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('contentSettings'), href: paths.dashboard.managamet.banner.root },
          { name: t('bannerManagement') },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.managamet.banner.add}
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

      <BannerList data={res_data} />
    </Container>
  );
}
