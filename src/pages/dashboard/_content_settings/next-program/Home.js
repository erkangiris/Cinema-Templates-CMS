import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify/iconify';

import { WebServices } from 'src/utils/requests';
import { useLocales } from 'src/locales';
import ProgramList from '../../../../components/_dash/NextProgram/ProgramList';

export default function NextPrograms() {
  const settings = useSettingsContext();
  const [res_data, setRes_data] = useState([]);
  const { t } = useLocales();
  

const fetchData = async () => {
  const { data } = await WebServices.getAllNextPrograms();
  setRes_data(data);
}


  useEffect(() => {
    fetchData();
  }, []);

  // console.log('Next Programs :', res_data);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('nextProgram')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('contentSettings'), href: paths.dashboard.managamet.banner.root },
          { name: t('nextProgram'), href: paths.dashboard.managamet.next_program },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProgramList data={res_data} fetchData={fetchData} />
    </Container>
  );
}
