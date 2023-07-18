import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { EURO_SYMBOL } from '../utils/consts'
import state from '../utils/store'

const CartItem = ({title, price, amount, id}) => {
  return (
    <Box display={'flex'} flexDirection={'column'} width={300} p={2}>
        <Typography variant='h4'>{title}</Typography>
        <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='h6'>{price.toFixed(2)}{EURO_SYMBOL}</Typography>
            <Typography variant='h6'>{(price * amount).toFixed(2)}{EURO_SYMBOL}</Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
            <Button onClick={() => {
             state.shoppingListData = state.shoppingListData.map(item => {
              if (item.id === id) {
                state.shoppingListNumber -= 1;
                if (item.amount <= 1) {
                  return null; 
                } else {
                  return { ...item, amount: item.amount - 1 };
                }
              } else {
                return item;
              }
            });
          
            // Remove any null elements (items with amount less than 1)
            state.shoppingListData = state.shoppingListData.filter(item => item !== null);
          
            }} variant='contained'>-</Button>
            <Typography variant='h6'>{amount}</Typography>
            <Button onClick={() => {
              state.shoppingListNumber += 1
              state.shoppingListData.map((item) => {
              
                return item.id === id ? item.amount += 1 : item
              })
            }} variant='contained'>+</Button>
        </Box>
        <Box marginY={2}>
        <Divider sx={{backgroundColor: 'black'}} />
        </Box>
    </Box>
  )
}

export default CartItem