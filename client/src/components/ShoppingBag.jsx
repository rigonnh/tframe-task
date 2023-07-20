import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../utils/store'
import CartItem from './CartItem'
import Checkout from './Checkout'

const ShoppingBag = () => {
    const snap = useSnapshot(state)
  return (
    <Box display={'flex'} marginTop={2} justifyContent={'space-between'}>
        <Box maxHeight={'calc(100vh - 200px)'} overflow={'auto'} p={3} paddingX={10}>
        {snap.shoppingListData.length > 0 ? snap.shoppingListData.map((item) => 
            { 
              return <CartItem title={item.productName} price={item.productPrice} amount={item.amount} id={item.id} key={item.id}/>}
        ) : <Box padding={2} border={'1px solid gray'} boxShadow={5}>
          <Typography variant='h4'>Nuk keni asnje produkt ne shport!</Typography></Box>}
        </Box>
        <Box>
            <Checkout />
        </Box>
    </Box>
  )
}

export default ShoppingBag