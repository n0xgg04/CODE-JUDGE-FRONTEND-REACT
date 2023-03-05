import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, React, Component } from 'react';
import Editor from "@monaco-editor/react";
import axios from "axios";
import Spinner from 'react-spinner-material';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { ContestsCard, ContestsSort, ContestsSearch } from '../sections/@dashboard/contests';
import { API_LINK, DEBUG_MODE } from '../config/config'
import 'react-toastify/dist/ReactToastify.css';
// mock

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Mới nhất' },
];

let POSTS = [
  {
    "contest_id": "50cee2a6-343a-4c96-af87-b02d5a7e0dbe",
    "cover": "https://file.itptit.com/s0/files/64fc19b8-7a7c-444a-b291-6ebf8adab0d9/Contest_poster.png",
    "name": "Mid-Term Contest Demo",
    "startAt": "2022-07-31T11:10:42.891Z",
    "joiner": 1,
    "islocked": true,
    "mode": "OI",
    "favorite": 0,
    "author": {
      "name": "Admin",
      "avatarUrl": "/assets/images/avatars/avatar_1.jpg"
    }
  }
]
// ----------------------------------------------------------------------

export default function ContestPage() {
  const params = new URLSearchParams();
  params.append("username", localStorage.getItem("username"));
  const [contestList, setContestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${API_LINK}/api/contest/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => {
          // Handle the response
          if (response.data.result === "success") {
            POSTS = response.data.data;
            setContestList(POSTS);
          } else
            window.location.href = "/login"
        })
        .catch(error => {
          toast.error('Phiên làm việc hết hạn. Vui lòng đăng nhập lại...', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => { window.location.href = "/login" },2000)
        });

    }
    if (contestList.length === 0) {
      fetchData();
    }
  }, [contestList]);

  ;

  return (
    <>
      <Helmet>
        <title>Cuộc thi</title>
      </Helmet>
      <ToastContainer />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Các cuộc thi hiện có
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Post
            </Button> */}
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ContestsSearch posts={POSTS} />
          <ContestsSort options={SORT_OPTIONS} />
        </Stack>
        {contestList.length === 0 && (<p>Loading contest list...</p>)}
        {contestList.length > 0 && (
          <Grid container spacing={3}>
            {POSTS.map((post, index) => (
              <ContestsCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );

}
