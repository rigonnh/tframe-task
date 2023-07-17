import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import state from '../utils/store'

const Header = () => {
  return (
    <Box marginTop={2} display={'flex'} alignItems={'center'} gap={2} paddingX={1}>
        <Box flexGrow={1}>
            <TextField
             fullWidth
             variant='standard'
             label='Kerko Produktin'
             onChange={(e) => {
                state.productDataFiltered = state.productData.filter(item => item.productName.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
             }}
             />
        </Box>
        <Box >
            <Button variant='contained'>Produkt i ri</Button>
        </Box>
    </Box>
  )
}

export default Header