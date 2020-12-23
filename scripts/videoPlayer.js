export const videoPlayerInit = () => {
  //переменные
  const videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoButtonStop = document.querySelector('.video-button__stop'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgress = document.querySelector('.video-progress'),
        videoTimeTotal = document.querySelector('.video-time__total'),
        videoVolume = document.querySelector('.video-volume');


  videoPlayer.volume = videoVolume.value / 100;
  //функции
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.remove('fa-play');
      videoButtonPlay.classList.add('fa-pause');
    }

  };

  const togglePlay = () => {
    //if(videoPlayer.paused==true) {
    //  videoPlayer.play();
    //} else {
    //  videoPlayer.pause();
    //}
    videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();//тернарный оператор (альтернатива коду выше)
    toggleIcon();
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    toggleIcon();
  };

  // добавление нолей к числам в шкале времени
  // addZero = n => n<10 ? '0'+n : n   можно записать в одну строку, опустив скобки
  const addZero = n => n < 10 ? '0'+ n : n;
    

  //события

  //click on screen
  videoPlayer.addEventListener('click', togglePlay);

  //click on playButton
  videoButtonPlay.addEventListener('click', togglePlay);

  //click on stop button
  videoButtonStop.addEventListener('click', stopPlay);


  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime; //текущее время видеоролика  встроенные данные видеоплеера
    const duration = videoPlayer.duration;       //длительность видеоролика  встроенные данные видеоплеера

    videoProgress.value = (currentTime/duration) * 100 //input range value перемещает указатель. положение отмряется процентами

    let minutePassed = Math.floor(currentTime / 60); //текущее время делится на 60, чтобы найти количество минут
    let secondsPassed = Math.floor(currentTime % 60);//остаток от деления на 60 это количество секунд

    let minuteTotal = Math.floor(duration / 60); //длительность видео в минутах
    let secondsTotal = Math.floor(duration % 60);// в секундах
    
    //добавление времени в вёрстку в подходящем формате
    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; 
    videoTimeTotal.textContent =      `${addZero(minuteTotal)}:${addZero(secondsTotal)}`; //addZero(minuteTotal) + ':' + addZero(secondsTotal) - вид с конконтенацией
  });


  //положение указателя изменяет текущее время видео
  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100; //максимальная громкость видеоплеера равна 1
  })
};