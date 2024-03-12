
import React from 'react';

import { Container } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import AddEditForm from 'src/components/_dash/Popup/Add-Edit/add-edit'
import { useSettingsContext } from 'src/components/settings';
import { useLocales } from 'src/locales';

export default function BannerManagement() {
  const settings = useSettingsContext();
  const { t } = useLocales();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
          heading={t('edit')}
          links={[
            { name: t('home'), href: paths.dashboard.branchs.root },
            { name: t('contentSettings'),href: paths.dashboard.managamet.banner.root},
            { name: t('edit')},
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

          <AddEditForm />
    </Container>

  );
}
