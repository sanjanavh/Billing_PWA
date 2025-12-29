import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  totalRevenue = 0;
  pendingInvoices = 0;
  totalCustomers = 0;
  totalInvoices = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(res => {
      console.log('API DATA RECEIVED:', res);

      this.totalRevenue = Number(res.total_revenue);
      this.pendingInvoices = Number(res.pending_invoices);
      this.totalCustomers = Number(res.total_customers);
      this.totalInvoices = Number(res.total_invoices);
    });
  }
}
