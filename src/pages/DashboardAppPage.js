import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import Editor from "@monaco-editor/react";
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
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

export default function DashboardAppPage() {
  const theme = useTheme();
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login'; // replace with your login page URL
  }

  return (
    <>
      <Helmet>
        <title>Thử thách </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thử thách của bạn
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={8}>
            <ProblemView
              title="Tính tuổi"
              subheader="Mức độ : Dễ"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <RequirementView
              title="Thông tin & Yêu cầu"
              subheader="Bạn cần vượt qua các điều kiện để hoàn thành thử thách"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <CodeEditorView
              title="Soạn thảo code"
              subheader="Paste đoạn mã của bạn vào đây và nộp bài nhé"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
