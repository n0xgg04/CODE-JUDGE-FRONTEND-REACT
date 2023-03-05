import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import 'react-toastify/dist/ReactToastify.css';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { API_LINK, DEBUG_MODE } from '../config/config'
// sections
import { SubmissionListToolbar, SubmissionsListHead } from '../sections/@dashboard/submissions';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

let SUBMISSIONS = [
    {
        "submissionId": "100391",
        "submitAt": "10 phút trước",
        "challengeName": "Chjt ndam dảk",
        "scores": "100",
        "submissionStatus": "Accepted",
        "runtime": "0.01s",
        "memory": "10KB"
    }
]

const TABLE_HEAD = [
    { id: 'submissionId', label: '#', alignRight: false },
    { id: 'submitAt', label: 'Nộp lúc', alignRight: false },
    { id: 'challengeName', label: 'Thử thách', alignRight: false },
    { id: 'scores', label: 'Điểm', alignRight: false },
    { id: 'runtime', label: 'Thời gian chạy', alignRight: false },
    { id: 'memory', label: 'Bộ nhớ tiêu tốn', alignRight: false },
    { id: 'submissionStatus', label: 'Trạng thái', alignRight: false },
    { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_submissionsElement) => _submissionsElement.challengeName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function SubmissionPage() {

    const [submissionList, setSubmissionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`${API_LINK}/api/code/submissions/all/${localStorage.getItem("accessUserToken")}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then(response => {
                    // Handle the response
                    if (response.data.result === "success") {
                        SUBMISSIONS = response.data.data;
                        setSubmissionList(SUBMISSIONS);
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
                    setTimeout(() => { window.location.href = "/login" }, 2000)
                });

        }
        if (submissionList.length === 0) {
            fetchData();
        }
    }, [submissionList]);


    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('desc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('submissionId');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SUBMISSIONS.length) : 0;

    const filteredUsers = applySortFilter(SUBMISSIONS, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title>Bài đã nộp</title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Danh sách đã nộp của bạn
                    </Typography>
                </Stack>

                <Card>
                    <SubmissionListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        {submissionList.length === 0 && (<p>Loading submissions list...</p>)}
                        {submissionList.length > 0 && (
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table>
                                    <SubmissionsListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={SUBMISSIONS.length}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            const { submissionId, submitAt, challengeName, scores, runtime, submissionStatus, memory } = row;
                                            const selectedUser = selected.indexOf(submissionId) !== -1;

                                            return (
                                                <TableRow hover key={submissionId} tabIndex={-1} role="checkbox" selected={selectedUser}>

                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, submissionId)} />
                                                    </TableCell>
                                                    <TableCell align="left">{submissionId}</TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Typography variant="subtitle2" noWrap>
                                                            {submitAt}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="left"><Typography variant="subtitle2" noWrap>{challengeName}</Typography></TableCell>

                                                    <TableCell align="left">{scores}</TableCell>

                                                    <TableCell align="left">{runtime}</TableCell>
                                                    <TableCell align="left">{memory}</TableCell>
                                                    <TableCell align="left">
                                                        <Label color={submissionStatus !== 'ac' && submissionStatus !== 'pa' && 'error' || 'success'}>{(submissionStatus==='ac' && 'Accepted' || submissionStatus ==='wa' && 'Wrong Answer' || submissionStatus ==='ce' && 'Compile Error') || submissionStatus ==='pa' && 'Partially Accepted' || submissionStatus ==='rte' && 'Runtime Error' || submissionStatus ==='tle' && 'Time Limit Exceed' || submissionStatus ==='mle' && 'Memory Limit Exceed' || 'Unknown' }</Label>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                                            <Iconify icon={'eva:more-vertical-fill'} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>

                                    {isNotFound && (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                    <Paper
                                                        sx={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <Typography variant="h6" paragraph>
                                                            Có cc
                                                        </Typography>

                                                        <Typography variant="body2">
                                                            Không tìm thấy &nbsp;
                                                            <strong>&quot;{filterName}&quot;</strong>.
                                                            <br /> Đéo tìm thấy !!
                                                        </Typography>
                                                    </Paper>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                        )}
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={SUBMISSIONS.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Xem chi tiết
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Xoá bài
                </MenuItem>
            </Popover>
        </>
    );
}
