import { CartService } from './../../../auth/cart/cart.service';
import { ProductService } from './../../../auth/product/product.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IProduct } from '../../product.model';
import { ShopTableDataSource } from './shop-table-datasource';

@Component({
  selector: 'app-shop-table',
  templateUrl: './shop-table.component.html',
  styleUrls: ['./shop-table.component.css']
})
export class ShopTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IProduct>;
  dataSource!: ShopTableDataSource;

  displayedColumns = ['name', 'price', 'qntBuy', 'action'];

  constructor(
    private productService: ProductService,
    private cartService: CartService
    ) {}

  ngAfterViewInit(): void {
    this.loadData()  
  }  

  loadData(): void {   
    this.productService.read().subscribe({
      next: (products) => {
        this.dataSource = new ShopTableDataSource(products, this.cartService);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;        
      },
      error: (erro) => {
        this.productService.handleError("Nao foi possivel carregar os produtos", erro);
      },
      complete: () =>  {    
        this.removeInvalidProducts()
      }
    })
  }

  // Remove do datasource os produtos que por ventura nao tenham 
  // preço cadastrado, ou que não tenham quantidade disponivel no estoque
  removeInvalidProducts(): void {    
    this.dataSource.data.forEach((el, index) => {
      if (el.qnt <= 0 || el.price <= 0) {
        this.dataSource.data.splice(index, 1)
      }
    })
  }

  plusQnt(row: any):void{
    let newQnt = row.qntBuy + 1
    
    // se for possivel adicionar 
    // baseado nos produtos em estoque
    if(newQnt <= row.qnt) {
      row.qntBuy = newQnt
      this.dataSource.updateItem(row)
    } else {
      this.cartService.showMessage("Nao foi possivel adicionar mais produtos (indisponibilidade em estoque)")
    }    
  }

  minusQnt(row: any):void{
    let newQnt = row.qntBuy - 1

    if(newQnt >= 0)  {
      row.qntBuy = newQnt
      this.dataSource.updateItem(row)
    }
    if(row.qntBuy == 0)  {
      this.cartService.removeCart(row)
    }
  }

  addShopping(row: any):void{
    if(row.qntBuy > 0)  {
      this.cartService.addCart(row);
    } else {
      this.cartService.showMessage("Por gentileza selecionar a quantidade de produtos")
    }
  }



  
}
