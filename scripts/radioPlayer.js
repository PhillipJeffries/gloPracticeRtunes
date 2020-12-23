const radioPlayerInit = () => {
    const radio = document.querySelector('.radio'),
          radioCoverImg = document.querySelector('.radio-cover__img'),
          radioNavigation = document.querySelector('.radio-navigation'),
          radioHeaderBig = document.querySelector('.radio-header__big'),
          radioItem = document.querySelectorAll('.radio-item'),
          radioStop = document.querySelector('.radio-stop'),
          audio = new Audio();

    audio.type = 'audio/aac'; 
    
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if(audio.paused) {
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
            radio.classList.remove('play');
        } else {
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
            radio.classList.add('play');
        }
    }


    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', (event) => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        audio.src = target.dataset.radioStantion;
        audio.play()
        radioStop.disabled = false;
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        audio.paused ? audio.play() : audio.pause(); 
        changeIconPlay();
    })
    

    


};

export default radioPlayerInit