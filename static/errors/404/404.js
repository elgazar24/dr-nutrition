// Set the countdown date (30 days from now)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 30);

// Update the countdown every second
const countdownTimer = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  
  // Calculate days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Display the result
  document.getElementById("countdown-days").innerHTML = days < 10 ? "0" + days : days;
  document.getElementById("countdown-hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("countdown-minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("countdown-seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
  
  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(countdownTimer);
    document.querySelector(".countdown-container").innerHTML = "<h3>We're Ready!</h3><p>Refresh the page to see our new content.</p>";
  }
}, 1000);

// Show the subscribe form when clicking on the notify button
document.querySelector('.notify-btn').addEventListener('click', function(e) {
  e.preventDefault();
  const subscribeForm = document.getElementById('subscribe-form');
  subscribeForm.style.display = subscribeForm.style.display === 'none' ? 'block' : 'none';
});