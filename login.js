document.addEventListener('DOMContentLoaded', function() {
    const usernameElement = document.getElementById('username');
    const accessToken = sessionStorage.getItem('accessToken');
    
    // if (accessToken) {
    //   // Fazer uma chamada API usando o access token para obter informações do usuário
    //   fetch('http://localhost:3000/api/v1/user/'+ usernameElement, {
    //     headers: {
    //       'Authorization': 'Bearer ' + accessToken
    //     }
    //   })
    //     .then(function(response) {
    //       if (response.ok) {
    //         return response.json();
    //       } else {
    //         throw new Error('Erro ao obter informações do usuário.');
    //       }
    //     })
    //     .then(function(data) {
    //       // Exibir o nome do usuário no header
    //       usernameElement.textContent = 'Bem-vindo, ' + data.firstName + ' ' + data.lastName;
    //     })
    //     .catch(function(error) {
    //       console.error('Ocorreu um erro ao obter informações do usuário:', error);
    //     });
    // }
  
    document.getElementById('login-button').addEventListener('click', function() {
      var email = document.getElementById('username').value;
      var password = document.getElementById('password').value;
  
      if (email === '' || password === '') {
        showError('Por favor, preencha todos os campos de login.');
        return;
      }
  
      // Validação adicional, se necessário
  
      fetch('https://instacodehelper.cyclic.app/api/v1/user/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            throw new Error('Usuário não existe. Por favor, tente novamente.');
          } else {
            throw new Error('Ocorreu um erro durante a autenticação. Por favor, tente novamente.');
          }
        })
        .then(function(data) {
          // Armazenar o nome do usuário no sessionStorage
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('username', data.firstName);
          sessionStorage.setItem('accessToken', data.token);
          window.location.href = 'dashboard.html';
        })
        .catch(function(error) {
          console.error('Ocorreu um erro durante a autenticação:', error);
          showError(error.message);
        });
    });
  
    function showError(message) {
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement.textContent = message;
    }
  });