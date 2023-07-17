import React, { useEffect } from 'react'
import TableComponent from './Table'
import Header from './Header'
import axios from 'axios'
import { BASE_URL } from '../utils/consts'
import state from '../utils/store'
import { useSnapshot } from 'valtio'

const url = `${BASE_URL}/api/product`

const Home = () => {
    const snap = useSnapshot(state)
    useEffect(() => {
        axios.get(`${url}/get`).then(
            res => {
                state.productData = res.data;
                state.productDataFiltered = res.data
            }
        ).catch(
            err => alert(err)
        )
    }, [])
  return (
    <div>
    <Header />
      
      <div>
        
        <TableComponent data={snap.productDataFiltered}/>
      </div>
    
    </div>
  )
}

export default Home