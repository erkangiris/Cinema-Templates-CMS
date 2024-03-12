import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';

// components
import Iconify from 'src/components/iconify';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ filters, onFilters }) {
  const handleFilterName = useCallback(
    (event) => {
      onFilters('title', event.target.value);
    },
    [onFilters]
  );

  const { t } = useLocales();


  return (
    <div>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.title}
            onChange={handleFilterName}
            placeholder={t('search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </div>
  );
}

UserTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
};
