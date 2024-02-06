import { Button, Container } from '@mui/material';
import React from 'react';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useLocales } from 'src/locales';

import AddEditForm from '../../../../components/_dash/BannerManagement/Add-Edit/add-edit'

export default function BannerManagement() {
  const settings = useSettingsContext();
  const { t } = useLocales();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
          heading={t('Edit')}
          links={[
            { name: t('home'), href: paths.dashboard.general.branchs },
            { name: t('contentSettings'), href: paths.dashboard.managamet.banner.root },
            { name: t('bannerManagement'), href: paths.dashboard.managamet.banner.root },
            { name: t('Edit')},
          ]}

          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <AddEditForm />
    </Container>

  );
}
