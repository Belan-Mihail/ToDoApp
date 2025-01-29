import React from 'react'

interface ConfirmModalProps {
    onConfirm: () => void
    onCancel: () => void
    header: string
}

const ConfirmModal:React.FC<ConfirmModalProps> = ({header, onConfirm, onCancel}) => {
  return (
    <div>
        <div className='flex gap-2 items-center'>
            <h3 className='text-delete-button'>{header}</h3>
            <div className='flex gap-2'>
                <button className='border-primary-light border-2 rounded-2xl p-2 bg-confirm-button hover:bg-confirm-button-hover' onClick={onConfirm}>Yes</button>
                <button className='border-primary-light border-2 rounded-2xl p-2 bg-delete-button hover:bg-delete-button-hover' onClick={onCancel}>No</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal