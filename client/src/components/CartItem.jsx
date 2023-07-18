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