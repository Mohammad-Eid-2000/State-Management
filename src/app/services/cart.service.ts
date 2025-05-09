import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../store/cart/cart.state';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Simulated API call to get cart items
  getCartItems(): Observable<CartItem[]> {
    // In a real application, this would be an HTTP call
    return of([
      {
        productId: 1,
        name: 'Product 1',
        price: 10.99,
        quantity: 1
      },
      {
        productId: 2,
        name: 'Product 2',
        price: 20.99,
        quantity: 2
      }
    ]);
  }
} 