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



const TableComponent = ({ data }) => {
  const snap = useSnapshot(state)
  const handleAddtoCart = (row) => {
  const isPrev = state.shoppingListData.find((item) => item.id === row.id)
  
  if(isPrev){
    state.shoppingListData.map((item) => item.id === row.id ? item.amount += 1 : item)
  }
  
  else {
    state.shoppingListData= [...state.shoppingListData, { ...row, amount: 1 }]
  }
  
  }

  return (
    <Box  marginX={1} marginTop={4}>
        <TableContainer component={Paper} style={{overflow: 'scroll', height: '100%', maxHeight: 'calc(100vh - 200px)'}}>
          <Table  sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nr</StyledTableCell>
                <StyledTableCell align="left">Produkti</StyledTableCell>
                <StyledTableCell align="right">Cmimi</StyledTableCell>
                <StyledTableCell align="right">Zbritje</StyledTableCell>
                <StyledTableCell align="right">Taksa</StyledTableCell>
                <StyledTableCell align="right">CmimiPaTax</StyledTableCell>
                <StyledTableCell align="right">Veprimet</StyledTableCell>
                               
              </TableRow>
            </TableHead>
            <TableBody>
              {data? (
                data.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {index+1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.productName}
                    </StyledTableCell>
                    
                    <StyledTableCell align="right">
                      {row.productPrice.toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.discount.toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.productVAT}%
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {((row.productPrice - row.discount) / ((row.productVAT / 100)+1)).toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      
                      <Button onClick={() => {
                        state.shoppingListNumber += 1
                        handleAddtoCart(row)
                      }} startIcon={<AddShoppingCartIcon />} variant='contained'>
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
  )
}

export default TableComponent
