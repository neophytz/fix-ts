export interface Product {
    title: string;
    price: number;
    id: number
}

export interface InvoiceFormListItem {
    product: Product | null;
    quantity: number;
}
