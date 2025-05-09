import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart.state';
import * as CartActions from './cart.actions';

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find(item => item.productId === product.id);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        ...state,
        items: [...state.items, {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }]
      };
    }
  }),
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.productId !== productId)
  })),
  on(CartActions.updateQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    )
  })),
  on(CartActions.loadCart, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false
  })),
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
); 