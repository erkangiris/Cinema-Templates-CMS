import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

// routes
import { paths } from 'src/routes/paths';
import BultenList from 'src/components/_dash/Bulten/Home/BultenList'

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useLocales } from 'src/locales';
import { useEffect, useState } from 'react';
import { WebServices } from 'src/utils/requests';

// ----------------------------------------------------------------------

export default function UserListView() {
  const settings = useSettingsContext();
  const { t } = useLocales();
    
  const [res_data, setRes_data] = useState([])
  
  async function fetchData() {
    const { data } = await WebServices.getBulten();
    setRes_data(data)
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  // console.log("bulten : ",res_data);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('bulten')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('members'), href: paths.dashboard.members.elbuten },
          { name: t('bulten'), href: paths.dashboard.members.elbuten },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

<BultenList data={res_data }/>
    </Container>
  );
}
