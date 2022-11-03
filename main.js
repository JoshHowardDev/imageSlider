function pageLoad() {
  //Fill imageSlidesDiv with images
  const imageSlidesDiv = document.querySelector('.imageSlidesDiv')
  const slideIndicatorContainer = document.querySelector('.slideIndicatorContainer');
  for (let i = 1; i <= 14; i++) {
    const img = new Image();
      img.src = `./images/${i.toString()}.jpg`;
      img.alt = 'Photo';
      imageSlidesDiv.appendChild(img);
    const indicator = document.createElement('button');
      indicator.classList.add('slideIndicator');
      indicator.setAttribute('data-slide-indicator-num', i);
      indicator.addEventListener('click', changeIMG.bind(this, false, i, true))
      slideIndicatorContainer.appendChild(indicator);
  }

  //Select first slide indicator
  document.querySelector('.slideIndicator').classList.add('slideIndicatorSelected')

  //Assign event listeners to arrows
  document.querySelector('#rightArrow').addEventListener('click', changeIMG.bind(this, true, false, true));
  document.querySelector('#leftArrow').addEventListener('click', changeIMG.bind(this, false, false, true));

  sessionStorage.setItem('slideAutoplay', true);

  slideAutoplay();
}

function changeIMG(nextBool, newIMG, stopAutoplay) {
  const imageSlidesDiv = document.querySelector('.imageSlidesDiv')
  const currentIMG = Number(imageSlidesDiv.dataset.currentImg);

  if (stopAutoplay) {
    sessionStorage.setItem('slideAutoplay', false);
  }

  //Set newIMG based on next or previous
  if (!newIMG) {
    if (nextBool) {
      newIMG = currentIMG + 1;
    } else {
      newIMG = currentIMG - 1;
    }
  }

  if (newIMG < 1 || newIMG > 14) newIMG = 1;

  //Remove any active slide indicators
  document.querySelectorAll('.slideIndicatorSelected').forEach(indicator => {
    indicator.classList.remove('slideIndicatorSelected')
  });
  document.querySelector(`[data-slide-indicator-num="${newIMG}"`).classList.add('slideIndicatorSelected')
  
  imageSlidesDiv.style.left = `-${(newIMG - 1) * 800}px`;
  imageSlidesDiv.dataset.currentImg = newIMG;

}

function slideAutoplay() {
  setTimeout(() => {
    if (sessionStorage.getItem('slideAutoplay') === 'true') {
      changeIMG(true, false, false);
      slideAutoplay();
    }
  }, 5000);
}

pageLoad();