export const audioPlayerInit = () => {
  const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPlay = document.querySelector('.audio-button__play'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioTimeTotal = document.querySelector('.audio-time__total');

  const playList = ['hello', 'flow', 'speed'];

  let trackIndex = 0;
  audioPlayer.volume = ".01";

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playList[trackIndex];
    audioPlayer.src = `./audio/${track}.mp3`;
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    if(isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();

      
    }
  };

  const nextTrack = () => {
    if(trackIndex === playList.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };


  audioNavigation.addEventListener('click', event => {
    const target = event.target;

    if(target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      if(audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }

    if(target.classList.contains('audio-button__prev')) {
      nextTrack();
    }

    if(target.classList.contains('audio-button__next')) {
      if(trackIndex === playList.length - 1) {
        trackIndex = 0;
      } else {
        trackIndex++;
      }
      loadTrack();
    }
  });

  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  const addZero = n => n < 10 ? '0'+ n : n;

  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration,
          currentTime = audioPlayer.currentTime,
          progress = (currentTime / duration) *100,
          minutesPassed = addZero(Math.floor(currentTime / 60)) || '0',
          secondsPassed = addZero(Math.floor(currentTime % 60)) || '0',
          minutesTotal = addZero(Math.floor(duration / 60)) || '0',
          secondsTotal = addZero(Math.floor(duration % 60)) || '0';

  audioProgressTiming.style.width = progress + '%';

  

  audioTimePassed.textContent = `${minutesPassed}:${secondsPassed}`;
  audioTimeTotal.textContent = `${minutesTotal}:${secondsTotal}`;

  });

  audioProgress.addEventListener('click', event => {
    const x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  })

};