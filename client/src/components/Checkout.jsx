import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio';
import state from '../utils/store';
import { EURO_SYMBOL } from '../utils/consts';

const Checkout = () => {
    const snap = useSnapshot(state)
    const [vat, setVat] = useState(0)
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {

        const calculatedVat = snap.shoppingListData.reduce((acc, item) => {
            const itemVAT = (item.productVAT / 100) * item.productPrice * item.amount;
            return (acc + itemVAT);
          }, 0);
      
          
          setVat(calculatedVat);

          const calculatedSubtotal = state.shoppingListData.reduce((acc, item) => {
            const itemSubtotal = (item.productPrice - (item.productVAT / 100) * item.productPrice) * item.amount;
            return acc + itemSubtotal;
          }, 0);
      
          
          setSubtotal(calculatedSubtotal);

          const calculatedTotal = state.shoppingListData.reduce((acc, item) => {
            const itemTotal = item.productPrice * item.amount;
            return acc + itemTotal;
          }, 0);
      
          
          setTotal(calculatedTotal);

    }, [snap.shoppingListData]);

    const handleSubmit = () => {
        
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
      <Button onClick={handleSubmit} variant="contained">Faturo</Button>
    </Box>
  );
}

export default Checkout