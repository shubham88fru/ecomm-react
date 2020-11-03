import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

const selectUser = (state) => state.user;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (acccumulatedQuantity, cartItem) =>
        acccumulatedQuantity + cartItem.quantity,
      0
    )
);
