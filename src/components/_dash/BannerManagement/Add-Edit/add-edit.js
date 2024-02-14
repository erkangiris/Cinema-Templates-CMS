import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
// assets

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useParams } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers';
import { WebServices } from 'src/utils/requests';
import { parseISO } from 'date-fns';
// import { BANNER_TYPES } from 'src/_mock/map/enum_values';
import { useLocales } from 'src/locales';
import { EnumContext } from 'src/_mock/enum-values/EnumContext';
import { MenuItem } from '@mui/material';

// ----------------------------------------------------------------------

// try commit

export default function UserNewEditForm({ currentUser }) {
  const router = useRouter();

  const { BANNER_TYPES } = useContext(EnumContext);

  const { id } = useParams();

  const { t } = useLocales();

  const [bannerDataId, setBannerDataId] = useState(null);

  const fetchData = async () => {
    const { data } = await WebServices.getBannerId({ id });
    setBannerDataId(data);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [languages, setLanguages] = useState([]);

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
    StartDate: Yup.date().required(t('requiredField')).typeError(''),
    EndDate: Yup.date().required(t('requiredField')).typeError(''),
    Url: Yup.string(),
    // Language: Yup.string().required(t('requiredField')),
    ImageFile: Yup.mixed().required(t('requiredField')),
  });

  const defaultValues = useMemo(
    () => ({
      Title: '',
      StartDate: new Date(),
      EndDate: new Date(),
      Url: '',
      // BannerType: 0,
      Language: '',
      ImageFile: null,
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

  // console.log("bannerDataId :",bannerDataId);
  // console.log("selected value",BANNER_TYPES.find((item) => item.value === bannerDataId?.bannerType)?.value);
  // console.log("values : ",values.BannerType);

  // id varsa düzenle sayfasında dolduracak içerikleri
  useEffect(() => {
    if (id) {
      setValue('Id', bannerDataId?.id);
      setValue('Title', bannerDataId?.title);
      setValue('StartDate', parseISO(bannerDataId?.startDate));
      setValue('EndDate', parseISO(bannerDataId?.endDate));
      setValue('Url', bannerDataId?.url);
      // setValue(
      //   'BannerType',
      //   BANNER_TYPES.find((item) => item.value === bannerDataId?.bannerType)?.value || 0
      // );
      // setValue('Language', languages?.find(item => item.id ===bannerDataId?.language)?.id || '' );
      setValue('ImageFile', bannerDataId?.imageUrl);
    }
  }, [bannerDataId, setValue, id, BANNER_TYPES, languages]);

  const onSubmit = useCallback(async () => {
    const isForm = true;

    if (id) {
      const response = await WebServices.UpdateBanner(values, isForm);
      // console.log('edit branch res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.managamet.banner.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    } else {
      const response = await WebServices.CreateBanner(values, isForm);
      // console.log('edit branch res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.managamet.banner.root);
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

      // console.log("Gönderilen img",newFile);

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
              <Stack spacing={1.5}>
                <Controller
                  name="StartDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      label={`${t('start')} ${t('date')}`}
                      // onChange={(value) => {
                      //   field.onChange(value);
                      //   const newDateApiFormat = fDateToApiFormat(value)
                      //   console.log("seçilen tarih = ",newDateApiFormat);
                      //   // setValue('startDate', newDateApiFormat);
                      // }}

                      slotProps={{
                        textField: {
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
                      label={`${t('end')} ${t('date')}`}
                      slotProps={{
                        textField: {
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
              {/* <RHFSelect
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
              </RHFSelect> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!id ? t('addNew') : t('edit')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
