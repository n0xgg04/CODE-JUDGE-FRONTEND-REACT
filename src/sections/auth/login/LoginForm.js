import { useState } from 'react';
import { useNavigate, Redirect,useLocation } from 'react-router-dom';
import axios from "axios";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import Iconify from '../../../components/iconify';
import { API_LINK, DEBUG_MODE } from '../../../config/config';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const data = location.state?.error;
//  console.log(data)
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

 
  const handleClick = () => {
    if (username === "" || password === "") {
      toast.error('Tên đăng nhập và mật khẩu không được để trống !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }


    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(API_LINK.concat('/api/auth/login'), params, config)
      .then((response) => {
        if (DEBUG_MODE) console.log(response);
        if (response.data.result !== 'error') {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", username);
          localStorage.setItem("fullname", response.data.fullname);
          localStorage.setItem("accessUserToken", response.data.accessToken);
          toast.success('Đăng nhập thành công !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => 
          {
            navigate('/dashboard/contests', { replace: true });
          },2000);
        } else {
          toast.error('Sai pass rồi bé ơi', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        toast.error('Có lỗi xảy ra!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <Stack spacing={3}>
        <TextField name="username"
        value={username}
        id="username_form"
        label="Tên đăng nhập" 
        onChange={(event) => {setUsername(event.target.value)}} 
        onKeyDown = {handleKeyPress}
        />

        <TextField
          name="password"
          label="Mật khẩu"
          value={password}
          onKeyDown = {handleKeyPress}
          onChange={(event) => {setPassword(event.target.value)}}
          
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Ghi nhớ đăng nhập" />
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Đăng nhập
      </LoadingButton>
    </>
  );
}
