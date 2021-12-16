import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ICart } from '../../cart.model';
import { CartService } from 'src/app/auth/cart/cart.service';

export class ShopTableDataSource extends DataSource<ICart> {
  
  //data: IProduct[];
  data: ICart[]; 
  //   name: "teste"
  //   price: 0
  //   qnt: 1
  //   buyQnt: 6
  // }


  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private carts: ICart[], private cartService: CartService) {
    super();
    this.data = carts;

    this.cleanCart()
  }

  cleanCart():void {
    this.data.forEach((el) => {
      el['qntBuy'] = 0
    })
  }

  connect(): Observable<ICart[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getPagedData(data: ICart[]): ICart[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: ICart[]): ICart[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'price': return compare(+a.price!, +b.price!, isAsc);
        case 'qntBuy': return compare(+a.qntBuy!, +b.qntBuy!, isAsc);
        default: return 0;
      }
    });
  }

  updateItem(cart: ICart): void {
    let item = this.getItem(cart)
    if(item) {
      item = cart
    }
  }

  getItem(cart: ICart): any {
    return this.data.find(el => el.id == cart.id)
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
