function submitForm(event) {
  
    event.preventDefault();
  
    const form = document.getElementById('customer-form');
    const formData = new FormData(form);
  
    const payload = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      city: formData.get('city'),
      state: formData.get('state'),
      address: formData.get('address'),
      customerCode: formData.get('customerCode')
      
    };
  
    fetch('http://localhost:3000/api/v1/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          document.getElementById('message').textContent = 'Dados enviados com sucesso!';
          form.reset();
        } else {
          throw new Error('Ocorreu um erro ao enviar os dados.');
        }
      })
      .catch(error => {
        console.error(error);
        document.getElementById('message').textContent = 'Ocorreu um erro ao enviar os dados.';
      });
  }
  
  const form = document.getElementById('customer-form');
  form.addEventListener('submit', submitForm);