
import React from 'react';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import TranslateEditForm from 'src/components/_dash/ContentPages/Add-Edit/translate_edit_form'

import { paths } from 'src/routes/paths';

export default function banner_management() {
  return (
    <div>
      <CustomBreadcrumbs
          heading="Çeviri Düzenle"
          links={[
            { name: 'Anasayfa', href: paths.dashboard.branchs.root },
            { name: 'İçerik Ayarları', href: paths.dashboard.managamet.content.root },
            { name: 'Sayfa Tanımları', href: paths.dashboard.managamet.content.root },
            { name: 'Sayfa Çeviri Tanımları' },

          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <TranslateEditForm />

    </div>

  );
}
