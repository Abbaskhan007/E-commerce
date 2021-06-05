
export const AddToCart =  (item) => {
    console.log('action --------------===================-----------------',item);
    return {
        type: 'addCart',
        payload: item
    }
}

export const AddToAlter =  (item) => {
    console.log('action --------------===================-----------------',item);
    return {
        type: 'addAlter',
        payload: item
    }
}

export const AddToCartoon =  (item) => {
    console.log('action --------------===================-----------------',item);
    return {
        type: 'addCartoon',
        payload: item
    }
}

export const subFromCart = (item) => {
    return {
        type: 'subCart',
        payload: item
    }
}

export const subFromAlter = (item) => {
    return {
        type: 'subAlter',
        payload: item
    }
}

export const subFromCartoon = (item) => {
    return {
        type: 'subCartoon',
        payload: item
    }
}

export const deleteFromCart = (item) => {
    return {
        type: 'deleteCart',
        payload: item
    }
}

export const emptyCart = () => {
    return{
        type: 'emptyCart'
    }
}

export const login = (item) => {
    return{
        type: 'login',
        payload: item
    }
}

export const logout = () => {
    return {
      type: "emptyCart",
    };
}

export const addOffer = (item) => {
    return{
        type: 'addOffer',
        payload: item
    }
}
