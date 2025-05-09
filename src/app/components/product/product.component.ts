import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../store/cart/cart.state';
import * as CartActions from '../../store/cart/cart.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-list">
      <div *ngFor="let product of products" class="product-item">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price | currency }}</p>
        <button (click)="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  `,
  styles: [`
    .product-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .product-item {
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 8px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class ProductComponent {
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 20.99 },
    { id: 3, name: 'Product 3', price: 30.99 },
    { id: 4, name: 'Product 4', price: 40.99 }
  ];

  constructor(private store: Store) {}

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addToCart({ product }));
  }
} 