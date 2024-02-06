import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';

import { useLocales } from 'src/locales';
import { WebServices } from 'src/utils/requests';
import { localStorageGetItem } from 'src/utils/storage-available';
import { LangToId } from 'src/utils/change-lang';
import ContentList from "../../../../components/_dash/ContentPages/Home/ContentList"

export default function ContentPages() {

  const settings = useSettingsContext();

  const lang = localStorageGetItem('i18nextLng')

  const { t } = useLocales();

  const [res_data, setRes_data] = useState([])
  
  async function fetchData() {
    const { data } = await WebServices.getAllContentPages({langId:LangToId(lang)});
    setRes_data(data)
  }
  
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // console.log("Content Pages :",res_data);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
          heading={t('contentPages')}
          links={[
            { name: t('home'), href: paths.dashboard.branchs.root },
            { name: t('contentSettings'),href: paths.dashboard.managamet.banner.root},
            { name: t('contentPages') },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.managamet.content.add}
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

        <ContentList data={res_data} />


    </Container>

  );
}
