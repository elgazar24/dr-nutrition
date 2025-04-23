document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  // Form validation
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      let valid = true;
      const requiredFields = bookingForm.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value) {
          valid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!valid) {
        e.preventDefault();
        showNotification('Please fill in all required fields.', 'error');
      } else {
        showNotification('Form submitted successfully!', 'success');
      }
    });
  }

  const accordionToggles = document.querySelectorAll('.accordion-toggle');

  accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      // Toggle aria-expanded attribute
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);

      // Get the content panel
      const content = this.closest('.accordion-item').querySelector('.accordion-content');

      // Toggle the content panel
      if (expanded) {
        // Close the panel
        content.style.maxHeight = null;
      } else {
        // Open the panel
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Add smooth animations to form elements
  const formControls = document.querySelectorAll('.form-control');
  formControls.forEach(control => {
    control.addEventListener('focus', function () {
      this.parentElement.classList.add('focused');
    });

    control.addEventListener('blur', function () {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });

    // Initialize with value check (for browser autofill)
    if (control.value) {
      control.parentElement.classList.add('focused');
    }
  });
});



function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add close button
  const closeBtn = document.createElement('span');
  closeBtn.className = 'notification-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  };
  notification.appendChild(closeBtn);

  // Add to document
  document.body.appendChild(notification);

  // Show with animation (reduce timeout for better UX)
  setTimeout(() => {
    notification.classList.add('show');
  }, 10); // Much shorter delay for better responsiveness

  // Auto-remove after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}