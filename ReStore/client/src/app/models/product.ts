export interface Product{
    id: number;
    name:string;
    description:string;
    price:number;
    pictureUrl:string;
    brand:string;
    type?:string;
    quantityInStock?: number;
}