import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';
import { EventStoreComponent } from './event-store/event-store.component'; // change something here 
import { ContactComponent } from './pages/contact/contact.component';
import { CartDetailComponent } from './event-store/cart-detail/cart-detail.component';
import { CheckoutComponent } from './event-store/checkout/checkout.component';
import { StoreFirstGuard } from './guards/storeFirst.guards';

const routes: Routes = [
 {path: 'home', component: HomeComponent, data: {title: 'Home'}},
 {path: 'about', component: AboutComponent, data: {title: 'About'}},
 {path: 'products', component: ProductsComponent, data: {title: 'Products'}},
 {path: 'services', component: ServicesComponent, data: {title: 'Services'}},
 {path: 'event-list', component: EventStoreComponent, data: { title: 'Event List'}, canActivate: [StoreFirstGuard]}, // change the name 
 {path: 'cart', component: CartDetailComponent, data: { title: 'Shopping Cart'}, canActivate: [StoreFirstGuard]},
 {path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout'}, canActivate: [StoreFirstGuard]},
 {path: 'contact', component: ContactComponent, data: {title: 'Contact'}},
 {path: '', redirectTo: '/home', pathMatch: 'full'},
 {path:'**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StoreFirstGuard]
})
export class AppRoutingModule { }
