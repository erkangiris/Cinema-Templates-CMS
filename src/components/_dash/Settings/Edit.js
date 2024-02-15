import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useParams } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers';
import { WebServices } from 'src/utils/requests';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const [settingsData, setSettingsData] = useState(null);
  const [languages, setLanguages] = useState([]);

  const fetchData = async () => {
    const { data } = await WebServices.getSettings({langId: 1});
    setSettingsData(data[1]);
  };

  // console.log(settingsData);

  const { t } = useLocales();

  const fetchDataLanguages = async () => {
    const { data } = await WebServices.getAllLanguages();
    setLanguages(data);
  };

  useEffect(() => {
    fetchData();
    fetchDataLanguages();
  }, []);

  // console.log("settings : ",languages);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    id: Yup.string().required('id is required'),
    siteName: Yup.string().required('siteName is required'),
    biletinialApiUser: Yup.string().required('biletinialApiUser is required'),
    biletinialApiPassword: Yup.string().required('biletinialApiPassword is required'),
    googleTagManager: Yup.string().required('googleTagManager is required'),
    address: Yup.string().required('address is required'),
    phone: Yup.string().required('phone is required'),
    email: Yup.string().required('email is required'),
    location: Yup.string().required('location is required'),
    defaultLanguage: Yup.string().required('defaultLanguage is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: '',
      siteName: '',
      biletinialApiUser: '',
      biletinialApiPassword: '',
      googleTagManager: '',
      address: '',
      phone: '',
      email: '',
      cinemaId: '',
      location: '',
      language: '',
      defaultLanguage: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // const onSubmit = useCallback(async () => {
  //   const response = await WebServices.UpdateSetting(values);
  //   console.log('edit settings res = ', response);
  //   if (response.success) {
  //     reset();
  //     router.push(paths.dashboard.branchs.root);
  //     enqueueSnackbar('İşlem Başarılı');
  //   } else {
  //     enqueueSnackbar('Hatalı İşlem', { variant: 'error' });
  //   }
  // }, [reset, values, enqueueSnackbar, router]);

  const onSubmit = useCallback(async () => {
    const isForm = true

      const response = await WebServices.UpdateSetting(values,isForm);
      // console.log('edit settings res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.branchs.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    
  }, [reset, values, enqueueSnackbar, router,t]);


  useEffect(() => {
    setValue('id', settingsData?.id);
    setValue('siteName', settingsData?.siteName);
    setValue('biletinialApiUser', settingsData?.biletinialApiUser);
    setValue('biletinialApiPassword', settingsData?.biletinialApiPassword);
    setValue('googleTagManager', settingsData?.googleTagManager);
    setValue('address', settingsData?.address);
    setValue('cinemaId', settingsData?.cinemaId);
    setValue('phone', settingsData?.phone);
    setValue('email', settingsData?.email);
    setValue('location', settingsData?.location);
    setValue('language', languages?.find((item) => item.id === settingsData?.language)?.id || '');
    setValue('defaultLanguage', settingsData?.defaultLanguage);
  }, [settingsData, setValue, languages]);

  // const onSubmit = useCallback(
  //   async (data) => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       reset();
  //       enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
  //       router.push(paths.dashboard.user.list);
  //       console.info('DATA', data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [currentUser, enqueueSnackbar, reset, router]
  // );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFTextField name="siteName" label="Site Adı" />
          <RHFTextField name="cinemaId" label="Sinema" />
          <RHFTextField name="biletinialApiUser" label="Kullanıcı Api" />
          <RHFTextField name="biletinialApiPassword" label="Kullanıcı Password" />
          <RHFTextField name="googleTagManager" label="Google Tag" />
          <RHFTextField name="address" label="Adres" />
          <RHFTextField name="phone" label="Telefon" />
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="location" label="Lokasyon" />
          {/* <RHFTextField name="language" label="Dil" /> */}
          <RHFSelect
                native
                name="language"
                label={`${t('language')} ${t('type')}`}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">{`${t('language')} ${t('choose')}`}</option>
                {languages?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect
                native
                name="defaultLanguage"
                label="Varsayılan Dil"
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Varsayılan Dil</option>
                {languages?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </RHFSelect>
          {/* <RHFTextField name="defaultLanguage" label="Varsayılan Dil" /> */}
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Ayarları Düzenle
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
