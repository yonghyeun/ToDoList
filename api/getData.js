const url = 'http://localhost:3000/todo';

const makePage = (todoLists, stateName) => {
  todoLists.forEach((todo) => {
    // node 를 만들어 parentNode 에 담기
    const isCompleted = stateName === 'completed';
    const $parentNode = isCompleted ? $zoneCompleted : $zoneUncompleted;
    const $innerWrapper = document.createElement('div');
    $innerWrapper.classList.add('inner-wrapper');
    $parentNode.appendChild($innerWrapper);

    // todo 에 들어있는 text를 typedGoal 노드에 적기
    const $typedGoal = document.createElement('div');
    $typedGoal.classList.add('typed-goal');
    if (isCompleted) $typedGoal.classList.add('completed');
    $typedGoal.textContent = todo.text;
    $innerWrapper.appendChild($typedGoal);

    // button wrapper 와 button 만들기

    const $buttonWrapper = document.createElement('div');
    $buttonWrapper.classList.add('button-wrapper');

    const $complete = document.createElement('button');
    const $delete = document.createElement('button');

    [$complete.textContent, $delete.textContent] = ['⭕', '❌️'];
    $complete.classList.add(isCompleted ? 'off' : 'complete');

    if (!isCompleted) $complete.classList.add('complete');
    $delete.classList.add('delete');
    [$complete, $delete].forEach((button) =>
      $buttonWrapper.appendChild(button),
    );

    $innerWrapper.appendChild($buttonWrapper);

    requestAnimationFrame(() => {
      $innerWrapper.style.width = '90%';
      $innerWrapper.style.height = '30px';
      $buttonWrapper.style.opacity = '1'; // 서서히 나타나는 효과
      $typedGoal.style.opacity = '1';
    });
  });
};

try {
  fetch(url)
    .then((res) => res.json())
    .then(({ uncompleted, completed }) => {
      makePage(uncompleted, 'uncompleted');
      makePage(completed, 'completed');
      totalGoals += uncompleted.length + completed.length;
      completedGoals += completed.length;
      updateProgressText();
      updateProgressBar();
    })
    .catch((e) => console.error(e));
} catch (e) {
  console.log(e);
}
