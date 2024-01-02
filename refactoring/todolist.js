class ToDoList {
  constructor() {
    this.progressBar = new Node('div', null, 'progress-bar', null, true);
    this.progressText = new Node('span', null, 'progress-text', null, true);
    this.input = new Node('input', null, 'input', null, true);
    this.textSubmit = new Node('button', null, 'text-submit', null, true);
    this.content = new Node('div', null, 'content', null, true);
    this.totalGoals = 0;
    this.completedGoals = 0;
    this.timer;

    this.updateProgressText();
    this.updateProgressBar();
  }
  selectExistedNode(idName, className) {
    const identifer = idName ? `#${idName}` : `.${className}`;
    return document.querySelector(identifer);
  }
  // header 부분의 progress-text 관련 메소드
  updateProgressText() {
    this.progressText.editValue(`${this.completedGoals}/${this.totalGoals}`);
  }

  // header 부분의 progress-bar 관련 메소드
  updateProgressBar() {
    const accomplish = Math.round(
      (this.completedGoals / this.totalGoals) * 100,
    );

    this.progressBar.changeStyle('width', `${!accomplish ? 0 : accomplish}%`);
    this.progressBar.editValue(accomplish ? accomplish : '');

    if (accomplish === 100) {
      this.progressBar.changeStyle('box-shadow', '0 0 10px red');
      return;
    }
    this.progressBar.changeStyle('box-shadow', '');
  }

  // input 의 Enter키가 눌리면 textSubmit 의 click 이벤트를 발생시키는 메소드
  enterToSubmit(event) {
    if (event.key !== 'Enter') return;
    this.textSubmit.node.click();
  }

  addGoal() {
    // 만약 input 에 적힌 값이 없다면 시행하지 않기
    if (!this.input.getText()) return;

    // content에 innerWrapper 추가하기
    const innerWrapper = new Node(
      'div',
      null,
      `inner-wrapper${this.totalGoals + 1}`, // 목표를 추가 할 때 마다 id 값 생성
      null,
    );

    this.content.appendNode(innerWrapper);

    requestAnimationFrame(() => {
      innerWrapper.changeStyle('width', '90%');
      innerWrapper.changeStyle('height', '30px');
    });

    // buttonWrapper에 button 넣기

    const buttonWrapper = new Node('div', null, null, 'button-wrapper');
    const completeButton = new Node(
      'button',
      '⭕',
      `${this.totalGoals + 1}`,
      'complete',
    );
    const deleteButton = new Node(
      'button',
      '❌️',
      `${this.totalGoals + 1}`,
      'delete',
    );

    [completeButton, deleteButton].forEach((button) =>
      buttonWrapper.appendNode(button),
    );

    // innerWrapper에 input에 적힌 값 넣기

    const typedGoal = new Node(
      'div',
      this.input.getText(),
      `typed-goal${this.totalGoals + 1}`,
      'uncompleted',
    );

    innerWrapper.appendNode(typedGoal);
    requestAnimationFrame(() => {
      typedGoal.changeStyle('opacity', '1');
    });

    // innerWrappe에 button 넣기

    innerWrapper.appendNode(buttonWrapper);
    requestAnimationFrame(() => {
      buttonWrapper.changeStyle('opacity', '1');
    });

    // 목표 수와 progress bar 변경하기
    this.totalGoals += 1;
    this.updateProgressBar();
    this.updateProgressText();

    // 목표를 정하면 input 값 비우기

    this.input.node.value = '';
  }

  // ⭕ 버튼이 눌리면 성취된 목표로 변경하는 함수

  completeGoal(id) {
    const typedGoal = document.querySelector(`#typed-goal${id}`);
    const innerWapper = document.querySelector(`#inner-wrapper${id}`);
    typedGoal.className = 'completed';
    typedGoal.style.textDecoration = 'line-through';
    typedGoal.style.color = '#aaa';
    innerWapper.style.boxShadow = '0px 0px 5px blue';
  }

  // ❌️ 버튼이 눌리면 삭제된 목표로 변경하는 함수

  deleteGoal(id) {
    const innerWrapper = document.querySelector(`#inner-wrapper${id}`);
    console.log(innerWrapper);

    [...innerWrapper.children].forEach((tag) => innerWrapper.removeChild(tag));

    setTimeout(() => {
      this.content.removeNode(innerWrapper);
    }, 3000);
    innerWrapper.style.padding = '0px';
    requestAnimationFrame(() => {
      innerWrapper.style.width = '0%';
      innerWrapper.style.height = '0%';
    });
  }

  changeGoal(event) {
    if (event.target.tagName !== 'BUTTON') return;
    const button = event.target;
    const id = button.id;
    const status = button.className;
    const typedGoals = document.querySelector(`#typed-goal${id}`);

    if (status[0] === 'c') {
      this.completeGoal(id);
      this.completedGoals += 1;
      button.id = '';
    } else {
      this.deleteGoal(id);
      if (typedGoals.className === 'completed') this.completedGoals -= 1;
      this.totalGoals -= 1;
    }

    this.updateProgressText();
    this.updateProgressBar();
  }
}

// 이벤트 핸들러 등록
const toDoList = new ToDoList();

// enter 키를 submit 클릭으로
toDoList.input.node.addEventListener('keyup', (event) =>
  toDoList.enterToSubmit(event),
);

// 목록 추가하기
toDoList.textSubmit.node.addEventListener('click', () => toDoList.addGoal());

// 목록 달성하거나 삭제하기
toDoList.content.node.addEventListener('click', (event) =>
  toDoList.changeGoal(event),
);
