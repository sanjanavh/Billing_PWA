import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { exportToCSV, exportToExcel } from '../../utils/export.util';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css']
})
export class BillingComponent implements OnInit {

  activeTab: 'invoices' | 'settlements' | 'ledger' = 'invoices';

  rowData: any[] = [];
  private gridApi!: GridApi;

  colDefs: ColDef[] = [
    { field: 'invoice_number', headerName: 'Invoice Number', flex: 1.4 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'amount', headerName: 'Inv Amount', flex: 1 },
    { field: 'due', headerName: 'Due Amount', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellRenderer: (p: { value: string }) =>
        `<span class="status ${p.value.toLowerCase()}">${p.value}</span>`
    },
    {
      headerName: 'Action',
      flex: 1,
      cellRenderer: () => `Download`
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  switchTab(tab: 'invoices' | 'settlements' | 'ledger') {
    this.activeTab = tab;

    if (tab === 'invoices') this.loadInvoices();
    if (tab === 'settlements') this.loadSettlements();
    if (tab === 'ledger') this.loadLedger();
  }

  loadInvoices() {
    this.http.get<any[]>('http://localhost:3000/api/billing/invoices')
      .subscribe(data => this.rowData = data);
  }

  loadSettlements() {
    this.http.get<any[]>('http://localhost:3000/api/billing/settlements')
      .subscribe(data => this.rowData = data);
  }

  loadLedger() {
    this.http.get<any[]>('http://localhost:3000/api/billing/ledger')
      .subscribe(data => this.rowData = data);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.gridApi.setGridOption('quickFilterText', value);
  }

  onDownload() {
    exportToCSV(this.rowData, 'billing');
  }

  onExport() {
    exportToExcel(this.rowData, 'billing');
  }
}
