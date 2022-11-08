'use strict';

document.addEventListener('DOMContentLoaded', () => {
  
  const pauseBtn = document.querySelector('.player__pause'),
  //getElement позволяет получить элементы динамически без перезагрузки страницы
        tracksCard = document.getElementsByClassName('track'),
        stopBtn = document.querySelector('.player__icon_stop'),
        player = document.querySelector('.player'),
        audio = new Audio;

  const playMusic = event => {
    const track = event.currentTarget
    audio.src = track.dataset.track;
    audio.play();
    pauseBtn.classList.remove('player__icon_play');
    player.classList.add('player_active');
    for(let i = 0; i<tracksCard.length; i++){
      tracksCard[i].classList.remove('track_active');
    }
    track.classList.add('track_active');
  }

  for(let i = 0; i<tracksCard.length; i++){
    tracksCard[i].addEventListener('click', playMusic)
  }

  pauseBtn.addEventListener('click', () => {
    if (audio.paused){
      audio.play();
      pauseBtn.classList.remove('player__icon_play');
      pauseBtn.classList.add('player__icon_pause');
    } else {
      audio.pause();
      pauseBtn.classList.add('player__icon_play');
      pauseBtn.classList.remove('player__icon_pause');
    }
  });


  stopBtn.addEventListener('click', ()=> {
    if(audio.currentTime !== 0){
      audio.pause();
      audio.currentTime = 0;
      player.classList.remove('player_active');
    } else  if(audio.paused){
      audio.currentTime = 0;
      audio.src = '';
      pauseBtn.classList.remove('player__icon_play');
      pauseBtn.classList.add('player__icon_pause');
    }
  })


})