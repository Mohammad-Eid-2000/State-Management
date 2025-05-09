import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer } from './app/store/cart/cart.reducer';
import { CartEffects } from './app/store/cart/cart.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ cart: cartReducer }),
    provideEffects([CartEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
}).catch(err => console.error(err));
