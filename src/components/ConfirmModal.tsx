import React from 'react'

interface ConfirmModalProps {
    onConfirm: () => void
    onCancel: () => void
    header: string
}

const ConfirmModal:React.FC<ConfirmModalProps> = ({header, onConfirm, onCancel}) => {
  return (
    <div>
        <div className='flex gap-2'>
            <h3>{header}</h3>
            <div className='flex gap-2'>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal