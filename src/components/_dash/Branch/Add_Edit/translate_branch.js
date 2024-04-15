/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFEditor, RHFSelect, RHFTextField, } from 'src/components/hook-form';
import { useParams } from 'react-router';
import { WebServices } from 'src/utils/requests';
import { useLocales } from 'src/locales';


export default function TranslateBranch() {
  const router = useRouter();
  const { id } = useParams();
  const { t } = useLocales();
  const [allBranchs, setAllBranchs] = useState(null);
  const [branchIdData, setBranchIdData] = useState(null);
  const [selectedBranchId, setSelectetBranchId] = useState(null);
  const [languages, setLanguages] = useState([]);

  const fetchData = async () => {
    const { data } = await WebServices.getBranchId({ id });
    const { data:langdata } = await WebServices.getAllLanguages();
    setLanguages(langdata);
    setBranchIdData(data);
  };
  console.log(id)
  const fetchDataAllBranchs = async () => {
    const { data } = await WebServices.getAllBranchesDropdown();
    setAllBranchs(data);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    fetchDataAllBranchs();
  }, []);


  const { enqueueSnackbar } = useSnackbar();

  const BranchScheme = Yup.object().shape({
    BranchName: Yup.string().required(t('requiredField')),
    BranchDescription: Yup.string().required(t('requiredField')),
    BiletinialBranchId: Yup.string().required(t('requiredField')),
  });

  const defaultValues = useMemo(
    () => ({
      id:null,
      BranchName: '',
      BranchDescription: '',
      BiletinialBranchId: null,
      LangId: 1,
    }),
    [id, branchIdData]
  );

  const methods = useForm({
    resolver: yupResolver(BranchScheme),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (id) {
      setValue('BranchName', branchIdData?.name || '');
      setValue('BranchDescription', branchIdData?.description || '');
      setValue('BranchId', id || '');
      setValue('LangId', 3);
      setValue(
        'BiletinialBranchId',
        allBranchs?.find((item) => item.id === branchIdData?.biletinialBranchId)?.name ||
        'Şube Silinmiş ve ya Bulunamadı'
      );
      setSelectetBranchId(
        allBranchs?.find((item) => item.id === branchIdData?.id)?.name || null
      );
    }
  }, [branchIdData, setValue, id, allBranchs, languages]);

  const values = watch();
  console.log(branchIdData,"branchIdData")

  const onSubmit = useCallback(async () => {
    const isForm = true;
    if (id) {
      const newValues = { ...values, BiletinialBranchId: selectedBranchId };
      const response = await WebServices.CreateBranchLang(newValues, isForm);
      if (response.success) {
        reset();
        router.push(paths.dashboard.branchs.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    } else {
      const newValues = { ...values, BiletinialBranchId: selectedBranchId };
      const response = await WebServices.CreateBranchLang(newValues, isForm);
      // console.log('edit branch res = ', response);

      if (response.success) {
        reset();
        router.push(paths.dashboard.branchs.root);
        enqueueSnackbar(t('successMsg'));
      } else {
        enqueueSnackbar(t('errorMsg'), { variant: 'error' });
      }
    }
  }, [reset, id, values, enqueueSnackbar, router, selectedBranchId, t]);

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
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
          
           
            >
              <RHFTextField name="BranchName" label={t('name')} />
            </Box>

            <Box sx={{ mt: 3 }}>
            <RHFSelect
                native
                name="LangId"
                label={`${t('language')} ${t('type')}`}
                InputLabelProps={{ shrink: true }}
              >
                <option value="3">Hrvatski</option>
                {/* {languages?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))} */}
              </RHFSelect>
            </Box>

            <Box sx={{ mt: 3 }}>
              <RHFEditor simple name="BranchDescription" />
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


