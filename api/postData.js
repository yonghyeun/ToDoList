$submit.addEventListener('click', () => {
  totalGoals += 1;
  if ($input.value === '') return;
  try {
    fetch(url + '/uncompleted', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: totalGoals - completedGoals,
        text: $input.value,
      }),
    }).then(() => {
      $input.value = '';
    });
  } catch (e) {
    console.log(e);
    $input.value = '';
  }
});
