import React, { useState } from 'react';
import './App.css';

function App() {
    /*
  const [isOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(isOpen); 
  */
  return (
    <div className="App">
      <h1>안녕하세요!</h1>
      <p>내용내용내용</p>
      <button onClick={openModal}>버튼 열기</button>
      <div class="modal-wrapper">
        <div class="modal">
          <div class="modal-title">안녕하세요</div>
          <p>모달 내용은 어쩌고 저쩌고..</p>
          <div class="close-wrapper">
            <button onClick={(closeModal)}>닫기</button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
