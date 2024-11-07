// Set the target launch date
const targetDate = new Date("November 12, 2024 23:59:59").getTime();

// Update countdown every second
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Calculate time components
  const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update HTML content
  document.getElementById("months").innerText = months.toString().padStart(2, '0');
  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

  // If countdown is finished, stop the timer
  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".coming-soon-container").innerHTML = "<h1>We are live!</h1>";
  }
}, 1000);
