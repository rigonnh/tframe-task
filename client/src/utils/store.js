import { proxy } from "valtio";
const dummy = {
    
}
const state = proxy({
    productData: [],
    productDataFiltered: [],
    shoppingListNumber: 0,
    shoppingListData: [],
})

export default state;