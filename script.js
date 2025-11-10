// This file contains the code to SUBMIT the contact form data to API Gateway.

// *** CRITICAL STEP: REPLACE THIS WITH YOUR ACTUAL API GATEWAY INVOKE URL ***
const API_BASE_URL = 'https://tigxq01pc7.execute-api.ap-south-1.amazonaws.com/prod'; // Example: 'https://xxxxxxx.execute-api.us-east-1.amazonaws.com/prod'

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop default form submission

            const submitButton = document.getElementById('submitButton');
            const formStatus = document.getElementById('formStatus');

            // Initial UI update
            formStatus.style.color = '#CC0000';
            formStatus.textContent = 'Submitting inquiry... Please wait.';
            submitButton.disabled = true;

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                query: document.getElementById('message').value, 
            };
            
            fetch(API_BASE_URL + '/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    // Handle HTTP error statuses
                    return response.json().then(err => { 
                        throw new Error(err.error || `HTTP error! Status: ${response.status}`); 
                    });
                }
                return response.json();
            })
            .then(result => {
                formStatus.style.color = 'green';
                formStatus.textContent = result.message || 'Thank you for your inquiry! We will contact you shortly.';
                form.reset(); // Clear the form on success
            })
            .catch(error => {
                console.error('Submission error:', error);
                formStatus.style.color = 'red';
                formStatus.textContent = `Error: Submission failed. Check console for details.`;
            })
            .finally(() => {
                submitButton.disabled = false;
            });
        });
    }
});