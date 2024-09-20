document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 200);
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'scale(1.1)';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });

        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const images = document.querySelectorAll('.image-container img');
    images.forEach(image => {
        image.addEventListener('mouseover', () => {
            image.style.transform = 'scale(1.05)';
        });
        image.addEventListener('mouseout', () => {
            image.style.transform = 'scale(1)';
        });
    });

    // Contact form validation
    const contactForm = document.querySelector('form[action="/submit-contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('All fields are required.');
                event.preventDefault();
            }
        });
    }

    // FAQ toggle
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');

            if (item.classList.contains('active')) {
                answer.style.display = 'block';  // Show the answer
            } else {
                answer.style.display = 'none';   // Hide the answer
            }
        });
    });
});
