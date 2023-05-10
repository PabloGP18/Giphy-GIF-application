import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

function Modal({ children, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="btn-modal" onClick={onClose}>
          🅧
        </button>
        {children}
      </div>
    </div>
  )
}

// this is to make it render outside the root (just to prevent z-index problems)
// check index.html in public folder
export default function ModalPortal({ children, onClose }) {
  return ReactDOM.createPortal(
    <Modal onClose={onClose}>{children}</Modal>,
    document.getElementById('root')
  )
}
