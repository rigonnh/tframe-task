import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import { EURO_SYMBOL } from '../utils/consts';

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

const InvoiceTable = ({ data }) => {
    const [vat, setVat] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    useEffect(() => {

        const calculatedVat = data.reduce((acc, item) => {
            const itemVAT = (item.productPrice -(item.productPrice / ((item.productVAT / 100)+1))) * item.amount;
            return (acc + itemVAT);
          }, 0);
      
          
          setVat(calculatedVat);

          const calculatedSubtotal = data.reduce((acc, item) => {
            const itemSubtotal = (item.productPrice / ((item.productVAT / 100)+1)) * item.amount;
            return acc + itemSubtotal;
          }, 0);
      
          
          setSubtotal(calculatedSubtotal);

          const calculatedTotal = data.reduce((acc, item) => {
            const itemTotal = item.productPrice * item.amount;
            return acc + itemTotal;
          }, 0);
      
          
          setTotal(calculatedTotal);

    }, [data]);
  return (
    <div>
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
                      {row.amount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {(row.productPrice / (row.productVAT / 100 + 1)).toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {0}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.productVAT}{'%'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {(row.productPrice / ((row.productVAT / 100)+1) * row.amount).toFixed(2)}{' + '}
                      {((row.productPrice -(row.productPrice / ((row.productVAT / 100)+1))) * row.amount).toFixed(2)}
                      {' = '}{(row.productPrice * row.amount). toFixed(2)}
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
            <Box>{subtotal.toFixed(2)}{EURO_SYMBOL}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography>VAT:</Typography>
            </Box>
            <Box>{vat.toFixed(2)}{EURO_SYMBOL}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography>Total:</Typography>
            </Box>
            <Box>{total.toFixed(2)}{EURO_SYMBOL}</Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default InvoiceTable