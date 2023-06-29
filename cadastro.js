document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.getElementById('signup-button');
  
    signupButton.addEventListener('click', function(event) {
      event.preventDefault();
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      // Validar os campos do formulário
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
  
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(firstName) || !/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(lastName)) {
        alert('Os campos de nome e sobrenome devem conter apenas letras.');
        return;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }
  
      if (!/^.{8,}$/.test(password)) {
        alert('A senha deve ter pelo menos 8 caracteres.');
        return;
      }
  
      if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
      }
  
      // Criar objeto com os dados do usuário
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
  
      // Enviar a requisição para criar o usuário no backend
      fetch('https://instacodehelper.cyclic.app/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        mode: 'cors'
      })
        .then(function(response) {
          if (response.ok) {
            // Redirecionar para a página de termos após o cadastro bem-sucedido
            window.location.href = 'termo.html';
          } else {
            throw new Error('Ocorreu um erro ao criar o usuário.');
          }
        })
        .catch(function(error) {
          console.log(error);
          alert('Ocorreu um erro ao criar o usuário. Por favor, tente novamente mais tarde.');
        });
    });
  });