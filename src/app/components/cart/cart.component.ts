import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../store/cart/cart.state';
import * as CartActions from '../../store/cart/cart.actions';
import * as CartSelectors from '../../store/cart/cart.selectors';
import { CommonModule, CurrencyPipe, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, AsyncPipe],
  template: `
    <div *ngIf="(cartLoading$ | async) === false; else loading">
      <div *ngIf="(cartItems$ | async)?.length; else emptyCart">
        <div *ngFor="let item of (cartItems$ | async)">
          {{ item.name }} - {{ item.price | currency }} x {{ item.quantity }}
          <button (click)="updateItemQuantity(item.productId, item.quantity + 1)">+</button>
          <button (click)="updateItemQuantity(item.productId, item.quantity - 1)" [disabled]="item.quantity <= 1">-</button>
          <button (click)="removeItem(item.productId)">Remove</button>
        </div>
        <div>Total: {{ cartTotal$ | async | currency }}</div>
      </div>
      <ng-template #emptyCart>Your cart is empty</ng-template>
    </div>
    <ng-template #loading>Loading cart...</ng-template>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }
    button {
      margin: 0 5px;
      padding: 5px 10px;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  cartLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
    this.cartLoading$ = this.store.select(CartSelectors.selectCartLoading);
  }

  ngOnInit() {
    this.store.dispatch(CartActions.loadCart());
  }

  removeItem(productId: number) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  updateItemQuantity(productId: number, quantity: number) {
    this.store.dispatch(CartActions.updateQuantity({ productId, quantity }));
  }
} 