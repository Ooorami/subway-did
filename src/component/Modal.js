import React from 'react';
import './Modal.css';

function Modal(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <div></div>
        <button id="modalCloseBtn" onClick={closeModal}>
        </button>
        <div className='upBox'>카운터에서 제품을 받으세요.</div>
        <div className='downBox'>{props.orderNumber}</div>
      </div>
    </div>
  );
}

export { Modal };
