"use client"

import React from 'react'
import { deleteTransactionById } from '../../lib/actions'
import toast from 'react-hot-toast'

const TransactionDeleteButton = ({ children, record }) => {
    const handleDelete = async () => {
        await deleteTransactionById(record?.id).then(e => {
            return toast.success("Record successfully deleted")
        }).catch(e => {
            console.log({ e });
            return toast.error("Something went wrong")
        })
    }

    return (
        <button type='button' onClick={handleDelete}>
            {children}
        </button>
    )
}

export default TransactionDeleteButton