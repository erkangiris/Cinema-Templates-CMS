import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useLocales } from 'src/locales';
import { WebServices } from 'src/utils/requests';
import SliderList from "../../../../components/_dash/Slider/Home/SliderList"

export default function ContentPages() {

  const settings = useSettingsContext();


  const { t } = useLocales();

  const [res_data, setRes_data] = useState([])
  
  async function fetchData() {
    const { data } = await WebServices.GetAllPopups();
    setRes_data(data)
  }

  console.log(res_data,"popup res")
  
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
          heading={t('popupManagement')}
          links={[
            { name: t('home'), href: paths.dashboard.branchs.root },
            { name: t('contentSettings'),href: paths.dashboard.managamet.banner.root},
            { name: t('popupPage') },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.managamet.slider.add}
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

        <SliderList data={res_data} />


    </Container>

  );
}
