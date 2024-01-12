# To Do List

<img src = 'https://velog.velcdn.com/images/yonghyeun/post/1427b669-b96a-4fb2-b74f-3600f6baa2bf/image.gif'>

---

# 프로젝트 버전

### **ver 1** 업데이트 내용 (2023/12/13)

서버 구현 없이 동작하도록 프로토타입을 만들었습니다.
자세한 내용은 <a href = 'https://velog.io/@yonghyeun/%EB%B0%94%EB%8B%90%EB%9D%BC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-To-do-list-%EB%A7%8C%EB%93%A4%EA%B8%B0'>바닐라 자바스크립트로 To do list 만들기 !</a> 를 확인하세요 !

### **ver 2** 업데이트 내용 (2024/01/11)

- `express` 를 이용해 서버를 만들고 `fetch` 를 이용해 `GET , POST , PUT , DELETE` 메소드를 사용 할 수 있도록 만들었습니다.

- 달성한 목표는 달성하지 않은 목표 밑으로 내려가도록 업데이트 되었습니다.
  자세한 내용은 <a href = 'https://velog.io/@yonghyeun/fetch-express-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-ToDoList-%EB%B2%84%EC%A0%84-%EC%97%85%EA%B7%B8%EB%A0%88%EC%9D%B4%EB%93%9C-%ED%95%98%EA%B8%B0'>fetch , express 이용하여 ToDoList 버전 업그레이드 하기 (CRUD)</a> 를 확인하세요 !

# 프로젝트 설명

자바스크립트 단골 토이프로젝트인 **TO DO LIST** 를 구현해봤습니다.

### 목표 설정

자바스크립트의 이벤트 핸들러를 이용하여 `input` 에 적힌 목표를 동적으로 태그를 조작하여 게시판에 저장 할 수 있습니다.

### 로컬 호스팅 서버

<img src = 'https://velog.velcdn.com/images/yonghyeun/post/2a2cd3d8-7478-4ddf-ab56-7a5ffc05dff0/image.gif' alt = '서버 열기'>

터미널에서 `sever` 폴더에 들어가 `node sever.js` 로 `http://localhost3000/todo` 에 개인 서버를 호스팅 할 수 있습니다.

호스팅 한 서버에서 설정한 목표를 관리해보세요

### `API` 관련 기능

#### `GET`

<img src = 'https://velog.velcdn.com/images/yonghyeun/post/fa994ee7-e329-4b54-8430-0b811b196322/image.gif' alt = 'GET'>

- 개인 서버를 호스팅하면 기본적으로 투두리스트는 서버에 `GET` 메소드를 이용해 개인 호스팅 서버에 저장된 데이터베이스와 연동됩니다.
  <br>

#### `POST`

<img src = 'https://velog.velcdn.com/images/yonghyeun/post/617318ac-aa85-4c08-8a43-944be9b28c6b/image.gif' alt = 'POST'>

- `input` 란에 목표를 설정한 후 `Enter` 키를 누르거나 `버튼`을 누르면 게시판에 목표가 게시 됩니다. 이후 게시된 목표는 서버에 `POST` 메소드를 이용해 `JSON` 파일 형태로 저장합니다.
  ```
  // JSON 파일 형태 예시
  {
      "uncompleted": [
          {
              "id": 1,
              "text": "치킨500개먹기"
          }
      ],
      "completed": [
          {
              "id": 1,
              "text": "피자 500개 먹기"
          }
      ]
  }
  ```
  <br>

#### `PUT`

<img src = 'https://velog.velcdn.com/images/yonghyeun/post/59ecab64-fe32-4201-ac61-2d0bad566877/image.gif' alt = '달성목표'>
<br>

- 목표를 달성하였다면 달성한 목표를 `⭕` 버튼을 눌러 다음 목표를 달성하세요. 달성된 목표는 하단으로 내려갑니다.

<img src = 'https://velog.velcdn.com/images/yonghyeun/post/1d12862a-99f5-4638-b8bd-f87b2eddf938/image.gif' alt = 'POST'>

- 달성한 목표는 개인 호스팅 서버에서 `uncompleted` 배열에서 `completed` 배열 내 객체로 변경되며 객체의 `id` 는 자동으로 순서를 유지합니다.

#### `DELETE`

<img src = 'https://velog.velcdn.com/images/yonghyeun/post/d81317ec-a258-46ad-a617-8fa1ec07c7ed/image.gif' alt = 'DELETE'>

- 오늘 안으로 해결하기 힘든 목표는 `❌️` 키룰 눌러 삭제하세요 . 삭제한 목표는 개인 호스팅 서버 내에서 제거되며 객체의 `id` 는 자동으로 순서를 유지합니다.

# 프로젝트 설치 및 실행 방법

### 1. 프로젝트 다운로드

프로젝트를 로컬 환경으로 다운로드 합니다. 다운로드 방법은 다음과 같습니다.

터미널을 이용해 다운로드 할 수 있습니다.

```bash
git clone https://github.com/yonghyeun/ToDoList.git
```

또는 프로젝트를 `zip` 파일로 다운로드하여 압축을 해제합니다.

### 2. 필수 의존성 설치

프로젝트의 필수 의존성을 설치합니다.

터미널에서 프로젝트 루트 디렉토리 (`프로젝트폴더가 존재하는 루트 폴더`)로 이동한 후 아래 명령어를 실행합니다.

```bash
cd ToDoList
npm install
```

### 3. 서버 실행

서버를 실행하기 위해 `server` 폴더로 이동합니다.

```bash
cd sever
```

그 다음 명령어로 서버를 실행합니다.

```bash
node sever.js
```

서버가 성공적으로 실행되면 콘솔에 메시지가 표현됩니다.

```ardurion
Server is running on http://localhost:3000
```

### 4. 웹 애플리케이션 실행

`index.html` 을 실행시켜주시고 사용하시면 됩니다.

### 5. 서버 종료

`server` 폴더에서 `crtl + c` 를 눌러 서버를 종료 할 수 있습니다.

현재 `ver 2` 에서는 서버가 종료되면 이전 게시글들은 모두 저장되지 않고 초기화 됩니다.

# 추후 업데이트 계획

- `ToDoList` 에 <a href = 'https://github.com/yonghyeun/BBomodoroTimer'>뽀모도로 타이머</a> 추가 예정
- 날짜별 `ToDoList` 를 저장 하고 조회 가능한 캘린더 기능 추가

[![GitHub issues](https://img.shields.io/github/issues/yonghyeun/ToDoList)](https://github.com/yonghyeun/ToDoList/issues)
[![GitHub forks](https://img.shields.io/github/forks/yonghyeun/ToDoList)](https://github.com/yonghyeun/ToDoList/network)
[![GitHub stars](https://img.shields.io/github/stars/yonghyeun/ToDoList)](https://github.com/yonghyeun/ToDoList/stargazers)
