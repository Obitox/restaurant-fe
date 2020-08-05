export const setAuthState = auth => {
  try {
    localStorage.setItem('state.auth', JSON.stringify((auth || {})));
  } catch (err) { return undefined; }
}

export const getAuthState = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('state.auth')) || undefined;

    return auth;
  } catch (err) { return undefined; }
}

export const getCartState = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('state.cart')) || undefined; 
    return cart;
  } catch (err) { return undefined; }
}

export const setCartState = cart => {
  try {
    localStorage.setItem('state.cart', JSON.stringify((cart || {items: [], meals: []})));
  } catch (err) { return undefined; }
}