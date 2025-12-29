import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { Tickets } from './pages/tickets/tickets';
import { BillingComponent } from './pages/billing/billing.component';


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'tickets', component: Tickets },
  { path: 'billing', component: BillingComponent },
];
