const $box = document.querySelector('#box');

// 시침과 분침 만들기

const appendMinuteHand = (minute) => {
  const $minuteHand = document.createElement('div');
  $minuteHand.classList.add('minuteHand');
  $minuteHand.style.transform = `rotateZ(${minute * 6}deg)`;
  $minuteHand.classList.add(minute % 5 ? 'thin' : 'thick');

  $box.appendChild($minuteHand);
};

[...Array(30).keys()].forEach((minute) => appendMinuteHand(minute));

// 분침 텍스트 만들기

const appendMinuteText = (minute, radius = 250) => {
  const angle = (minute - 15) * 6; // 12시 방향부터 0이 시작되도록 변경
  const radian = (angle / 180) * Math.PI;
  const X = radius * Math.cos(radian);
  const Y = radius * Math.sin(radian);
  const $minuteText = document.createElement('p');

  $minuteText.classList.add('minuteText');
  $minuteText.textContent = minute;
  $minuteText.style.transform = `translate(${X}px,${Y}px)`;
  $box.appendChild($minuteText);
};

const minuteFiveInterval = [...Array(12)].map((_, index) => index * 5);
minuteFiveInterval.forEach((minute) => appendMinuteText(minute));

// 분침부분 일부분만 보이도록 만들어주기

const $circleForHide = document.createElement('div');
$circleForHide.id = 'circleForHide';
$box.appendChild($circleForHide);

// 타이머 시작 및 정지 생성하기

const $playButton = document.createElement('button');
$playButton.classList.add('play-button');
$playButton.textContent = '❤️‍🔥';
$box.appendChild($playButton);

// 타이머 런닝 타입 구현하기

let minute = 0;
let second = 0;
let cond = false;
const $minuteText = document.querySelector('#minute-text');
const $secondText = document.querySelector('#second-text');

const makeRunningTime = (radius = 112.5) => {
  const $runningTime = document.createElement('div');
  $runningTime.classList.add('running-time');

  const angle = (minute - 16) * 6;
  const radian = (angle / 180) * Math.PI;
  const X = radius * Math.cos(radian);
  const Y = radius * Math.sin(radian);

  $runningTime.style.transform = `translate(${X}px, ${Y}px)  rotateZ(${angle}deg)`;
  $box.appendChild($runningTime);
};

// 뽀모 횟수 카운트하기

let bbomoNum = 0;
const $bbomoCount = document.querySelector('#bbomo-count');
const bbomoUpdate = () => {
  bbomoNum += 1;
  $bbomoCount.textContent = bbomoNum;
};

// 초기화 버튼 이벤트 만들어주기

const $initializeButton = document.querySelector('#initialize-button');

// 설정 모두 초기화 하기
const timerInitializing = () => {
  minute = 0;
  second = 0;
  cond = false;
  $minuteText.textContent = '00';
  $secondText.textContent = '00';
  $playButton.textContent = '❤️‍🔥';

  [...document.querySelectorAll('.running-time')].forEach((runningTime) => {
    $box.removeChild(runningTime);
  });
};

// 초기화 한거는 비상상황이니 배경화면 색 잠깐 빨갛게 만들었다가 돌려놓기

const emergecyTwinkling = () => {
  const $body = document.querySelector('body');
  setTimeout(() => {
    $body.style.background = 'white';
  }, 1000);
  $body.style.background = 'red';
};

$initializeButton.addEventListener('click', timerInitializing);
$initializeButton.addEventListener('click', emergecyTwinkling);

// 모든 사이클을 돌았을 때 배경화면이 반짝이는 애니메이션 추가하기
const successTwinkling = () => {
  const $body = document.querySelector('body');
  setTimeout(() => {
    $body.style.background = 'white';
  }, 1000);
  $body.style.background = 'yellow';
};

// 타이머 전광판 구현하기

const timerBoard = () => {
  if (cond) {
    if (second >= 59) {
      minute += 1;
      second = 0;
      makeRunningTime();
    } else {
      second += 1;
    }

    if (minute === 60) {
      bbomoUpdate();
      timerInitializing();
      successTwinkling();
    }

    $minuteText.textContent = minute < 10 ? `0${minute}` : minute;
    $secondText.textContent = second < 10 ? `0${second}` : second;
  }
};

// timer 스로틀링 이용하여 생성하기

const settingInterval = () => {
  let timer;

  return () => {
    if (timer) {
      clearInterval(timer);
    }

    timer = setInterval(timerBoard, 0.5);
  };
};

// 플레이 버튼을 누르면 컨디션과 textContent가 변경되게 만들기

const settingplayButton = () => {
  minute = minute === 60 ? 0 : minute;
  cond = cond ? false : true;
  $playButton.textContent = cond ? '⏸️' : '❤️‍🔥';
};

// 플레이 버튼을 누르면 타이머를 작동 시키도록 만들기

$playButton.addEventListener('click', settingplayButton);
$playButton.addEventListener('click', settingInterval());
