document.addEventListener('DOMContentLoaded', function() {
  const acceptButton = document.getElementById('acceptButton');
  const declineButton = document.getElementById('declineButton');

  if (acceptButton) {
    acceptButton.addEventListener('click', function() {
      // Recuperar os dados do usuário da URL
      const urlParams = new URLSearchParams(window.location.search);
      const firstName = urlParams.get('firstName');
      const lastName = urlParams.get('lastName');
      const email = urlParams.get('email');
      const password = urlParams.get('password');

      // Criar objeto com os dados do usuário
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        acceptedTerms: true
      };

      // Enviar a requisição para criar o usuário no banco de dados
      fetch('https://instacodehelper.cyclic.app/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        mode: 'cors' // Certifique-se de que essa opção esteja definida como 'cors'
      })
        .then(function(response) {
          if (response.ok) {
            // Redirecionar para a página do dashboard após o cadastro bem-sucedido
            window.location.href = 'dashboard.html';
          } else {
            throw new Error('Ocorreu um erro ao criar o usuário.');
          }
        })
        .catch(function(error) {
          console.log(error);
          // Exibir mensagem de erro e redirecionar para a página de index
          alert('Ocorreu um erro ao criar o usuário. Por favor, tente novamente mais tarde.');
          window.location.href = 'index.html';
        });
    });
  }

  if (declineButton) {
    declineButton.addEventListener('click', function() {
      // Redirecionar para a página de login
      window.location.href = 'index.html';
    });
  }
});