import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { CustomersService } from '../../services/customers.service';
import { exportToCSV, exportToExcel } from '../../utils/export.util';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class CustomersComponent implements OnInit {

  rowData: any[] = [];
  private gridApi!: GridApi;

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Customer', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellRenderer: (p: { value: string }) =>
        `<span class="status paid">${p.value}</span>`
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

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe(data => {
      this.rowData = data;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.gridApi.setGridOption('quickFilterText', value);
  }

  onDownload() {
    exportToCSV(this.rowData, 'customers');
  }

  onExport() {
    exportToExcel(this.rowData, 'customers');
  }
}
