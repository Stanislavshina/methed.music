'use strict';

document.addEventListener('DOMContentLoaded', () => {
  
  const playBtn = document.querySelector('.player__icon_play'),
  //getElement позволяет получить элементы динамически без перезагрузки страницы
        tracksCard = document.getElementsByClassName('track'), 
        audio = new Audio;

  const playMusic = event => {
    audio.src = event.currentTarget.dataset.track;
    audio.play()
  }

  for(let i = 0; i<tracksCard.length; i++){
    tracksCard[i].addEventListener('click', playMusic)
  }

  playBtn.addEventListener('click', e => {
    playMusic(e.currentTarget)
  });


})