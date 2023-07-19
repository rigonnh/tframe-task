import { proxy } from "valtio";
const dummy = {
    
}
const state = proxy({
    productData: [],
    productDataFiltered: [],
    shoppingListNumber: 0,
    shoppingListData: [],
    tableModal: false,
    subtotal:0,
    vat:0,
    total:0,
})

export default state;