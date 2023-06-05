import React, { useRef, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, area, latitude, longitude) {
  return { name, area, latitude, longitude};
}

const rows = [
  createData('GOVT. HIGH SCHOOL UNIT-VI BHUBANESWAR', 'Bhubaneswar', 20.264740, 85.817150),
  createData('KALINGA INSTITUTE OF SOCIAL SCIENCES (KISS)', 'Bhubaneswar' , 20.487759, 85.936943),
  createData('SAINT ARNOLDS SCHOOL', 'Bhubaneswar' , 22.246190, 84.806020),
  createData('SARASWATI SHISHU VIDYA MANDIR UNIT VIII ', 'Bhubaneswar', 20.274070, 85.811340),
  createData('ST XAVIER HIGH SCHOOL', 'Bhubaneswar', 20.262170 , 85.785610)
];

const ATLs = () => {
  return(
  <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name of School</TableCell>
            <TableCell align="right">Area</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.area}</TableCell>
              <TableCell align="right">{row.latitude}</TableCell>
              <TableCell align="right">{row.longitude}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default ATLs;