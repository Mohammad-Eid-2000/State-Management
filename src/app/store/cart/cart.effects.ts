import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  loadCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() => this.cartService.getCartItems().pipe(
        map(items => CartActions.loadCartSuccess({ items })),
        catchError(error => of(CartActions.loadCartFailure({ error: error.message })))
      ))
    )
  );
} 