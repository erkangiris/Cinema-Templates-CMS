
import React from 'react';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';

import { paths } from 'src/routes/paths';

import AddEditForm from 'src/components/_dash/ContentPages/Add-Edit/add-edit'
import { useLocales } from 'src/locales';
import { Container } from '@mui/material';


export default function ContentAddEdit() {
  const { t } = useLocales();
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
          heading={t('edit')}
          links={[
            { name: t('home'), href: paths.dashboard.branchs.root },
            { name: t('contentSettings'),href: paths.dashboard.managamet.banner.root},
            { name: t('contentPages'),href: paths.dashboard.managamet.content.root },
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
