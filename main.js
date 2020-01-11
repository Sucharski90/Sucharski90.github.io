let ant = document.querySelector('#ant');
let pat = document.querySelector('#pat');
let modal = document.querySelector('.modal');
let modalPatt = document.querySelector('.modalPatt');
let closeBtn = document.querySelector('.closeBtn');
let closeBtnPatt = document.querySelector('#closeBtnPatt');



  function openModal() {
    modal.style.display = 'block';
  };

  function openPat() {
    modalPatt.style.display = 'block';
  };

  function closeModal() {
    modal.style.display = 'none';
      };

  function closePatt() {
    modalPatt.style.display = 'none';
      };
  
  function outsideClick(e) {
    if(e.target == modal || e.target == modalPatt) {
    modal.style.display = 'none';
    modalPatt.style.display = 'none';
    }
  };

  ant.addEventListener('click', openModal);
  pat.addEventListener('click', openPat);
  closeBtn.addEventListener('click', closeModal);
  closeBtnPatt.addEventListener('click', closePatt);
  window.addEventListener('click', outsideClick);

 
