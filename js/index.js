'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const dataMusic = [
    {
      id: '1',
      artist: 'The weeknd',
      track: 'Save your tears',
      poster: 'img/photo_1.jpg',
      mp3: 'audio/The Weeknd - Save Your Tears.mp3',
    },
    {
      id: '2',
      artist: 'Imagine Dragons',
      track: 'Follow You',
      poster: 'img/photo_2.jpg',
      mp3: 'audio/Imagine Dragons - Follow You.mp3',
    },
    {
      id: '3',
      artist: 'Tove Lo',
      track: 'How Long',
      poster: 'img/photo_3.jpg',
      mp3: 'audio/Tove Lo - How Long.mp3',
    },
    {
      id: '4',
      artist: 'Tom Odell',
      track: 'Another Love',
      poster: 'img/photo_4.jpg',
      mp3: 'audio/Tom Odell - Another Love.mp3',
    },
    {
      id: '5',
      artist: 'Lana Del Rey',
      track: 'Born To Die',
      poster: 'img/photo_5.jpg',
      mp3: 'audio/Lana Del Rey - Born To Die.mp3',
    },
    {
      id: '6',
      artist: 'Adele',
      track: 'Hello',
      poster: 'img/photo_6.jpg',
      mp3: 'audio/Adele - Hello.mp3',
    },
    {
      id: '7',
      artist: 'Tom Odell',
      track: "Can't Pretend",
      poster: 'img/photo_7.jpg',
      mp3: "audio/Tom Odell - Can't Pretend.mp3",
    },
    {
      id: '8',
      artist: 'Lana Del Rey',
      track: 'Young And Beautiful',
      poster: 'img/photo_8.jpg',
      mp3: 'audio/Lana Del Rey - Young And Beautiful.mp3',
    },
    {
      id: '9',
      artist: 'Adele',
      track: 'Someone Like You',
      poster: 'img/photo_9.jpg',
      mp3: 'audio/Adele - Someone Like You.mp3',
    },
    {
      id: '10',
      artist: 'Imagine Dragons',
      track: 'Natural',
      poster: 'img/photo_10.jpg',
      mp3: 'audio/Imagine Dragons - Natural.mp3',
    },
    {
      id: '11',
      artist: 'Drake',
      track: 'Laugh Now Cry Later',
      poster: 'img/photo_11.jpg',
      mp3: 'audio/Drake - Laugh Now Cry Later.mp3',
    },
    {
      id: '12',
      artist: 'Madonna',
      track: 'Frozen',
      poster: 'img/photo_12.jpg',
      mp3: 'audio/Madonna - Frozen.mp3',
    },
  ];
  
  const pauseBtn = document.querySelector('.player__pause'),
  //getElement позволяет получить элементы динамически без перезагрузки страницы
        tracksCard = document.getElementsByClassName('track'),
        stopBtn = document.querySelector('.player__icon_stop'),
        catalogContainer = document.querySelector('.catalog__container'),
        player = document.querySelector('.player'),
        audio = new Audio;


  const catalogAddBtn = document.createElement('button');
  catalogAddBtn.classList.add('catalog__btn-add');
  catalogAddBtn.innerHTML = `
  <span>Увидеть всё</span>
  <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.589996 10.59L5.17 6L0.589996 1.41L2 0L8 6L2 12L0.589996 10.59Z"/>
  </svg> 
  `;

  const init = () => {
    renderCatalog(dataMusic);
    checkCount();

    catalogAddBtn.addEventListener('click', () => {
      [...tracksCard].forEach(track=> {
        track.style.display = '';
        catalogAddBtn.remove()
      })
    })
  };

  const createCard = (data) => {
    const button = document.createElement('a');
    button.href = '#';
    button.classList.add('catalog__item', 'track');
    button.dataset.idTrack = data.id;
    button.innerHTML = `
      <div class="track__img-wrap">
        <img
        width="180"
        height="180" 
        src="${data.poster}" 
        alt="${data.artist} ${data.track}" 
        class="track__poster">
      </div>
      <div class="track__info track-info" >
        <p class="track-info__title">${data.track}</p>
        <p class="track-info__artist">${data.artist}</p>
      </div>
    `
    return button
  };

  const renderCatalog = (data) => {
    catalogContainer.textContent = '';
    const listCard = data.map(createCard);
    catalogContainer.append(...listCard); 
    addHandlerTrack();
  };

  const pausePlayer = () => {
    const trackActive = document.querySelector('.track_active');
    console.log(trackActive);
    if(audio.paused) {
      audio.play();
      pauseBtn.classList.remove('player__icon_play');
      trackActive.classList.remove('track_pause');
    } else {
      audio.pause();
      pauseBtn.classList.add('player__icon_play');
      trackActive.classList.add('track_pause');
    }
  }

  const playMusic = event => {
    event.preventDefault();
    const trackActive = event.currentTarget,
          id = trackActive.dataset.idTrack,
          track = dataMusic.find(item => id === item.id);

    if(trackActive.classList.contains('track_active')) {
      pausePlayer()
      return
    };

    audio.src = track.mp3;

    audio.play();

    pauseBtn.classList.remove('player__icon_play');
    pauseBtn.classList.add('player__icon_pause');
    player.classList.add('player_active');
    for(let i = 0; i<tracksCard.length; i++){
      tracksCard[i].classList.remove('track_active');
    }
    trackActive.classList.add('track_active');
  }

  const addHandlerTrack = () => {
    for(let i = 0; i<tracksCard.length; i++){
      tracksCard[i].addEventListener('click', playMusic)
    }
  };

  const checkCount = (i = 1) => {
    if(catalogContainer.clientHeight > tracksCard[0].clientHeight * 3){
      tracksCard[tracksCard.length - i].style.display = 'none';
      checkCount(i + 1);
    } else if(i !== 1){
      catalogContainer.append(catalogAddBtn);
    };
  }



  pauseBtn.addEventListener('click', pausePlayer);


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


  init();

})