import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio';
import state from '../utils/store';
import { BASE_URL, EURO_SYMBOL } from '../utils/consts';
import axios from 'axios';
import TableModal from './TableModal';

const Checkout = () => {
    const snap = useSnapshot(state)
    const [vat, setVat] = useState(0)
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    
    useEffect(() => {

        const calculatedVat = snap.shoppingListData.reduce((acc, item) => {
            const itemVAT = ((item.productPrice - item.discount) -((item.productPrice - item.discount) / ((item.productVAT / 100)+1))) * item.amount;
            console.log(itemVAT)
            return (acc + itemVAT);
          }, 0);
      
          
          setVat(calculatedVat);

          const calculatedSubtotal = state.shoppingListData.reduce((acc, item) => {
            const itemSubtotal  = ((item.productPrice - item.discount) / ((item.productVAT / 100)+1)) * item.amount;
            return acc + itemSubtotal;
          }, 0);
      
          
          setSubtotal(calculatedSubtotal);

          const calculatedTotal = state.shoppingListData.reduce((acc, item) => {
            const itemTotal = (item.productPrice - item.discount) * item.amount;
            return acc + itemTotal;
          }, 0);
      
          
          setTotal(calculatedTotal);

    }, [snap.shoppingListData]);

    const handleSubmit = () => {
      if(snap.shoppingListData.length < 1){
        alert('Shporta juaj eshte e zbrazet')
        return
      }
        axios.post(`${BASE_URL}/api/product/generate`, state.shoppingListData).then(res => {
          state.invoiceData = res.data;
        }).catch(err => alert(err))
        state.subtotal = subtotal;
      state.total = total;
      state.vat = vat;
      state.tableModal = true;
    }
    const handleSubmitTableSort = () => {
      if(snap.shoppingListData.length < 1){
        alert('Shporta juaj eshte e zbrazet')
        return
      }
      axios.post(`${BASE_URL}/api/product/generate/sort`, state.shoppingListData).then(res => {
        state.invoiceData = res.data;
      }).catch(err => alert(err))
      state.subtotal = subtotal;
      state.total = total;
      state.vat = vat;
      state.tableModal = true;
  }
    const handleSubmitTable = () => {
      state.subtotal = subtotal;
      state.total = total;
      state.vat = vat;
      state.tableModal = true;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={300}
      marginX={10}
      marginY={2}
      gap={2}
      border={"1px solid grey"}
      padding={3}
      paddingX={4}
      borderRadius={2}
    >
      <Typography variant="h4" textAlign={"center"}>
        Fatura
      </Typography>
      <Divider sx={{ height: 3, backgroundColor: "black" }} />
      <Box display={"flex"} justifyContent={"space-between"} marginTop={1}>
        <Box>
          <Typography variant="button">NenTotali:</Typography>
        </Box>
        <Box>{subtotal.toFixed(2)}{EURO_SYMBOL}</Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="button">VAT:</Typography>
        </Box>
        <Box>{vat.toFixed(2)}{EURO_SYMBOL}</Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="button">Totali</Typography>
        </Box>
        <Box>{total.toFixed(2)}{EURO_SYMBOL}</Box>
      </Box>
      <Button onClick={handleSubmit} variant="contained">Faturo PDF</Button>
      <Button onClick={handleSubmitTable} variant="contained">Faturo TABLE</Button>
      <Button onClick={handleSubmitTableSort} variant="contained">Faturo TABLE (sort)</Button>
      {
        snap.tableModal ? <TableModal data={snap.invoiceData}/> : null
      }
    </Box>
  );
}

export default Checkout