import { proxy } from "valtio";
const dummy = {
    
}
const state = proxy({
    productData: [],
    productDataFiltered: [],
    shoppingListNumber: 0,
    shoppingListData: [],
    tableModal: false,
})

export default state;