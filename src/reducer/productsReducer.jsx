export const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL_PRODUCTS':
            return {
                ...state,
                allProducts: action.payload
            };
        case 'SET_PRODUCTS_SELECTED':
            return {
                ...state,
                productsSelected: action.payload
            };
        case 'SET_PRODUCTS_FAVORITES':
            return {
                ...state,
                productsFavorites: action.payload
            };
        case 'SET_TOTAL_ITEMS':
            return {
                ...state,
                totalItems: action.payload
            };

        default:
            return state;
    }
};