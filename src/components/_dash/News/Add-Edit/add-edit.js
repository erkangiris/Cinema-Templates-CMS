import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
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

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useParams } from 'react-router';
import { WebServices } from 'src/utils/requests';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function UserNewEditForm() {
  const router = useRouter();

  const { id } = useParams();

  const [newId, setNewId] = useState(null);

  const { t } = useLocales();

  const fetchData = async () => {
    const { data } = await WebServices.getNewId({ id });
    setNewId(data);
  };

  // console.log("newid : ",newId);

  useEffect(() => {
    if (id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Title: Yup.string().required(t('requiredField')),
    Summary: Yup.string().required(t('requiredField')),
    Description: Yup.string().required(t('requiredField')),
    ImageFile: Yup.mixed().required(t('requiredField')),
    CoverImageFile: Yup.mixed().required(t('requiredField')),
  });

  const defaultValues = useMemo(
    () => ({
      Title: '',
      Summary: '',
      Description: '',
      ImageFile: null,
      CoverImageFile: null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    // control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (id) {
      setValue('Id', newId?.id);
      setValue('Title', newId?.title);
      setValue('Summary', newId?.summary);
      setValue('Description', newId?.description);
      setValue('ImageFile', newId?.imageUrl);
      setValue('CoverImageFile', newId?.coverImageUrl);
    }
  }, [newId, setValue, id]);

  const onSubmit = useCallback(async () => {
    const isForm = true;
    if (id) {
      const response = await WebServices.UpdateNew(values, isForm);
      // console.log('edit news res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.managamet.news.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    } else {
      const response = await WebServices.CreateNew(values, isForm);
      // console.log('edit news res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.managamet.news.root);
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
        setValue('ImageFile', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropCoverImg = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('CoverImageFile', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4} sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="subtitle2">Ana Resim</Typography>
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

          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="subtitle2">Kapak Resim</Typography>
              <RHFUploadAvatar
                name="CoverImageFile"
                maxSize={3145728}
                onDrop={handleDropCoverImg}
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
              display="flex"
              flexDirection="column"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="Title" label={t('name')} />
              <RHFTextField name="Summary" label={t('summary')} />
              <RHFTextField name="Description" label={t('desc')} />
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

UserNewEditForm.propTypes = {};
