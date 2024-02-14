import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

// routes
import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { useLocales } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { WebServices } from 'src/utils/requests';

import { useEffect, useState } from 'react';
import BrachList from '../../../components/_dash/Branch/Main/BranchList';


export default function UserListView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  const [res_data, setRes_data] = useState([])
  
  async function fetchData() {
    const { data } = await WebServices.getAllBranches();
    setRes_data(data)
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  console.log("branchs", res_data);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>

      <CustomBreadcrumbs
        heading={t('branchs')}
        links={[
          { name: t('home'), href: paths.dashboard.branchs.root },
          { name: t('branchs'), href: paths.dashboard.general.branchs },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.branchs.add}
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
      <BrachList data={res_data}  />

    </Container>
  );
}
