import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule, JsonPipe } from '@angular/common';
import * as CartSelectors from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  template: `
    <div class="result-container">
      <h3>Store State</h3>
      <div class="state-info">
        <div class="state-section">
          <h4>Cart Items</h4>
          <pre>{{ cartItems$ | async | json }}</pre>
        </div>
        <div class="state-section">
          <h4>Cart Total</h4>
          <p>{{ cartTotal$ | async | currency }}</p>
        </div>
        <div class="state-section">
          <h4>Item Count</h4>
          <p>{{ cartItemCount$ | async }}</p>
        </div>
        <div class="state-section">
          <h4>Loading State</h4>
          <p>{{ cartLoading$ | async }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .result-container {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    h3 {
      margin-top: 0;
      color: #333;
      border-bottom: 2px solid #dee2e6;
      padding-bottom: 10px;
    }
    .state-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    .state-section {
      background: white;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h4 {
      margin-top: 0;
      color: #666;
      font-size: 0.9em;
      text-transform: uppercase;
    }
    pre {
      background: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.9em;
    }
    p {
      margin: 0;
      font-size: 1.2em;
      color: #333;
    }
  `]
})
export class ResultComponent {
  cartItems$: Observable<any>;
  cartTotal$: Observable<number>;
  cartItemCount$: Observable<number>;
  cartLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartItemCount);
    this.cartLoading$ = this.store.select(CartSelectors.selectCartLoading);
  }
} 