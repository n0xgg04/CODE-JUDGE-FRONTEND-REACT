import PropTypes from 'prop-types';
import { TypeAnimation } from 'react-type-animation';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Katex } from 'react-katex';
import 'katex/dist/katex.min.css';
// components

import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

ProblemView.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  subtitle :PropTypes.string,
  input :PropTypes.string,
  output :PropTypes.string,
  testcase: PropTypes.any,
  test: PropTypes.any,
};

function createData(input, output) {
  return { input,output};
}

const rows = [
  createData('1 50','1 4 5 6 7 8'),
  createData('',''),
  createData('',''),
];
/*

[
    {
        "input": "1 50",
        "output": "1 3 5"
    }
]
*/
export default function ProblemView({ title, subheader,subtitle, input,output,test, testcase, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Container maxWidth="xl">

        <Typography variant="body1" gutterBottom>
          <TypeAnimation
            sequence={[
              `${subtitle}`,
              500, // Waits 1s
            ]}
            wrapper="div"
            repeat={0}
            speed="70"
          />
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 'bold' }} gutterBottom>
          INPUT
        </Typography>
        <Typography variant="body1" gutterBottom>
        {testcase[0].input}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 'bold' }} gutterBottom>
          OUTPUT
        </Typography>
        <Typography variant="body1" gutterBottom>
        {testcase[0].output}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 'bold' }} gutterBottom>
          Testcase mẫu
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "300px" }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>INPUT</TableCell>
                <TableCell align="right">OUTPUT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              test.map((one) => (
                <TableRow
                  key={`${one.input}${one.output}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {one.input}
                  </TableCell>
                  <TableCell align="right">{one.output}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body1" style={{ fontWeight: 'bold' ,color: "white"}} gutterBottom>
          .
        </Typography>
      </Container>
    </Card>
  );
}
