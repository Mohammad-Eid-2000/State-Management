import { Component } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { ResultComponent } from './components/result/result.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CartComponent, ProductComponent, ResultComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Shopping Cart Demo</h1>
      </header>
      <main>
        <section class="products">
          <h2>Products</h2>
          <app-product></app-product>
        </section>
        <section class="cart">
          <h2>Shopping Cart</h2>
          <app-cart></app-cart>
        </section>
      </main>
      <footer>
        <app-result></app-result>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    main {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }
    section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
    }
    footer {
      margin-top: 30px;
      border-top: 1px solid #dee2e6;
      padding-top: 20px;
    }
  `]
})
export class AppComponent {
  title = 'redux';
}
