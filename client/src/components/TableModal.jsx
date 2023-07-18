import { Dialog } from '@mui/material'
import React from 'react'
import { Box, Button, IconButton, Typography, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import state from '../utils/store';
import { useSnapshot } from 'valtio';
import CloseIcon from '@mui/icons-material/Close';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const TableModal = ({data}) => {
    const snap = useSnapshot(state)
  return (
    <Dialog
      fullScreen
      open={snap}
      onClose={() => {
        state.tableModal = false;
      }}
    >
      <Box display={"flex"}>
        <IconButton
          onClick={() => {
            state.tableModal = false;
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4">Invoice</Typography>
      </Box>
      <Box marginX={1} marginTop={3}>
      <Typography>OrderId: {' '}</Typography>
      <Typography>Subtotal: {' '}</Typography>
      <Typography>VAT: {' '}</Typography>
      <Typography>Total: {' '}</Typography>
      </Box>
      <Box marginX={1} marginTop={4}>
        <TableContainer
          component={Paper}
          style={{ overflow: "scroll", height: 500 }}
        >
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nr</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="right">QTY</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Discount</StyledTableCell>
                <StyledTableCell align="right">VAT</StyledTableCell>
                <StyledTableCell align="right">Total</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data ? (
                data.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.productName}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {row.productPrice.toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.productVAT}%
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {(
                        row.productPrice -
                        (row.productVAT / 100) * row.productPrice
                      ).toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        onClick={() => {}}
                        startIcon={<AddShoppingCartIcon />}
                        variant="contained"
                      >
                        Shto ne Shport
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} marginRight={1}>
        <Box
          border={"1px solid grey"}
          display={"flex"}
          flexDirection={"column"}
          width={200}
          gap={1}
          p={1}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography>Subtotal:</Typography>
            </Box>
            <Box>{"0.00"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography>Subtotal:</Typography>
            </Box>
            <Box>{"0.00"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography>Subtotal:</Typography>
            </Box>
            <Box>{"0.00"}</Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default TableModal