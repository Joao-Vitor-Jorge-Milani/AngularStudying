import {IProduct} from './product.model'

export interface ICart extends IProduct {
    qntBuy?: number;
}
