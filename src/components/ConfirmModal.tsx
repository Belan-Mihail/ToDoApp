import React from 'react'

interface ConfirmModalProps {
    onConfirm: () => void
    onCancel: () => void
    header: string
}

const ConfirmModal:React.FC<ConfirmModalProps> = ({header, onConfirm, onCancel}) => {
  return (
    <div>
        <div className='flex flex-col gap-2 items-center'>
            <h3 className='text-delete-button'>{header}</h3>
            <div className='flex gap-2'>
                <button className='w-[8rem] border-primary-light border-2 rounded-2xl bg-delete-button' onClick={onConfirm}>Confirm</button>
                <button className='w-[8rem] border-primary-light border-2 rounded-2xl bg-edit-button' onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal