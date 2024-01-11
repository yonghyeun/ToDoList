$content.addEventListener('click', (event) => {
  // 요구되는 사항이 아니면 얼리 리턴

  if (event.target.tagName !== 'BUTTON') return;
  if (!event.target.classList.contains('complete')) return;
  const $button = event.target;
  const $typedGoal = event.target.parentNode.previousSibling;

  const text = $typedGoal.textContent;

  fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text }),
  })
    .then(() => {
      $button.classList.remove('complete');
      $button.classList.add('off');
    })
    .catch(console.error);
});
