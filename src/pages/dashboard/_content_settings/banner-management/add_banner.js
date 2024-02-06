import { Container } from '@mui/material';
import React from 'react';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import { useLocales } from 'src/locales';

import AddEditForm from '../../../../components/_dash/BannerManagement/Add-Edit/add-edit'

export default function BannerManagement() {
  const settings = useSettingsContext();
  const { t } = useLocales();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
          heading={t('addNew')}
          links={[
            { name: t('home'), href: paths.dashboard.general.branchs },
            { name: t('contentSettings'), href: paths.dashboard.managamet.banner.root },
            { name: t('bannerManagement'), href: paths.dashboard.managamet.banner.root },
            { name: t('addNew')},
          ]}

          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <AddEditForm />
    </Container>

  );
}
