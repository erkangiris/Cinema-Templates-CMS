/* eslint-disable react-hooks/exhaustive-deps */
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
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useParams } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers';
import { WebServices } from 'src/utils/requests';
import { parseISO } from 'date-fns';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const { id } = useParams();
  const { t } = useLocales();

  const [popupID, setpopupID] = useState(null);
  const [filmList, setFilmList] = useState([]);


  const fetchData = async () => {
    const { data } = await WebServices.getAllPopups({ Id:id });
    setpopupID(data);
  };

  const fetchDataLanguages = async () => {
    const { data } = await WebServices.getAllVision();
    setFilmList(data);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    fetchDataLanguages()
  }, []);


  const allfilm_id =[
    {id:1, film:'Avatar Suyun Yolu'},
    {id:2, film:'Dune Çöl Gezegeni'}
  ]

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Title: Yup.string().required(t('requiredField')),
    Content: Yup.string().required(t('requiredField')),
    StartDate: Yup.date(),
    EndDate: Yup.date(),
    ImageUrl: Yup.mixed(),
    FilmId: Yup.mixed(),
  });



  const defaultValues = useMemo(
    () => ({
      Title: '',
      Content: '',
      StartDate: new Date(),
      EndDate: new Date(),
      FilmId: '',
      ImageUrl: null,
    }),
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

  useEffect(() => {
    if (id) {
      setValue('FilmId', popupID?.id);
      setValue('Title', popupID?.title);
      setValue('Content', popupID?.content);
      setValue('StartDate', parseISO(popupID?.startDate));
      setValue('EndDate', parseISO(popupID?.endDate));
      setValue('ImageUrl', popupID?.imageUrl);
    }
  }, [popupID, setValue, id]);

  const onSubmit = useCallback(async () => {
    
    const isForm = true
    if (id) {
      const response = await WebServices.updatePopup(values, isForm);
      if (response.success) {
        reset();
        router.push(paths.dashboard.managamet.popup.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    } else {
      console.log('sss')
      const response = await WebServices.createPopup(values, isForm);
      if (response.success) {
        // reset();
        router.push(paths.dashboard.managamet.popup.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    }
  }, [reset, id, values, enqueueSnackbar, router, t]);



  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('ImageUrl', newFile);
      }
    },
    [setValue]
  );
 
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <Typography variant="h5">Görsel</Typography>
              <RHFUploadAvatar
                name="ImageUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

          </Card>
        </Grid>

        <Grid xs={12} md={8}>
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
              <RHFTextField name="Title" label={t('name')} />
              <RHFSelect
                native
                name="FilmId"
                label={`${t('filmid')} ${t('type')}`}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">{`${t('filmid')} ${t('choose')}`}</option>
                {allfilm_id?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.film}
                  </option>
                ))}
              </RHFSelect>
              <Stack spacing={1.5}>
                <Controller
                  name="StartDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          label: `${t('start')} ${t('date')}`,

                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>
              <Stack spacing={1.5}>
                <Controller
                  name="EndDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          label: `${t('end')} ${t('date')}`,
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>

    
            </Box>
            <Box sx={{ mt: 3 }}>              
              <RHFTextField name="Content" label={t('desc')} />
              </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!id ? t('addNew') : t('edit')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <code>{JSON.stringify(values, null, 2)}</code>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
