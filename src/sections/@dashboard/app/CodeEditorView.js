import PropTypes from 'prop-types';
import Editor from "@monaco-editor/react";
import { useNavigate, Redirect, useLocation } from 'react-router-dom';
import { useState, useEffect, useParams } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Stack, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { API_LINK, DEBUG_MODE } from '../../../config/config'


// utils
import { fNumber } from '../../../utils/formatNumber';
import Iconify from '../../../components/iconify';
import 'react-toastify/dist/ReactToastify.css';

// components

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;


const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));


const CustomButton = styled(Button)({
  marginRight: '10px',
})

// ----------------------------------------------------------------------

CodeEditorView.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  Pid: PropTypes.any,
};

export default function CodeEditorView({ title, subheader, Pid, ...other }) {
  const theme = useTheme();
  const [sourceCode, setSourceCode] = useState(null);
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('Chưa nộp');
  const [resultSent, setResult] = useState(null);

  const jwtoken = localStorage.getItem('token');
  if (!jwtoken) {
    window.location.href = '/login'; // replace with your login page URL
  }

  const HandleSubmit = () => {
    if (sourceCode === null) {
      toast.error('Bài chưa làm gì mà nộp ?', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    // console.log(sourceCode);
    setStatus("Đang chấm bài...")
    toast.warning('Bài của bạn đã được gửi đi!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    const fetchData = async () => {
      const response = await axios.post(`${API_LINK}/api/code/submit/${Pid}`, {
        source_code: sourceCode,
        problemId: `${Pid}`,
        lang : "cpp",
        accessToken: localStorage.getItem("accessUserToken"),
      }, {
        headers: {
          Authorization: `Bearer ${jwtoken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log(response)
      if (response.data.result === "success") {
        const submissionResult = response.data.result;
        setResult(submissionResult);
        if (response.data.description === "ce") setStatus(`Lỗi biên dịch`); else 
        if (response.data.AcceptedTest === 0) setStatus(`Sai toàn bộ`); else 
        if (response.data.AcceptedTest === response.data.allTestAmount) setStatus(`Chấp nhận`); else {
          setStatus(`Tạm chấp nhận (${response.data.AcceptedTest}/${response.data.allTestAmount})`);
        }
        toast.success('Đã chấm bài !', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };
    fetchData();
    // setTimeout(()=>{navigate('/dashboard/submissions', { replace: true });},2000)
  }


  return (
    <>
      <Card {...other}>
        <ToastContainer />
        <Stack spacing={0}>
          {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0.5}
        >
          <CardHeader title={title} subheader={subheader} />
          <Button variant="contained" className={classes.secondButton}>
          Nộp bài
        </Button>
        </Stack> */}
          <Stack
            direction="column"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >



          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <CardHeader title={title} subheader={subheader} />
            </Grid>
            <Grid item xs={5.4}>
              <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                Trạng thái :
              </Typography>
              {status==="Chấp nhận" && (<Typography variant="body1" style={{ display: 'inline',color:'green' }}>
                {` ${status}`}
              </Typography>)}
              {status==="Lỗi biên dịch" && (<Typography variant="body1" style={{ display: 'inline',color:'red' }}>
                {` ${status}`}
              </Typography>)}
              {status==="Chưa nộp" && (<Typography variant="body1" style={{ display: 'inline',color:'blue' }}>
                {` ${status}`}
              </Typography>)}
              {status==="Sai toàn bộ" && (<Typography variant="body1" style={{ display: 'inline',color:'red' }}>
                {` ${status}`}
              </Typography>)}
              {status==="Đang chấm bài..." && (<Typography variant="body1" style={{ display: 'inline',color:'blue' }}>
                {` ${status}`}
              </Typography>)}
              {/* <Button variant="outlined">{status}</Button> */}
            </Grid>
            <Grid item xs={1.6}>
              <CustomButton variant="contained" onClick={HandleSubmit}>
                Nộp bài
              </CustomButton>
            </Grid>
          </Grid>

          <Editor
            height="70vh"
            defaultLanguage="c"
            value={sourceCode}
            onChange={(sourceCode) => { setSourceCode(sourceCode) }}
            defaultValue="//Paste code vào đây nha bé iu"
          />
        </Stack>

        </Stack>
      </Card>
    </>
  );
}
