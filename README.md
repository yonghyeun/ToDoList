# To Do List

<img src = 'https://velog.velcdn.com/images/yonghyeun/post/1427b669-b96a-4fb2-b74f-3600f6baa2bf/image.gif'>

자바스크립트 단골 토이프로젝트인 TO DO LIST 를 구현해봤습니다

자세한 내용은 벨로그를 통해 확인해보세요 !

<ul>
<li><a href = 'https://yonghyeun.github.io/ToDoList/'>완성본</a>
</li>
<li><a href = 'https://velog.io/@yonghyeun/%EB%B0%94%EB%8B%90%EB%9D%BC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-To-do-list-%EB%A7%8C%EB%93%A4%EA%B8%B0'>블로그 정보</a></li>
</ul>

<br>

자바스크립트를 공부한지 3주가 지나고 

`DOM` 과 이벤트들에 대해서 공부하면서 드디어 나도 토이 프로젝트들을 할 수 있을 것 같다는 자신감이 생겼다. 

그래서 ! 

자바스크립트를 배운다면 다들 한 번씩 해본다는 `to do list` , 나도 한 번 해봤다 ! 

<a href = 'https://yonghyeun.github.io/ToDoList/'>완성본 링크 </a>

# 전체적인 구조와 전역 변수
![](https://velog.velcdn.com/images/yonghyeun/post/a1c68b5c-e9b5-4e42-b4cf-74a39f772c84/image.png)

`html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <div class="to-do-list">
        <div id="header">
          <span>To Do List 📅</span>
          <div id="progress">
            <div id="progress-total">
              <div id="progress-bar"></div>
            </div>
            <span id="progress-text"></span>
          </div>
        </div>
        <div class="input-goal">
          <input type="text" id="input" />
          <button id="text-submit">✔️</button>
        </div>
        <div id="content"></div>
      </div>
    </div>
  </body>
  <script src="script.js"></script>
</html>
```
`css`
````css
* {
  font-family: 'kakao';
}

body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

.container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #153677, #4e085f);
  padding: 10px;
  display: flex;
  justify-content: center;
}

.to-do-list {
  width: 100%;
  max-width: 800px;
  height: 700px;
  background-color: #fff;
  border-radius: 30px;
  margin-top: 300px;
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: 0px 0px 30px 10px #888888;
}
````
`script`
```js
const $input = document.querySelector('#input');
const $submit = document.querySelector('#text-submit');
const $content = document.querySelector('#content');
const $progressTotal = document.querySelector('#progress-total');
const $progressText = document.querySelector('#progress-text');
const $progressBar = document.querySelector('#progress-bar');
// 설정한 목표 개수
let totalGoals = document.getElementsByClassName('typed-goal').length; 
// 성취한 목표 개수
let completedGoals = 0; 
```

전체적인 구조는 다음처럼 생겼다. 

자세한 구조는 밑에서 자세히 설명하도록 하겠다.

전체적인 구조의 `css` 에서 좀 특징적인 것은 배경색으로 `linear-gradient` 를 써서 쌈뽕하게 만들었다는 것과 투두리스트에 `box-shadow` 를 하얗게 줘서 쌈뽕하게 만들었다는 점 정도인 것 같다. 

그럼 하나씩 구조를 뜯어가며 복습해보자 ! 

# `header`
![](https://velog.velcdn.com/images/yonghyeun/post/2e070cff-6203-4cdf-9dce-6f9e43688b17/image.png)


기본 구조는 매우 단순하게 생겼다. 

상단(`header`)에는 제목과 진전도(`progress > [progress-total > progress-bar] , progress-text` )가 존재한다. 

진전도 바를 나타내는 `progress-bar` 를 `progress-total` 로 감싼 이유는 진전도에 따라서 `progress-bar` 가 `progress-total`을 차지하는 비율을 변경하기 위함이였다
## `CSS`
`css`
````css
#header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-size: 30px;
  font-weight: 700;
}

#progress {
  display: flex;
  justify-content: center;
  align-items: center;
}

#progress-total {
  flex: 1;
  width: 200px;
  height: 30px;
  background-color: #eee;
  margin-right: 10px;
  border-radius: 30px;
  transition: box-shadow 1s ease;
}

#progress-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
  width: 0%;
  height: 100%;
  background-color: red;
  border-radius: 30px;
  transition: width 1s ease;
}

#progress-text {
  font-size: 20px;
}
````

`progress-total` 에는 `transition : box-shadow` , `progress-bar` 에는 `transition : width` 를 넣어주었다. 

이를 통해 자바스크립트로 `progress-total` 이 모두 찼을 때에는 그림자가 생길 때, `progress-bar` 의 너비가 변경될 때 애니메이션과 같은 효과를 내도록 하였다.

## `Script`
![](https://velog.velcdn.com/images/yonghyeun/post/d34e89e7-f579-4ece-b204-7ee032190a9e/image.gif)
### `updateProgressText`
```js
$progressText.textContent = `${completedGoals}/${totalGoals}`;

// content의 내용이 변할 때 ProgressText가 변경되는 함수
const updateProgressText = () => {
  $progressText.textContent = `${completedGoals}/${totalGoals}`;
};
```

스크립트 부분을 보면 사용되는 변수는 `totalGoals , CompletedGoals` 가 사용된다. 

맨 처음 `progress-text` 노드에 진전도 텍스트를 넣어주고

목표가 추가되거나, 달성되거나, 삭제 될 때 마다 `progress-text` 의 값을 업데이트 하는 `updateProgressText` 함수를 생성했다.

### `updateProgressBar`
```js
// content의 내용이 변할 때 ProgressBar가 변경되는 함수
// 성취도가 100%면 ProgressBar에서 빨간 불빛이 나게 하자

const updateProgressBar = () => {
  const accomplish = Math.round((completedGoals / totalGoals) * 100);
  $progressBar.style.width = `${!accomplish ? 0 : accomplish}%`;
  $progressBar.textContent = `${accomplish}%`;

  if (!accomplish) {
    $progressBar.textContent = '';
    $progressTotal.style.boxShadow = '';
  } else if (accomplish === 100) {
    $progressTotal.style.boxShadow = '0 0 10px red';
  } else {
    $progressTotal.style.boxShadow = '';
  }
};
```

이번에는 목표가 추가 및 삭제, 달성 될 때 `progress-bar` 의 상태를 변경하는 함수를 만들어줬다. 

전체적인 성취도를 나타내는 지역 변수 `accomplish[(달성 목표 / 전체 목표) * 100]`를 생성해주고 

`progress-bar`의 너비는 `${accomplish}%` 만큼 이동되도록 하였다. 

이 때 전체 목표가 0일 때에는 `accomplish` 의 값이 `NaN` 값이 되더라.
> `accomplish` = (성취 목표/전체목표) * 100 
> 분모가 0이라 계산이 되지 않는다.

그래서 값이 `NaN` 일 때에는 `accomplish` 값을 0으로 명시적으로 설정해주었다. 

그리고 성취도가 100% 일 때에는 완료되었음을 더 이쁘게 표현하고 싶어서 빨간 그림자를 넣어주었다.

# `input-goal`
![](https://velog.velcdn.com/images/yonghyeun/post/f97aafdb-5663-4c54-a78c-1f5c105dc60d/image.gif)

목표를 타이핑하고 제출하는 영역이다. 

## `css`
````css
input {
  width: 40%;
  height: 30px;
  margin-right: 10px;
  border-radius: 30px;
  background-color: #eee;
  border: 0px;
  text-align: center;
  font-size: 20px;
  transition: box-shadow 0.3s ease, width 0.5s ease;
}

input:focus {
  outline: none;
  width: 70%;
  box-shadow: 5px 5px 10px 0px #888888;
}
input:hover {
  box-shadow: 5px 5px 10px 0px #888888;
}

#text-submit {
  border-radius: 30px;
  background-color: #68f2af;
  border: 0px;
  transition: box-shadow 0.4s ease;
}

#text-submit:hover {
  box-shadow: 5px 5px 10px 0px #888888;
  transition: box-shadow 0.3s ease;
}
````

`css` 의 가상선택자들을 이용해줘서 동적인 느낌을 쉽게 표현 할 수 있었다.

`input` 란에 목표를 타이핑 하기 위해 마우스를 올리면 `input:hover` 로 인해 그림자가 생겨서 위로 튀어나오는 듯한 효과를 주고 

마우스를 이용해 선택하면 `input:focus` 로 인해 너비가 늘어난다. 

`text-submit:hover` 를 통해서 마우스를 올리면 동일하게 위로 튀어나오는 듯한 효과를 준다.

## `script` 

### `enterToSubmit`
```js
const enterToSubmit = (event) => {
  if (event.key !== 'Enter') return;
  $submit.click();
};

$input.addEventListener('keyup', enterToSubmit);
```

`input` 란에서 글을 작성하고 `Enter`만 눌러도 제출 버튼이 눌리도록 하는 이벤트 핸들러를 할당해주었다.

### `shadowSubmit`
```js
const shadowSubmit = () => {
  setTimeout(() => {
    $submit.style.boxShadow = '';
  }, 500);
  $submit.style.boxShadow = '0 0 10px red';
};
$submit.addEventListener('click', shadowSubmit);
```

`submit` 버튼이 눌렸을 때 활성화 된 것 같은 느낌을 내고 싶어서 빨간 그림자를 넣어주고 0.5 초 뒤에는 다시 빨간 그림자가 삭제 되도록 하였다. 

### `setGoal`
![](https://velog.velcdn.com/images/yonghyeun/post/a6716b8a-47c2-4b2b-8276-277ee881d3ac/image.gif)
```js
// submit 버튼이 click 되면 input 의 글을 가지고 content의 자식 노드를 생성하는 함수
// 목표가 설정되면 전체 목표 개수가 1 올라가고 ProgressText 의 변화를 주기
const setGoal = () => {
  if ($input.value === '') return; // 적힌 값이 없으면 early return

  const $newGoal = createInnerWrapper();
  createTypeGoal($newGoal);
  createButtonWrapper($newGoal);
  totalGoals += 1;
  updateProgressText();
  updateProgressBar();
  $input.value = ''; // 태그를 추가한 후에는 input 값 초기화
};

$submit.addEventListener('click', setGoal);
```

이 부분은 탑다운 방식으로 풀어나가려고 한다. 함수의 시작 부분에서 만약 제출 버튼이 눌렸으나 작성한 목표가 없다면 `early return` 을 통해 아무런 일도 일어나지 않도로 하였다.

`setGoal` 함수의 역할은 , 목표를 작성하면 작성된 목표를 `content` 영역에 띄워야 하며 전체 목표 (`totalGoals`)의 값을 늘려줘야 한다. 


 `createInnerWrapper , createTypeGoal , createButtonWrapper` 함수들을 통해 `content` 영역에 작성된 목표를 띄운다.

`totalGoals += 1` 을 통해 전체 목표 개수를 늘려주고 `udapteProgressText , updateProgressBar` 를 통해 `header` 부분의 `progress` 부분들을 업데이트 해주었다. 

그리고 제출 버튼이 눌리고 나면 (혹은 `input` 에서 `Enter`가 눌리고 나면) `input` 창을 비워주었다. 

![](https://velog.velcdn.com/images/yonghyeun/post/b60c574a-453c-49e7-8c2c-d34c1778efa1/image.png)

밑 함수들을 보기 전에 `setGoal`함수가 실행되면 `content` 영역에 추가되는 태그들을 살펴보자 

`inner-wrapper` 태그 내의 `typed-goal` 태그에 `input` 에 적힌 목표들이 담기고 

`inner-wrapper` 태그 내의 `button-wrapper` 태그 안에 목표를 달성하거나, 삭제 할 수 있는 버튼들이 담긴다. 

### `createInnerWrapper`
`css`

````css
.inner-wrapper {
  width: 0; /* 처음에는 width 를 0으로 생성*/
  height: 0;
  background-color: #ab5edb;
  overflow: hidden;
  color: white;
  border-radius: 30px;
  padding: 10px;
  font-size: 25px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  transition: width 1.5s ease-in-out, height 1.5s ease-in-out,
    box-shadow 1.5s ease-in-out;
}
````
```js
// inner-wrapper 를 생성하여 천천히 content 에 띄우는 함수
const createInnerWrapper = () => {
  const $innerWrapper = document.createElement('div');
  $innerWrapper.classList.add('inner-wrapper');
  $content.appendChild($innerWrapper);

  requestAnimationFrame(() => {
    $innerWrapper.style.width = '90%';
    $innerWrapper.style.height = '30px';
  });

  return $innerWrapper;
};
```

처음에 생성되는 `createInnerWrapper`로 인해 생성되는 `innerWrapper` 태그는 `width , heigth`가 0인 태그이다. 

영역이 0인 `innerWrapper` 태그를 `content` 에 담아 준 후 `width , height` 값을 변경시켜줌으로서 마치 없던 부분에서 늘어나면서 생겨나는 것 처럼 보이게 해주었다. 

이후 생성된 태그를 반환한다.

### `createTypedGoal`
````css
.typed-goal {
  overflow-y: hidden;
  opacity: 0;
  transition: opacity 4s ease;
}
````

```js
// 목표를 설정하면 설정되어 있는 목표가 typed-goal 에 적히는 함수

const createTypedGoal = (innerWrapper) => {
  const $innerWrapper = innerWrapper;
  const $typedGoal = document.createElement('div');

  $typedGoal.classList.add('typed-goal');
  $typedGoal.id = 'uncompleted';
  $typedGoal.textContent = $input.value;
  $innerWrapper.appendChild($typedGoal);

  requestAnimationFrame(() => {
    $typedGoal.style.opacity = '1';
  });
};
```

`createTypedGoal` 함수는 컨테이너 역할을 할 `innerWrapper` 를 인수로 받아 해당 `innerWrapper`에 

클래스가 `typed-goal` 이면서 `id` 가 `uncompleted` 인 `typedGoal` 태그를 추가한다. 

이 때 추가된 `typedGoal` 내의 글씨는 `input`에 적힌 값이며 초기에 추가 되었을 때에는 `opacity :0` 이기 때문에 

화면에 보이지 않는다.

추가 된 후 `opacity : 1` 로 변경해주면서 화면에 서서히 나타나는 듯한 효과를 내준다.

### `createButtonWrapper`
`css`

```css
.button-wrapper {
  position: relative;
  display: flex;
  opacity: 0;
  transition: opacity 3s ease;
}

.button-wrapper > button {
  background-color: #68f2af;
  border-radius: 30px;
  border: 0px;
  margin-right: 5px;
  font-size: 15px;
}

.button-wrapper button:hover {
  box-shadow: 0px 5px 10px 0px white;
  transition: box-shadow 0.3s ease;
}
```
```js
// button-wrapper 를 생성하여 천천히 inner-wrapper에 띄우는 함수

const createButtonWrapper = (innerWrapper) => {
  const $buttonWrapper = document.createElement('div');
  $buttonWrapper.classList.add('button-wrapper');

  innerWrapper.appendChild($buttonWrapper);

  const $complete = document.createElement('button');
  const $delete = document.createElement('button');

  [$complete.textContent, $delete.textContent] = ['⭕', '❌️'];
  [$complete.id, $delete.id] = ['complete', 'delete'];

  [$complete, $delete].forEach((button) => {
    const $button = button;
    $buttonWrapper.appendChild($button);

    requestAnimationFrame(() => {
      $buttonWrapper.style.opacity = '1';
    });
  });
};
```

`createButtonWrapper` 함수는 컨테이너 역할을 할 `innnerWrapper` 를 인수로 받아 버튼들을 담은 `buttonWrapper` 태그를 추가한다. 

버튼들을 담는 컨테이너 역할을 할 `buttonWrapper` 태그를 생성해주고 `innerWrapper` 에 추가해준다.

__이 때 추가 되었을 때 `buttonWrapper` 은 `opacity :0`  이기 때문에 추가되어도 보이지 않는다.__

이후 `complete , delete` 버튼을 생성해주고 `buttonWrapper` 에 추가해준다. 

이후 `buttonWrapper` 의 `opacity` 를 1로 변경시켜줌으로서 

마치 `innerWrapper` 안에서 서서히 생성되는 것 처럼 변경한다. 

### `setGoal` 다시 보기 

![](https://velog.velcdn.com/images/yonghyeun/post/a6716b8a-47c2-4b2b-8276-277ee881d3ac/image.gif)

```js
// submit 버튼이 click 되면 input 의 글을 가지고 content의 자식 노드를 생성하는 함수
// 목표가 설정되면 전체 목표 개수가 1 올라가고 ProgressText 의 변화를 주기
const setGoal = () => {
  if ($input.value === '') return; // 적힌 값이 없으면 early return

  const $newGoal = createInnerWrapper();
  createTypeGoal($newGoal);
  createButtonWrapper($newGoal);
  totalGoals += 1;
  updateProgressText();
  updateProgressBar();
  $input.value = ''; // 태그를 추가한 후에는 input 값 초기화
};

$submit.addEventListener('click', setGoal);
```

내부에 사용된 함수들에 대해서 알아보고 난 후에는 `setGoal` 함수의 메커니즘을 한 눈에 볼 수 있다.

맨 처음 `innerWrapper` 를 `content` 영역에 애니메이션과 함께 추가해준 후 

`createTypeGoal` 함수를 통해 애니메이션과 함께 `innerWrapper` 에 글자들을 넣어준다. 

`createButtonWrapper` 함수를 통해 애니메이션과 함께 `innerWrapper`에 버튼들을 넣어준다. 

그리고 전체 목표 수 늘리고, `progress-text,progress-bar` 업데이트하고 입력창 비우기 :) 

# `content`
![](https://velog.velcdn.com/images/yonghyeun/post/9cc657b4-11ed-4f0e-bc10-3b8dc7f1bd4b/image.gif)


## `css`
````css
#content {
  background-color: #68f2af;
  width: 95%;
  height: 70%;
  margin: 30px auto;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px whitesmoke;
  overflow-y: scroll;
}
/* 스크롤바 설정 */

#content::-webkit-scrollbar {
  width: 10px;
}

#content::-webkit-scrollbar-thumb {
  background-color: #ab5edb38;
  width: 5px;
  max-height: 5px;
  border-radius: 30px;
}
````

`content` 영역은 설정된 목표들이 담긴 `inner-wrapper` 들이 담기는 영역이다. 

이 때 `height` 는 `to-do-list` 영역의 `70%` 를 유지하면서 그 이상으로 `inner-wrapper` 들이 담기면 

스크롤을 생성하도록 하였다. 

이 때 스크롤의 모양을 `:-webkit-scrollbar` 를 통해 스타일링 해주었다.

## `script`

이 부분도 탑다운으로 가보자

### `changeGoal`
![](https://velog.velcdn.com/images/yonghyeun/post/cc02a660-0cd2-449a-9cb2-5d66c87412de/image.gif)

```js
const changeGoal = (event) => {
  if (event.target.tagName !== 'BUTTON') return;
  shadowButton(event);
  if (event.target.id === 'complete') {
    goalComplete(event);
  } else if (event.target.id === 'delete') {
    goalDelete(event);
  }
  updateProgressText();
  updateProgressBar();
};

$content.addEventListener('click', changeGoal);
```

`content` 영역이 클릭 될 때 `changeGoal`이란 함수가 실행된다. 

이 때 `changeGoal` 함수는 눌린 태그가 `Button` 이 아닐 때에는 `early return` 으로 실행문에서 빠져나온다. 

만약 버튼이 눌렸을 때에는 `shadowButton` 함수가 실행되고

눌린 버튼의 `id` 에 따라서 `goalComplete , goalDelete` 함수가 실행된다. 

목표가 성취되었거나 삭제되었기에 진척도를 변경하는 `updateProgressText , updateProgressBar` 가 실행된다. 

> ### 버튼의 `click` 이벤트를 `content` 에게 이벤트 위임해준 이유
> 버튼에 `click` 이벤트를 주지 않고 부모 태그인 `content` 에게 이벤트를 위임해준 이유는 다음과 같다.
> 설정되는 목표에 따라 버튼들이 생성 될 텐데 생성되는 버튼마다 이벤트 핸들러를 설정해주는 것은 오버헤드가 클 것 같았다.
> 그래서 부모 태그인 `content`에서 `click` 이벤트를 설정해주어 자식 태그의 `click` 이벤트를 캡쳐해주도록 하였다.

### `shadowButton`

```js
const shadowButton = (event) => {
  const $button = event.target;
  setTimeout(() => {
    $button.style.boxShadow = '';
  }, 500);
  $button.style.boxShadow = '0 0 10px red';
};
```

`shadowButton` 은 `event` 를 인수로 받아 `event.target` 인 `button` 의 `box-shadow` 를 변경한다.
> 항상 `shadowButton` 은 눌린 버튼인 `event` 만을 인수로 받기 때문에 `event.target` 은 항상 버튼이다.

빨간 그림자를 생성했다가 0.5초 이후에는 다시 그림자를 제거한다. 

### `goalComplete`

```js
// button-wrapper 내의 O 버튼이 눌리면 completedGoals를 올리고
// typed-goal의 텍스트를 수정하는 함수 (완료 선 긋기, id = completed 로 변경)
// 완료된 목표의 innerWrapper 에서 불빛이 나게 하자

const goalComplete = (event) => {
  const $button = event.target;
  const $buttonWrapper = event.target.parentNode;
  const $typedGoal = $buttonWrapper.previousSibling;
  const $innerWrapper = $typedGoal.parentNode;

  $typedGoal.id = 'completed';
  $innerWrapper.style.boxShadow = '0px 0px 5px blue';

  $typedGoal.style.textDecoration = 'line-through';
  $typedGoal.style.color = '#aaa';
  $button.id = '';
  
  completedGoals += 1;
};
```

`goalComplete` 또한 `event` 를 인수로 받아 클릭 된 버튼의 부모노드들과 형제 노드를 지역 변수로 선언한다. 

이후 눌린 버튼이 존재하는 `innerWrapper` 에 완료됨을 나타낼 수 있도록 파란 그림자를 설정해주고 

완료된 목표들의 `typedGoal` 의 `id` 를 변경해준다. 기존 `typedGoal` 의 `id` 는 `uncompleted` 이지만 완료된 목표는 `completed` 로 변경된다. 
> 변경하는 이유는 이후 나올 함수인 `goalDelete` 에서 `typedGoal` 의 `id` 에 따라 액션이 다르기 때문이다.

완료된 목표들의 `typedGoal` 의 글자 완료 선과 색상을 변경해준다.

이후 눌린 버튼의 `id` 를 제거해준다. 

이후 성취된 목표(`completedGoals`)의 수를 하나 올려준다. 

눌린 버튼의 `id`를 제거해주는 이유는 한 번 성취한 목표의 목표 완료 버튼이 반복적으로 눌려 `completedGoals` 가 중복적으로 올라가는 것을 방지하기 위함이다.

### `goalDelete`

```js
// button-wrapper 내의 X 버튼이 눌리면 totalGoals를 내리고
// 해당 버튼이 존재하는 노드를 삭제하는 함수

const goalDelete = (event) => {
  const $buttonWrapper = event.target.parentNode;
  const $typedGoal = $buttonWrapper.previousSibling;
  const $innerWrapper = $buttonWrapper.parentNode;
  
  totalGoals -= 1;
  if ($typedGoal.id === 'completed') {
    completedGoals -= 1;
  }

  // 삭제 될 때 애니메이션을 추가하자
  $typedGoal.style.transition = 'opacity 1.5s ease';
  $buttonWrapper.style.transition = 'opacity 1.5s ease';

  setTimeout(() => {
    $content.removeChild($innerWrapper);
  }, 3000);
  requestAnimationFrame(() => {
    $buttonWrapper.style.opacity = '0';
    $typedGoal.style.opacity = '0';
  });
  $innerWrapper.removeChild($buttonWrapper);
  $innerWrapper.removeChild($typedGoal);
  $innerWrapper.style.padding = '0px';
  requestAnimationFrame(() => {
    $innerWrapper.style.width = '0%';
    $innerWrapper.style.height = '0%';
  });
};
```

`goalDelete` 함수는 `event` 를 인수로 받아 해당 이벤트가 일어난 버튼의 부모노드, 형제 노드들을 지역 변수로 선언한다.

우선 목표를 삭제하는 것이기 때문에 전체 목표의 개수(`totalGoals`)를 1개 줄여준다.

만약 `typedGoal` 의 `id` 가 `completed`일 경우엔 성취한 목표(`completdGoal`)의 개수도 1개 줄여준다. 

이후 애니메이션 효과를 넣어준다.

해체는 조립의 역순이라고 했든가 

목표가 `content`에 나타날 때의 애니메이션은 `innerWrapper` 를 크기가 0인 채로 담은 후 크기를 늘려주었다. 

이후 늘어난 `innerWrapper` 내부에 `opacity : 0` 인 `typedGoal` 과 `buttonWrapper` 를 담은 후 `opacity : 1` 로 변경해주면서 서서히 나타나는 것 처럼 했다.

그럼 제거되는 것은 정말 반대로 해주면 된다. 

`buttonWrapper , typedGoal` 의 `opacity` 를 0으로 설정해 서서히 사라지는 것처럼 해준 후 실제로 삭제해준다. 

이후 `innerWrapper` 의 `padding : 0` 으로 변경 후 `width , height` 를 0으로 설정해 정말 빈 태그로 변경해준다. 

이후에 `innerWrapper` 를 `content` 영역에서 삭제한다. 

### `changeGoal` 다시보기

![](https://velog.velcdn.com/images/yonghyeun/post/cc02a660-0cd2-449a-9cb2-5d66c87412de/image.gif)

```js
const changeGoal = (event) => {
  if (event.target.tagName !== 'BUTTON') return;
  shadowButton(event);
  if (event.target.id === 'complete') {
    goalComplete(event);
  } else if (event.target.id === 'delete') {
    goalDelete(event);
  }
  updateProgressText();
  updateProgressBar();
};

$content.addEventListener('click', changeGoal);
```

내부 함수들을 살펴 본 후 `changeGoal` 이 한 눈에 보인다.

눌린 버튼들에 대해서 `shadowButton` 으로 활성화 애니메이션을 넣어주고 

눌린 버튼들에 따라서 `goalComplete , goalDelete` 를 실행해준다.  

이후 목표 변경에 따라서 진전도를 `UpdateProgressText, updateProgressBar` 를 통해 변경해준다. 

# 회고 

책으로만 공부하다가 뭔가를 실제로 만들어보니 되게 흥미롭게 했었다.

하면서 느낀 것은 `css` 는 정말 해도해도 끝이 없다는 사람들의 말을 드디어 이해 할 수 있었다. 

자바스크립트 코드는 얼핏 봤던 클린 코드에 대한 내용에서 

함수는 하나의 일만을 해야 한다라는 문구를 보고 최대한 기능들을 나눠서 생성해봤다. 

다만 드는 생각은 같은 범주의 기능들을 하나의 클래스로 묶어 볼걸 이란 생각과 

태그들을 모두 전역 변수로 선언 해둔 후 함수에서 전역에 선언된 변수들을 계속 참조하였는데 이것 또한 아쉬운 부분으로 남는다. 

이 부분은 내가 어떤 코드가 좋은 코드인지에 대한 기준이 없기 때문에 확신이 안들어서 리팩토링 할 엄두를 못냈다. 

현재 공부하고 있는 서적을 1회독만 더 한 이후, 클린 코드에 대한 서적과 실제 사람들의 웰메이드 코드들도 살펴봐야겠다. 
