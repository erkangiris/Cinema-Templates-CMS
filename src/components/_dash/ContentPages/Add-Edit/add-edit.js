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
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useParams } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers';
import { WebServices } from 'src/utils/requests';
// import { CONTENT_TYPES } from 'src/_mock/map/enum_values';
import { useLocales } from 'src/locales';
import { EnumContext } from 'src/_mock/enum-values/EnumContext';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ currentUser }) {
  const router = useRouter();

  const { CONTENT_TYPES } = useContext(EnumContext);

  const { id } = useParams();

  const { t } = useLocales();

  const [contentPagesId, setContentPagesId] = useState(null);
  const [languages, setLanguages] = useState([]);

  const fetchData = async () => {
    const { data } = await WebServices.getContentPageId({ id });
    setContentPagesId(data);
  };

  const fetchDataLanguages = async () => {
    const { data } = await WebServices.getAllLanguages();
    setLanguages(data);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    fetchDataLanguages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(languages,'languages')

  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    contentTitle: Yup.string().required(t('requiredField')),
    contents: Yup.string().required(t('requiredField')),
    seoUrl: Yup.string().required(t('requiredField')),
    isActive: Yup.string().required(t('requiredField')),
    contentType: Yup.mixed().required(t('requiredField')),
    // language: Yup.string().required(t('requiredField')),

    // ImageFile: Yup.mixed().required('ImageFile is required'),
  });

  const defaultValues = useMemo(
    () => ({
      contentTitle: '',
      contents: '',
      seoUrl: '',
      isActive: true,
      contentType: '',
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

  useEffect(() => {
    if (id) {
      setValue('id', contentPagesId?.id);
      setValue('contentTitle', contentPagesId?.contentTitle);
      setValue('seoUrl', contentPagesId?.seoUrl);
      setValue('ImageFile', contentPagesId?.imageUrl);
      setValue('isActive', contentPagesId?.isActive);
      setValue('contents', contentPagesId?.contents);
      setValue('contentType', CONTENT_TYPES.find(item => item.value === contentPagesId?.contentType)?.value || '' );
      // setValue('language', languages?.find(item => item.id ===contentPagesId?.language)?.id || '' );
    }
  }, [contentPagesId, setValue, id,CONTENT_TYPES,languages]);
  
  const onSubmit = useCallback(async () => {
    const isForm = true
    if (id) {
      const response = await WebServices.UpdateContentPage(values,isForm);
      // console.log('edit branch res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.managamet.content.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    } else {
      const response = await WebServices.CreateContentPage(values,isForm);
      // console.log('edit branch res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.managamet.content.root);
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
              <RHFTextField name="contentTitle" label={t('name')} />
              {/* <RHFTextField name="StartDate" label="Başlama Tarihi" /> */}

              <RHFTextField name="seoUrl" label={t('link')} />
              {/* <RHFTextField name="contentType" label="Sayfa Tipi" type="number" /> */}
              <RHFSelect
                native
                name="contentType"
                label={`${t('content')} ${t('type')}`}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">{`${t('content')} ${t('type')} ${t('choose')}`}</option>
                {CONTENT_TYPES?.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </RHFSelect>

              {/* <RHFSelect
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
              </RHFSelect> */}
              <RHFSwitch
                name="isActive"
                labelPlacement="start"
                label={<Typography variant="subcontentTitle2">{`${t('activity')}`}</Typography>}
                sx={{ mx: 0, width: 1, justifyContent: 'start' }}
              />
            </Box>

            {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!id ? 'Sayfa Oluştur' : 'Sayfa Düzenle'}
              </LoadingButton>
            </Stack> */}
          </Card>
        </Grid>

        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Box>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">{`${t('content')} ${t('detail')}`}</Typography>
                <RHFEditor simple name="contents" />
              </Stack>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!id ? t('addNew') : t('edit')}
              </LoadingButton>
            </Stack>
            </Box>
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
