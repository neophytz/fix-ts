import React, { useEffect, useState } from 'react'
import { Product } from '../../types';
import PRODUCT_LIST from '../../data/products.json';

interface FormListItemProps {
  updateInvoice(index: number, product: Product, quantity?: number): void;
  removeItem(index: number): void;
  index: number;
}

interface ProductState {
  productId: null | number,
  quantity: number
}

export const FormListItem: React.FC<FormListItemProps> = ({ index, updateInvoice, removeItem }) => {
  const [product, setProduct] = useState<ProductState>({
    productId: null,
    quantity: 0
  });


  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isNaN(parseInt(e.target.value))) return;

    setProduct(item => ({
      productId: parseInt(e.target.value),
      quantity: item.quantity
    }))
  }

  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) return;

    setProduct(item => ({
      productId: item.productId,
      quantity: value
    }))
  }

  useEffect(() => {
    const item = PRODUCT_LIST.find(el => el.id === product.productId as number);
    updateInvoice(index, item!, product.quantity);
  }, [
    product.productId,
    product.quantity,
    updateInvoice,
    index
  ]);

  return (
    <div className='flex gap-3'>
      <select onChange={handleProductSelect} className='w-96 p-3 px-3 border rounded-lg border-gray-200 hover:border-gray-300'>
        {
          PRODUCT_LIST.map((product, index) => (
            <React.Fragment key={index}>
              <option value={product.id}>{product.title}</option>
            </React.Fragment>
          ))
        }
      </select>
      <input
        onChange={updateQuantity}
        type="number" min={0}
        max={10}
        className='w-18 p-3 px-4 border rounded-lg border-gray-200 hover:border-gray-300'
      />
      <button onClick={() => removeItem(index)} type="button" className="flex flex-shrink-0 justify-center items-center gap-2 h-[2.875rem] w-[2.875rem] text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600">
        DEL
      </button>
    </div>
  )
}
