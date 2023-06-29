const local = 'http://localhost:3000/api/v1/customers';
const server = 'https://instacodehelper.cyclic.app/api/v1/customers';
let allCustomers = []; // Variável para armazenar todos os clientes

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const loadingMessage = document.getElementById('loading-message');

  searchInput.addEventListener('input', performSearch);

  // Fazer a request para obter todos os clientes
  const token = sessionStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': token
  };

  fetch(server, {
    headers: headers
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao buscar os clientes.');
      }
    })
    .then(data => {
      if (Array.isArray(data)) {
        allCustomers = data; // Armazenar os clientes na variável allCustomers
      } else {
        throw new Error(data.error);
      }
    })
    .catch(error =>
      showError(`Ocorreu um erro ao buscar os clientes: ${error.message}`)
    );

  function performSearch() {
    const searchValue = searchInput.value.trim().toLowerCase();

    if (searchValue === '') {
      clearResults();
      return;
    }

    showLoadingMessage(); // Exibe a mensagem de "Aguarde, por favor"

    const filteredResults = allCustomers.filter(customer => {
      const customerAddress = customer.address.toLowerCase();
      return customerAddress.includes(searchValue);
    });

    renderResults(filteredResults);

    hideLoadingMessage(); // Esconde a mensagem de "Aguarde, por favor"
  }

  function renderResults(results) {
    clearResults();

    if (results.length === 0) {
      searchResults.innerHTML = '<p>Nenhum cliente encontrado.</p>';
      return;
    }

    const table = document.createElement('table');
    table.classList.add('results-table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Nome', 'Sobrenome', 'Endereço', 'Código do Cliente'];

    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    results.forEach(customer => {
      const tr = document.createElement('tr');

      const customerNameCell = document.createElement('td');
      const customerLastNameCell = document.createElement('td');
      const customerAddressCell = document.createElement('td');
      const customerCodeCell = document.createElement('td');

      customerNameCell.textContent = customer.name;
      customerLastNameCell.textContent = customer.lastName;
      customerAddressCell.textContent = customer.address;
      customerCodeCell.textContent = customer.customerCode;

      tr.appendChild(customerNameCell);
      tr.appendChild(customerLastNameCell);
      tr.appendChild(customerAddressCell);
      tr.appendChild(customerCodeCell);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    searchResults.appendChild(table);
    searchResults.classList.add('visible'); // Adiciona a classe 'visible' para tornar os resultados visíveis
  }

  function clearResults() {
    searchResults.innerHTML = '';
    searchResults.classList.remove('visible'); // Remove a classe 'visible' para ocultar os resultados
  }

  function showLoadingMessage() {
    loadingMessage.textContent = 'Aguarde, por favor...';
    loadingMessage.classList.add('visible'); // Adiciona a classe 'visible' para tornar a mensagem visível
  }

  function hideLoadingMessage() {
    loadingMessage.textContent = '';
    loadingMessage.classList.remove('visible'); // Remove a classe 'visible' para ocultar a mensagem
  }

  function showError(message) {
    searchResults.innerHTML = `<p class="error">${message}</p>`;
    searchResults.classList.remove('visible'); // Remove a classe 'visible' para ocultar os resultados
  }
});