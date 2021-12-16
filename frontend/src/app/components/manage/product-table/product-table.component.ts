import { IProduct } from '../../product.model'
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductTableDataSource } from './product-table-datasource';
import { ProductService } from '../../../auth/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IProduct>;
  dataSource!: ProductTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price', 'qnt', 'action'];

  constructor(private productService: ProductService, private router: Router) {}

  ngAfterViewInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.productService.read().subscribe({
      next: (products) => {
        this.dataSource = new ProductTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: (erro) => {
        this.productService.handleError("Nao foi possivel carregar os produtos", erro);
      }
    })
  }

  delete(id: number): void {    
    this.productService.delete(id).subscribe(
    {
       complete: () => {
        this.productService.showMessage("Produto deletado!")
        this.loadData()
      },
       error: () => {
         this.productService.showMessage("Erro: Não foi possível deletar o produto")
         this.loadData()
      }
     }
    )
  }

  edit(id: number):void{
    this.router.navigate([`/products/update/${id}`]);
  }

}
