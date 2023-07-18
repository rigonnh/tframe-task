import { Box } from '@mui/material'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../utils/store'
import CartItem from './CartItem'
import Checkout from './Checkout'

const ShoppingBag = () => {
    const snap = useSnapshot(state)
  return (
    <Box display={'flex'} marginTop={2} justifyContent={'space-between'}>
        <Box maxHeight={'calc(100vh - 200px)'} overflow={'scroll'} p={3} paddingX={10}>
        {snap.shoppingListData.map((item) => 
            <CartItem title={item.productName} price={item.productPrice} amount={item.amount} id={item.id} key={item.id}/>
        )}
        </Box>
        <Box>
            <Checkout />
        </Box>
    </Box>
  )
}

export default ShoppingBag