import React from 'react'
import { defaultCurrentyFormatter } from '../../utils/currency';

interface InvoiceFooterProps {
    total: number;
    formatter?: Intl.NumberFormat
}

export const InvoiceFooter: React.FC<InvoiceFooterProps> = ({total, formatter}) => {
    formatter ||= defaultCurrentyFormatter;
    return (
        <footer className='bg-gray-900 text-white flex justify-end p-5 mt-3 rounded-lg'>
            <div className='flex gap-3 items-center'>
                <h2 className='text-lg m-0'>Total: </h2>
                <p>{formatter?.format(total)}</p>
            </div>
        </footer>
    )
}
