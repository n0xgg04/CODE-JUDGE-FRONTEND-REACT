import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';
import Editor from "@monaco-editor/react";
import { Shimmer } from 'react-shimmer'
import axios from "axios";

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import 'react-toastify/dist/ReactToastify.css';
import { API_LINK, DEBUG_MODE } from '../config/config'

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  CodeEditorView,
  ProblemView,
  RequirementView,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
function createData(input, output) {
  return { input,output};
}

const rows = [
  createData('1 50','1 4 5 6 7 8'),
  createData('',''),
  createData('',''),
];

export default function ChallengePage() {
  const { id } = useParams();
  const theme = useTheme();
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login'; // replace with your login page URL
  }

  let PROBLEMINFO = {
    title: "Loading..."
  }
  const [isNotFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [problemInfo, setProblemInfo] = useState(null);

  const notFoundNotice = () => {
    toast.error('Không tìm thấy bài hoặc bạn không có quyền làm bài này !', {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_LINK}/api/problem/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (response.data.result === "success") {
          const problemData = response.data.data[0];
          setProblemInfo(problemData);
          PROBLEMINFO = problemData
        } else {
          notFoundNotice();
          setNotFound(true)
        }
      } catch (error) {
        notFoundNotice()
        setNotFound(true)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!loading) console.log('loaded');

  return (
    <>
      <Helmet>
        <title>Thử thách</title>
      </Helmet>
      <ToastContainer />
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thử thách của bạn
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={8}>

            {loading ? (
              <>
              <Typography variant="body1">
                Không thấy bài hoặc không có quyền xem
              </Typography>
              </>
            ) : (
              isNotFound ? (
                <ProblemView
                  title="Không tìm thấy bài hoặc không có quyền xem..."
                  subheader={`#${id}`}
                />
              ) : (
                <ProblemView
                  title={problemInfo.title}
                  subheader={`#${id}`}
                  subtitle = {problemInfo.description}
                  input = ""
                  output =""
                  testcase={problemInfo.testDescription}
                  test={problemInfo.test}
                />
              )
            )}

          </Grid>

          <Grid item xs={12} md={6} lg={4}>

          {loading ? (
              <RequirementView
              title="Thông tin & Yêu cầu"
              subheader="Bạn cần vượt qua các điều kiện để hoàn thành thử thách"
              authorName = "Loading..."
              level = "Loading..."
              language = "Loading..."
              runtime = "Loading..."
              memory = "Loading..."
              score = "Loading..."
            />
            ) : (
              isNotFound ? (
                <RequirementView
              title="Thông tin & Yêu cầu"
              subheader="Bạn cần vượt qua các điều kiện để hoàn thành thử thách"
              authorName = "Not Found"
              level = "Not Found"
              language = "Not Found"
              runtime = "Not Found"
              memory ="Not Found"
              score = "Not Found"
            />
              ) : (
                <RequirementView
              title="Thông tin & Yêu cầu"
              subheader="Bạn cần vượt qua các điều kiện để hoàn thành thử thách"
              authorName = {problemInfo.authorName}
              level = {problemInfo.level}
              language = {problemInfo.LanguageAcception}
              runtime = {problemInfo.runtime}
              memory = {problemInfo.memory}
              score = {problemInfo.maxPoints}
            />
              )
            )}

          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <CodeEditorView
              title="Soạn thảo code"
              subheader="Paste đoạn mã của bạn vào đây và nộp bài nhé"
              Pid={id}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
