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
  RHFAutocomplete,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useParams } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers';
import { WebServices } from 'src/utils/requests';
import { Avatar } from '@mui/material';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ renderData }) {
  const router = useRouter();

  // console.log("redner data :",renderData);

  const [res_data, setRes_data] = useState([]);


  const { t } = useLocales();

  async function fetchData() {
    const { data } = await WebServices.getAllCinemaNextProgram();
    setRes_data(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log('cinmea autocpmpalte nextprogra :', res_data);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    BiletinialMovieId: Yup.string().required('BiletinialMovieId is required'),
  });

  const defaultValues = useMemo(
    () => ({
      BiletinialMovieId: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [selectedItemId, setSelectedItemId] = useState(null)

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

  const onSubmit = useCallback(async () => {
    const isForm = false;

    const response = await WebServices.CreateNextProgram({BiletinialMovieId : selectedItemId}, isForm);
    // console.log('post create next program res = ', response);
    if (response.success) {
      reset();
      renderData()
      enqueueSnackbar(t('successMsg'));
    } else {
      enqueueSnackbar(t('errorMsg'), { variant: 'error' });
    }
  }, [reset, enqueueSnackbar,selectedItemId,renderData,t]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        alignItems={{ xs: 'center', md: 'center' }}
        direction={{
          xs: 'row',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pb: 0,
        }}
      >
        <Stack sx={{ width: '100%' }}>
          <RHFAutocomplete
            name="BiletinialMovieId"
            label={`${t('nextProgram')}`}
            options={res_data && res_data.length > 0 ? res_data.map((item) => item.name) : []}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option.id === value.id || option?.id === value}
            renderOption={(props, option) => {
              const { id, name, imageUrl } = res_data.filter((item) => item.name === option)[0];

              if (!name) {
                return null;
              }

              return (
                <li {...props} key={id}>
                  <Avatar src={imageUrl} sx={{ mr: 2, borderRadius: "12px", width:"80px", height: "60px" }} />
                  {id} - {name}
                </li>
              );
            }}
            onChange={(event, newValue) => {
              const selectedOption = res_data.find((item) => item.name === newValue);
              const selectedId = selectedOption ? selectedOption.id : '';
              setValue('BiletinialMovieId', newValue);
              setSelectedItemId(`${selectedId}`)
            }}
          />
        </Stack>

        <Stack>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Ekle
          </LoadingButton>
        </Stack>
      </Stack>
      {/* <Stack sx={{ p: 2 }}>
        // <code>{JSON.stringify(values, null, 2)}</code>
      </Stack> */}
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  renderData: PropTypes.func,
};
