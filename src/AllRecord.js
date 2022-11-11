import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function AllRecord() {
  const [maindata, setmaindata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:13723/api/Mains") //http://localhost:13723/api/Countries
      .then((response) => {
        setmaindata(response.data);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell>inspectionDate</StyledTableCell>
            <StyledTableCell align="right">
              doorCardLeft/
              <br />
              (If No) Explain
            </StyledTableCell>
            <StyledTableCell align="right">
              phoneNum/
              <br />
              primaryPhoneIs
            </StyledTableCell>
            <StyledTableCell align="right">
              locationCon/
              <br />
              Equipment
            </StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Images</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maindata.map((info) => (
            <StyledTableRow key={info.id}>
              <StyledTableCell component="th" scope="info">
                {info.id}
              </StyledTableCell>
              <StyledTableCell align="right">
                {info.inspectionDate}
              </StyledTableCell>
              <StyledTableCell align="right">
                {info.doorCard}/<br />
                {info.describe}
              </StyledTableCell>
              <StyledTableCell align="right">
                {info.phoneNum}/<br />
                {info.primaryPhoneIs}
              </StyledTableCell>
              <StyledTableCell align="right">
                {info.locationCon}/<br />
                {info.equipment}
              </StyledTableCell>
              <StyledTableCell align="right">{info.states}</StyledTableCell>
              <StyledTableCell align="right">{info.city}</StyledTableCell>
              <StyledTableCell align="right">
                {info.propertyPhoto}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllRecord;
