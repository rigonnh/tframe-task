import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material';
import state from '../utils/store';
import { useSnapshot } from 'valtio';
import CloseIcon from '@mui/icons-material/Close';
import { BASE_URL, EURO_SYMBOL } from '../utils/consts';
import InvoiceTable from './InvoiceTable';
import axios from 'axios'


const TableModal = ({data}) => {
    const snap = useSnapshot(state)
    const [invoiceList, setInvoiceList] = useState([]);
    
    // useEffect(() => {
    //   let currentInvoice = [];
    //   let currentTotal = 0;
    //   setInvoiceList([])
    //   snap.shoppingListData.forEach((item) => {
    //     if (item.productPrice > 500) {
    //       // Create a new invoice with the single expensive product
    //       if (currentInvoice.length > 0) {
    //         setInvoiceList((prevInvoiceList) => [...prevInvoiceList, currentInvoice]);
    //         currentInvoice = [];
    //         currentTotal = 0;
    //         console.log('Printed in single product and currentInvoice is not 0: CurrentInvoice: ' + currentInvoice )
    //         console.log('Printed in single product and currentInvoice is not 0: invoiceList: ' + invoiceList )
    //       }
  
    //       setInvoiceList((prevInvoiceList) => [...prevInvoiceList, [item]]);
    //     } else {
    //       const itemTotal = (item.productPrice * item.amount)+ currentTotal;
  
    //       if (itemTotal > 500) {
    //         // Save the current invoice and reset
    //         setInvoiceList((prevInvoiceList) => [...prevInvoiceList, currentInvoice]);
    //         currentInvoice = [];
    //         currentTotal = 0;
    //         console.log('third')
    //       }
  
    //       currentTotal += item.productPrice;
    //       currentInvoice.push(item);
    //       console.log('first')
    //     }
    //   });
  
    //   // Add the last invoice if there are any remaining items
    //   if (currentInvoice.length > 0) {
    //     setInvoiceList((prevInvoiceList) => [...prevInvoiceList, currentInvoice]);
    //     console.log('second')
    //   }
    // }, [data]);
    
  
  return (
    <Dialog
      fullScreen
      open={snap.tableModal}
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
      <Typography>OrderId: {' '}{'1'}</Typography>
      <Typography>Subtotal: {' '}{snap.subtotal.toFixed(2)}{EURO_SYMBOL}</Typography>
      <Typography>VAT: {' '}{snap.vat.toFixed(2)}{EURO_SYMBOL}</Typography>
      <Typography>Total: {' '}{snap.total.toFixed(2)}{EURO_SYMBOL}</Typography>
      </Box>
      { data?.map((item, index) => {
        
        return <InvoiceTable data={item} key={index}/>
      })}
    </Dialog>
  );
}

export default TableModal