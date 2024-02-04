const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing

// cors 해결
app.use(cors());

// 데이터 베이스 생성
const database = {
  uncompleted: [
    {
      id: 1,
      text: '치킨500개먹기',
    },
  ],
  completed: [
    {
      id: 1,
      text: '피자 500개 먹기',
    },
  ],
};

// 서버를 호스팅 할 포트 번호 설정
// 호스팅되는 서버의 주소 : https://localhost:3000
app.listen(PORT, (req, res) => {
  console.log(`Sever is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('🐸');
});

// get 요청에 대한 메소드
// todo 에 GET 메소드를 날리면 data 베이스를 보내주기

app.get('/todo/:state?/:id?', (req, res) => {
  const state = req.params.state ? req.params.state.toLowerCase() : null;
  const itemId = req.params.id ? parseInt(req.params.id, 10) : null;

  if (!state && !itemId) {
    res.json(database);
    return;
  }

  if (!itemId && (state === 'uncompleted' || state === 'completed')) {
    res.json(database[state]);
    return;
  }

  if (!itemId || !database[state]) {
    res.status(404).json({ error: '유효하지 않은 상태 또는 ID' });
    return;
  }

  const result = database[state].find((data) => data.id === itemId);

  if (!result) {
    res.status(404).json({ error: '해당 ID 가 존재하지 않습니다' });
  } else {
    res.json(result);
  }
});

// POST 에 대한 메소드

// POST 는 uncompleted 에만 주어진다.

app.post('/todo/uncompleted', (req, res) => {
  const { id, text } = req.body;

  // 필수 필드 확인
  if (!id || !text) {
    return res.status(400).json({ error: 'ID와 텍스트는 필수 항목입니다.' });
  }

  database.uncompleted.push({
    id,
    text,
  });

  // 클라이언트에 JSON 응답 보내기
  res.json({ message: 'Item added to uncompleted list successfully' });
});

// PUT 설정하기

app.put('/todo', (req, res) => {
  const { text } = req.body; // 성취된 목표의 text 를 할당 받음
  const targetIndex = database.uncompleted.findIndex((item) => {
    return item.text === text;
  });

  if (targetIndex === -1) {
    res.status(400).json({ error: '잘못된 요청입니다' });
    return;
  }

  const target = database.uncompleted.splice(targetIndex, 1)[0];
  //completed 배열 맨 앞으로 넣기
  database.completed.unshift(target);

  // 인덱스들 모두 변경하기
  database.uncompleted.forEach((item, index) => (item.id = index + 1));
  database.completed.forEach((item, index) => (item.id = index + 1));

  res.send(database);
});

// delete 요청

app.delete('/todo', (req, res) => {
  const { text } = req.body;

  const targetName = database.uncompleted.some((todo) => todo.text === text)
    ? 'uncompleted'
    : 'completed';

  database[`${targetName}`] = database[`${targetName}`].filter(
    (todo) => todo.text !== text,
  );
  database[`${targetName}`].forEach((todo, index) => (todo.id = index + 1));

  res.send('success');
});
