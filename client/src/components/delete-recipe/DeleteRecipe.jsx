import React from 'react';
import ReactDOM from 'react-dom';
import styles from './DeleteRecipe.module.css';

export default function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Confirm Deletion</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>Are you sure you want to delete this recipe?</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
