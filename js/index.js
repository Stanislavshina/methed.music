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

  let playList = [];

  const favoriteList = localStorage.getItem('favorite') 
  ? JSON.parse(localStorage.getItem('favorite'))
  : []; 
  
  const pauseBtn = document.querySelector('.player__pause'),
  //getElement позволяет получить элементы динамически без перезагрузки страницы
        tracksCard = document.getElementsByClassName('track'),
        stopBtn = document.querySelector('.player__icon_stop'),
        catalogContainer = document.querySelector('.catalog__container'),
        player = document.querySelector('.player'),
        timePassed = document.querySelector('.player__time-passed'),
        timeTotal = document.querySelector('.player__time-total'),
        playerProgressInput = document.querySelector('.player__progress-input'),
        nextPlayerTrack = document.querySelector('.player__icon_next'),
        prevPlayerTrack = document.querySelector('.player__icon_prev'),
        favorBtn = document.querySelector('.header__favorite-btn'), 
        likeBtn = document.querySelector('.player__icon_favorite'),
        muteBtn = document.querySelector('.player__icon_mute'),
        headerLogo = document.querySelector('.header__logo'),
        playerVolumeInput = document.querySelector('.player__volume-input'),
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
    });

    favorBtn.addEventListener('click', () => {
      const data = dataMusic.filter(el=> favoriteList.includes(el.id));
      renderCatalog(data);
      checkCount();
    });
    likeBtn.addEventListener('click', addTofavor);
  };

  const addTofavor = () => {
    const index = favoriteList.indexOf(likeBtn.dataset.idTrack);
    if(index === -1) {
      likeBtn.classList.add('player__icon_favorite_active');
      favoriteList.push(likeBtn.dataset.idTrack);
    } else {
      likeBtn.classList.remove('player__icon_favorite_active');
      favoriteList.splice(index, 1);
    }
    localStorage.setItem('favorite', JSON.stringify(favoriteList))
  }

  const updateTime = () => {
    	const duration = audio.duration,
            currentTime = audio.currentTime,
            progress = (currentTime / duration) * 100;
      playerProgressInput.value = progress ? progress : 0;
      const minutePassed = Math.floor(currentTime / 60) || '0',
            secondsPassed = Math.floor(currentTime % 60) || '0',
            minutesDuration = Math.floor(duration / 60) || '0',
            secondsDuration = Math.floor(duration % 60) || '0';
    timePassed.textContent = `${minutePassed}:${secondsPassed <10 ? '0' + secondsPassed:secondsPassed}`;
    timeTotal.textContent = `${minutesDuration}:${secondsDuration <10 ? '0' + secondsDuration:secondsDuration}`;
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
    playList = [...data];
    catalogContainer.textContent = '';
    const listCard = data.map(createCard);
    catalogContainer.append(...listCard); 
    addHandlerTrack();
  };

  const pausePlayer = () => {
    const trackActive = document.querySelector('.track_active');
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
    let i = 0;
    const trackActive = event.currentTarget,
          id = trackActive.dataset.idTrack,
          track = playList.find((item, index) => {
            i = index;
            return id === item.id;
          });
    likeBtn.classList.remove('player__icon_favorite_active');
    if(favoriteList.includes(id)){
      likeBtn.classList.add('player__icon_favorite_active');
    }   
    audio.src = track.mp3;
    
    audio.play();

    pauseBtn.classList.remove('player__icon_play');
    // pauseBtn.classList.add('player__icon_pause');
    if(trackActive.classList.contains('track_active')){
      pausePlayer()
    }
    trackActive.classList.add('track_active');
    
    const prevTrack = i === 0 ? playList.length - 1 : i - 1;
    const nextTrack = (i+1) === playList.length ? 0 : i + 1;
    prevPlayerTrack.dataset.idTrack = playList[prevTrack].id;
    nextPlayerTrack.dataset.idTrack = playList[nextTrack].id;
    likeBtn.dataset.idTrack = id;
    

    player.classList.add('player_active');

    for(let i = 0; i<tracksCard.length; i++){
      if(id === tracksCard[i].dataset.idTrack) {
        tracksCard[i].classList.add('track_active');
      } else {
      tracksCard[i].classList.remove('track_active');
      }
    }


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
  audio.addEventListener('timeupdate', updateTime)
  playerProgressInput.addEventListener('change', ()=> {
    const progress = playerProgressInput.value;
    audio.currentTime = (progress / 100) * audio.duration;
  });

  nextPlayerTrack.addEventListener('click', playMusic);
  prevPlayerTrack.addEventListener('click', playMusic);

  stopBtn.addEventListener('click', ()=> {
    audio.src = '';
    player.classList.remove('player_active');
    document.querySelector('.track_active').classList.remove('track_active');
  });

  audio.addEventListener('ended', () => {
    nextPlayerTrack.dispatchEvent(new Event('click', {bubbles: true}))
  });

  headerLogo.addEventListener('click', () => {
    renderCatalog(dataMusic);
    checkCount();
  });

  muteBtn.addEventListener('click', ()=> {
    if(audio.volume) {
      audio.volume = 0
      muteBtn.classList.add('player__icon_mute-on');
    } else {
      audio.volume = playerVolumeInput.value / 100;
      muteBtn.classList.remove('player__icon_mute-on');
    }
  });
  playerVolumeInput.addEventListener('input', ()=>{
    if(playerVolumeInput.value < 1){
      muteBtn.classList.add('player__icon_mute-on');
    } else {
      audio.volume = playerVolumeInput.value / 100;
      muteBtn.classList.remove('player__icon_mute-on');
    }

  })
  init();

});