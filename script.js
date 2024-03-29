const local = 'http://localhost:3000/api/v1/customers';
const server = 'https://instacodehelper.cyclic.app/api/v1/customers';

// Função para exibir o modal
function showModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Evento de clique no botão "Sim" do modal
document.getElementById('continueButton').addEventListener('click', function() {
  closeModal();
  form.reset();
});

// Evento de clique no botão "Voltar ao Dashboard" do modal
document.getElementById('dashboardButton').addEventListener('click', function() {
  closeModal();
  window.location.href = 'dashboard.html';
});

// Função para exibir mensagem de sucesso e abrir o modal
function showSuccessMessage() {
  document.getElementById('message').textContent = 'Obrigado por colaborar!';
  showModal();
}

function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById('customer-form');
  const formData = new FormData(form);

  const payload = {
    name: formData.get('name').toLowerCase(),
    lastName: formData.get('lastName').toLowerCase(),
    city: formData.get('city').toLowerCase(),
    state: formData.get('state').toLowerCase(),
    address: formData.get('address').toLowerCase(),
    customerCode: formData.get('customerCode').toLowerCase()
  };

  const accessToken = sessionStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': accessToken
  };

  fetch(server, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.ok) {
        showSuccessMessage();
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

const customerCodeInput = document.getElementById('customerCode');

customerCodeInput.addEventListener('input', () => {
  const value = customerCodeInput.value;
  if (value.length > 4) {
    customerCodeInput.value = value.slice(0, 4);
  }
});

customerCodeInput.addEventListener('input', () => {
  const value = customerCodeInput.value;
  customerCodeInput.value = value.replace(/\D/g, '');
});

// Captura de voz
const voiceButton = document.getElementById('voiceButton');

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  let activeField = null;

  recognition.lang = 'pt-BR';
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceButton.addEventListener('mousedown', () => {
    recognition.start();
    voiceButton.classList.add('active');
  });

  voiceButton.addEventListener('mouseup', () => {
    recognition.stop();
    voiceButton.classList.remove('active');
  });

  recognition.addEventListener('result', (event) => {
    const voiceResult = event.results[0][0].transcript.trim();

    if (activeField) {
      activeField.value = voiceResult;
      activeField = null;
    }
  });

  recognition.addEventListener('error', (event) => {
    console.error('Erro de reconhecimento de voz:', event.error);
  });

  // Função para iniciar o reconhecimento de voz no campo específico
  function startRecognition(fieldName) {
    activeField = form.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"]`);
    if (activeField) {
      recognition.start();
      voiceButton.classList.add('active');
    }
  }

  // Adicionar o evento de clique do ícone de microfone a cada campo
  const voiceIcons = document.querySelectorAll('.voice-icon');
  voiceIcons.forEach(icon => {
    const fieldName = icon.getAttribute('data-field');
    icon.addEventListener('click', () => {
      startRecognition(fieldName);
    });
  });
} else {
  voiceButton.disabled = true;
  console.error('A API SpeechRecognition não é suportada neste navegador.');
}