// @mui
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton'; // hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useLocales } from 'src/locales';
//

// ----------------------------------------------------------------------

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onTranslateEditRow,
}) {
  const { contentTitle, imageUrl } = row;

  const confirm = useBoolean();

  const { t } = useLocales();

  const popover = usePopover();
  console.log(row)
  return (
    <>
      <TableRow hover selected={selected}>


        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.title}</TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={contentTitle} src={imageUrl} sx={{ borderRadius: '16px', width: '60%' }} />
        </TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <IconButton
            sx={{ fontSize: '14px', gap: '8px' }}
            onClick={() => {
              onTranslateEditRow();
            }}
          >
            {' '}
            <Iconify icon="iconamoon:edit" /> İçerik Düzenle
          </IconButton>
        </TableCell> */}

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {t('delete')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {t('edit')}
        </MenuItem>
        
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('delete')}
        content="Silmek istediğinizden emin misiniz ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('delete')}
          </Button>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onTranslateEditRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
