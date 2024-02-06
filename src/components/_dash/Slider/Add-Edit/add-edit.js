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

  const [sliderId, setSliderId] = useState(null);
  const [languages, setLanguages] = useState([]);


  const fetchData = async () => {
    const { data } = await WebServices.getSliderId({id });
    setSliderId(data);
  };

  const fetchDataLanguages = async () => {
    const { data } = await WebServices.getAllLanguages();
    setLanguages(data);
    console.log(data)
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    fetchDataLanguages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Title: Yup.string().required(t('requiredField')),
    Description: Yup.string().required(t('requiredField')),
    StartDate: Yup.date().required(t('requiredField')).typeError(''),
    EndDate: Yup.date().required(t('requiredField')).typeError(''),
    Url: Yup.string().required(t('requiredField')),
    ButtonText: Yup.string().required(t('requiredField')),
    Language: Yup.string().required(t('requiredField')),
    ImageFile: Yup.mixed().required(t('requiredField')),
  });



  const defaultValues = useMemo(
    () => ({
      Title: '',
      Description: '',
      StartDate: new Date(),
      EndDate: new Date(),
      Url: '',
      ButtonText: '',
      ImageFile: null,
      Language: '',
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

  useEffect(() => {
    if (id) {
      setValue('Id', sliderId?.id);
      setValue('Title', sliderId?.title);
      setValue('Description', sliderId?.description);
      setValue('StartDate', parseISO(sliderId?.startDate) );
      setValue('EndDate', parseISO(sliderId?.endDate));
      setValue('Url', sliderId?.url);
      setValue('ButtonText', sliderId?.buttonText);
      setValue('ImageFile', sliderId?.imageUrl);
      setValue('Language', languages?.find(item => item.id ===sliderId?.language)?.id || '' );
    }
  }, [sliderId, setValue, id,languages]);

  const onSubmit = useCallback(async () => {
    const isForm = true
    if (id) {
      const response = await WebServices.UpdateSlider(values,isForm);
      if (response.success) {
        reset();
        router.push(paths.dashboard.managamet.slider.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    } else {
      const response = await WebServices.CreateSlider(values,isForm);
      if (response.success) {
        // reset();
        router.push(paths.dashboard.managamet.slider.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    }
  }, [reset, id, values, enqueueSnackbar, router,t]);



  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('ImageFile', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="ImageFile"
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
              <RHFTextField name="Description" label={t('desc')} />
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

              <RHFTextField name="Url" label={t('link')} />
              <RHFTextField name="ButtonText" label={`${t('button')} ${t('text')}`} />
              <RHFSelect
                native
                name="Language"
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
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!id ? t('addNew') : t('edit')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      {/* <code>{JSON.stringify(values, null, 2)}</code> */}
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
