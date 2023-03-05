import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, Grid, Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

RequirementView.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    authorName : PropTypes.string,
    level : PropTypes.string,
    language : PropTypes.any,
    runtime : PropTypes.any,
    memory : PropTypes.any,
    score : PropTypes.any,
};



export default function RequirementView({ title, subheader,authorName, level,language,runtime,memory,score, ...other }) {
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />
            <Container maxWidth="xl">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth:300 }} aria-label="simple table">
                        <TableBody>
                            <TableRow
                                key="1"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                    Từ thách từ
                                </TableCell>
                                <TableCell align="right">{authorName}</TableCell>
                            </TableRow>
                            <TableRow
                                key="2"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                    Mức độ
                                </TableCell>
                                <TableCell align="right">{level}</TableCell>
                            </TableRow>
                            <TableRow
                                key="3"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                    Ngôn ngữ
                                </TableCell>
                                <TableCell align="right">{language}</TableCell>
                            </TableRow>
                            <TableRow
                                key="4"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                    Thời gian chạy :
                                </TableCell>
                                <TableCell align="right">{runtime}</TableCell>
                            </TableRow>
                            <TableRow
                                key="5"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                    Bộ nhớ giới hạn
                                </TableCell>
                                <TableCell align="right">{memory}</TableCell>
                            </TableRow>
                            <TableRow
                                key="6"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                    Điểm
                                </TableCell>
                                <TableCell align="right">{score}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Card>
    );
}
