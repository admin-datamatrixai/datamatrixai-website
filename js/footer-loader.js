// Replace with your Google Apps Script Web App URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyzoU5jxlwt2ARPADdNhDiVGj-A0En7lR1BYflhSPtHZUzuwD0UvYgZmJ8Xaw6oEBWN/exec";

document.addEventListener("DOMContentLoaded", () => {
    fetch("footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load footer HTML");
            }
            return response.text();
        })
        .then(data => {
            // 1. Inject footer into DOM
            document.body.insertAdjacentHTML("beforeend", data);

            // 2. Initialize Newsletter Form AFTER the HTML is injected
            initNewsletterForm();
        })
        .catch(error => console.error("Error loading footer:", error));
});

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterSubmitBtn = document.getElementById('newsletterSubmitBtn');
    const newsletterSuccessMsg = document.getElementById('newsletterSuccessMsg');

    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = newsletterEmail.value.trim();
        if (!email) return;

        newsletterSubmitBtn.disabled = true;
        newsletterSubmitBtn.innerText = "Submitting...";

        // Use FormData instead of URLSearchParams
        const formData = new FormData();
        formData.append('action', 'subscribe');
        formData.append('email', email);

        fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                newsletterForm.style.display = 'none';
                newsletterSuccessMsg.style.display = 'block';
            } else {
                alert('An error occurred. Please try again.');
                newsletterSubmitBtn.disabled = false;
                newsletterSubmitBtn.innerText = "Subscribe";
            }
        })
        .catch(error => {
            console.error('Newsletter submission error:', error);
            alert('Could not submit email. Please try again.');
            newsletterSubmitBtn.disabled = false;
            newsletterSubmitBtn.innerText = "Subscribe";
        });
    });
}