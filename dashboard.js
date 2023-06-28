document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');
    const accessToken = sessionStorage.getItem('accessToken');
    const usernameElement = document.getElementById('username');
  
    if (!accessToken) {
      // Redirecionar o usuário para a página de login
      window.location.href = 'notfound.html';
      return;
    }
  
    // Evento de clique no botão de encerrar sessão
    logoutButton.addEventListener('click', function() {
      // Limpar o sessionStorage
      sessionStorage.removeItem('accessToken');
      // Redirecionar o usuário para a página de login
      window.location.href = 'index.html';
    });
  
    // Obter o email do usuário logado
    const email = sessionStorage.getItem('email');
  
    // Fazer a requisição para obter os dados do usuário
    fetch(`https://instacodehelper.cyclic.app/api/v1/user/${email}`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao obter os dados do usuário.');
        }
      })
      .then(user => {
        // Exibir a mensagem de boas-vindas
        usernameElement.textContent = `Bem-vindo, ${user.firstName} ${user.lastName}`;
      })
      .catch(error => {
        console.error('Ocorreu um erro ao obter os dados do usuário:', error);
      });
  });