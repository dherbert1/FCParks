document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const form = e.target;
    const status = document.getElementById('form-status');
    const formData = new FormData(form);
  
    fetch('submit.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(result => {
      status.textContent = result;
      status.style.color = 'green';
      form.reset();
    })
    .catch(error => {
      status.textContent = 'Something went wrong. Please try again later.';
      status.style.color = 'red';
      console.error('Error:', error);
    });
  });
  