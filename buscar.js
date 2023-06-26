document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  searchInput.addEventListener('input', performSearch);

  function performSearch() {
    const searchValue = searchInput.value.trim().toLowerCase();

    if (searchValue === '') {
      clearResults();
      return;
    }

    fetch('http://localhost:3000/api/v1/customers')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const filteredResults = data.filter(customer => {
            const customerName = customer.name.toLowerCase();
            return customerName.startsWith(searchValue);
          });
          renderResults(filteredResults);
        } else {
          throw new Error(data.error);
        }
      })
      .catch(error =>
        showError(`Ocorreu um erro ao buscar os clientes: ${error.message}`)
      );
  }

  function renderResults(results) {
    clearResults();

    if (results.length === 0) {
      searchResults.innerHTML = '<p>Nenhum cliente encontrado.</p>';
      return;
    }

    const ul = document.createElement('ul');

    results.forEach(customer => {
      const li = document.createElement('li');
      const customerInfo = `${customer.name} ${customer.lastName} - Código: ${customer.customerCode}`;
      li.textContent = customerInfo;
      ul.appendChild(li);
    });

    searchResults.appendChild(ul);
    searchResults.classList.add('visible'); // Adiciona a classe 'visible' para tornar os resultados visíveis
  }

  function clearResults() {
    searchResults.innerHTML = '';
    searchResults.classList.remove('visible'); // Remove a classe 'visible' para ocultar os resultados
  }

  function showError(message) {
    searchResults.innerHTML = `<p class="error">${message}</p>`;
    searchResults.classList.remove('visible'); // Remove a classe 'visible' para ocultar os resultados
  }
});