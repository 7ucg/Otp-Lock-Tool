function startSpam() {
    const ddi = document.getElementById('country-code').value;
    const number = document.getElementById('number').value;
    const phoneNumber = ddi + number;
    
    fetch('/start-spam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber, ddi, number })
    })
    .then(response => {
      if (response.ok) {
        console.log('Spam started successfully.');
      } else {
        console.error('Failed to start spam.');
      }
    })
    .catch(error => {
      console.error('Error occurred while starting spam:', error);
    });
  }
  