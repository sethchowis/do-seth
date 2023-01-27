import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const viewedSlice = createSlice({
    name: 'viewed products',
    initialState,
    reducers: {
        addProduct(state, action) {
            const {payload: product} = action;
            const newViewed = state.value.filter(p => p.id !== product.id);
            newViewed.unshift(product);
            state.value = newViewed;
        },
        clearProducts(state) {
            state.value = [];
        }
    },
});

export const { addProduct, clearProducts } = viewedSlice.actions;

export default viewedSlice.reducer;