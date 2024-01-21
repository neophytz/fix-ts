import React, { useEffect, useState } from 'react'
import { InvoiceFormListItem, Product } from '../../types';
import { InvoiceFooter } from './Footer';
import { FormListItem } from './FormListItem';


export const Invoice = () => {
    const [invoiceTotal, setInvoiceTotal] = useState(0);
    const [formItemsList, setFormItemsList] = useState<InvoiceFormListItem[]>([]);

    useEffect(() => {
        // console.log("here?")
        let total = 0;
        formItemsList.forEach(el => {
            if (el.product) {
                total += el.product?.price * el.quantity;
            }
        })
        setInvoiceTotal(total);
    }, [formItemsList])

    const addItem = () => {
        setFormItemsList(items => [...items, { product: null, quantity: 0 }])
    }

    const updateInvoice = (index: number, product: Product, quantity: number = 0) => {
        if (quantity < 0 || index < 0 || index >= formItemsList.length) {
            alert("invalid args");
            return;
        }
        setFormItemsList(listState => {
            listState[index] = { product, quantity }
            return listState;
        });
    }

    const removeItem = (index: number) => {
        const updatedList = [...formItemsList];
        updatedList.splice(index, 1);
        setFormItemsList(updatedList);
        // console.log(updatedList);
    }


    return (
        <section className='container mx-auto my-10 p-10 rounded outline outline-1 outline-gray-200 bg-gray-50'>
            {
                formItemsList.map((_, index) => (
                    <div key={index} className='mb-3'>
                        <FormListItem
                            index={index}
                            removeItem={removeItem}
                            updateInvoice={updateInvoice}
                        />
                    </div>
                ))
            }
            <div className='flex justify-end'>
                <button onClick={addItem} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Add item
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="2" viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path></svg>
                </button>
            </div>
            <InvoiceFooter total={invoiceTotal} />
        </section>
    )
}
