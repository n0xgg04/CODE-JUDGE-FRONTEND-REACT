import { useState } from 'react';
import { useNavigate, Redirect } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Cuộc thi',
    icon: 'eva:home-fill',
  },
  {
    label: 'Cá nhân',
    icon: 'eva:person-fill',
  },
  {
    label: 'Thiết lập',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  const handLogout = () => {
    setOpen(null);
    localStorage.removeItem("token");
    navigate('/login', { replace: true, error: "not_login" });
  }

  const handleBtn1 = () => {
    setOpen(null);
    navigate('/dashboard/contests', { replace: true, error: "" });
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {localStorage.getItem("username")}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {localStorage.getItem("fullname")}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ p: 1 }}>
        <MenuItem key="Cuộc thi" onClick={handleBtn1}>
          Cuộc thi
        </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handLogout} sx={{ m: 1 }}>
          Đăng xuất
        </MenuItem>
      </Popover>
    </>
  );
}