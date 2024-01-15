$content.addEventListener('click', (event) => {
  if (
    event.target.tagName !== 'BUTTON' ||
    !event.target.classList.contains('delete')
  )
    return;
  try {
    const $button = event.target;
    const $typedGoal = $button.parentNode.previousSibling;
    const text = $typedGoal.textContent;

    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    }).catch(console.error);
  } catch (e) {
    console.log(e);
  }
});
