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
// assets
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFAutocomplete,
   RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useParams } from 'react-router';
import { WebServices } from 'src/utils/requests';

import { useLocales } from 'src/locales';


export default function UserNewEditForm() {
  const router = useRouter();

  const { id } = useParams();

  const { t } = useLocales();

  const [allBranchs, setAllBranchs] = useState(null);
  const [branchIdData, setBranchIdData] = useState(null);
  const [selectedBranchId, setSelectetBranchId] = useState(null);

  const fetchData = async () => {
    const { data } = await WebServices.getBranchId({ id });
    setBranchIdData(data);
  };

  const fetchDataAllBranchs = async () => {
    const { data } = await WebServices.getAllBranchesDropdown();
    setAllBranchs(data);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    fetchDataAllBranchs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const { enqueueSnackbar } = useSnackbar();

  const BranchScheme = Yup.object().shape({
    BranchName: Yup.string().required(t('requiredField')),
    BranchDescription: Yup.string().required(t('requiredField')),
    Address: Yup.string().required(t('requiredField')),
    Phone: Yup.string().required(t('requiredField')),
    Email: Yup.string().required(t('requiredField')),
    Location: Yup.string().required(t('requiredField')),
    BiletinialBranchId: Yup.string().required(t('requiredField')),
    ImageFile: Yup.mixed().required(t('requiredField')),
  });

  const defaultValues = useMemo(
    () => ({
      BranchName: '',
      BranchDescription: '',
      Address: '',
      Phone: '',
      Email: '',
      Location: '',
      BiletinialBranchId: null,
      ImageFile: null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, branchIdData]
  );

  const methods = useForm({
    resolver: yupResolver(BranchScheme),
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

  useEffect(() => {
    if (id) {
      setValue('id', branchIdData?.id || '');
      setValue('BranchName', branchIdData?.branchName || '');
      setValue('BranchDescription', branchIdData?.branchDescription || '');
      setValue('Address', branchIdData?.address || '');
      setValue('Phone', branchIdData?.phone || '');
      setValue('Email', branchIdData?.email || '');
      setValue('Location', branchIdData?.location || '');
      setValue('biletinialBranchId', branchIdData?.biletinialBranchId || '');
      // setValue(
      //   'BiletinialBranchId',
      //   allBranchs?.find((item) => item.id === branchIdData?.biletinialBranchId)?.name ||
      //     'Şube Silinmiş ve ya Bulunamadı'
      // );
      // setSelectetBranchId(
      //   allBranchs?.find((item) => item.id === branchIdData?.biletinialBranchId)?.name || null
      // );
      setValue('ImageFile', branchIdData?.imageUrl || '-');
    }
  }, [branchIdData, setValue, id, allBranchs]);

  const values = watch();

  

  const onSubmit = useCallback(async () => {
    const isForm = true;
    if (id) {
      const newValues = { ...values, BiletinialBranchId: selectedBranchId };
      // console.log('new eidt values', newValues);
      const response = await WebServices.UpdateBranch(newValues, isForm);
      // console.log('edit branch res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.branchs.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    } else {
      const newValues = { ...values, BiletinialBranchId: selectedBranchId };
      const response = await WebServices.CreateBranch(newValues, isForm);
      // console.log('edit branch res = ', response);
      if (response.success) {
        reset();
        router.push(paths.dashboard.branchs.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    }
  }, [reset, id, values, enqueueSnackbar, router, selectedBranchId,t]);

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
                    1920x700px boyutunda, *.jpeg, *.jpg, *.png, *.gif türleinde ve maximum {fData(3145728)} boyutunda olmalıdır.
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
              <RHFTextField name="BranchName" label={t('name')} />
              <RHFTextField name="BranchDescription" label={t('desc')} />
              <RHFTextField name="Address" label={t('adress')} />
              <RHFTextField name="Phone" label={t('tel')} />
              <RHFTextField name="Email" label={t('Email')} />
              <RHFTextField name="Location" label={t('local')} />
              {/* <RHFTextField name="biletinialBranchId" label="Branch Id giriniz" type="number" /> */}
              <RHFAutocomplete
                name="BiletinialBranchId"
                label={`${t('choose')} ${t('branch')}`}
                options={
                  allBranchs && allBranchs.length > 0
                    ? allBranchs.map((item) => item.name)
                    : []
                }
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) =>
                  option.biletinialBranchId === value.biletinialBranchId ||
                  option?.biletinialBranchId === value
                }
                renderOption={(props, option) => {
                  const { name } = allBranchs.filter((item) => item.name === option)[0];

                  if (!name) {
                    return null;
                  }

                  return (
                    <li {...props} key={name}>
                      {name}
                    </li>
                  );
                }}
                onChange={(event, newValue) => {
                  const selectedOption = allBranchs.find((item) => item.name === newValue);
                  const selectedId = selectedOption ? selectedOption.id : '';
                  setSelectetBranchId(selectedId);
                  setValue('BiletinialBranchId', newValue);
                }}
              />
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


