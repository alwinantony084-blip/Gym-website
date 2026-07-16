/* ==========================================================================
   GYM HUB PREMIUM JAVASCRIPT
   Logic for Pricing Button Toggles, Offer Countdown Clocks, and FAQ Accordions.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. PRICING BUTTON TOGGLE LOGIC
  const monthlyToggleBtn = document.getElementById('monthly-toggle-btn');
  const yearlyToggleBtn = document.getElementById('yearly-toggle-btn');

  const starterPriceBox = document.getElementById('starter-price-container');
  const premiumPriceBox = document.getElementById('premium-price-container');
  const elitePriceBox = document.getElementById('elite-price-container');

  const pricingData = {
    monthly: {
      starter: { val: '₹999', period: '/mo' },
      premium: { val: '₹1999', period: '/mo' },
      elite: { val: '₹3499', period: '/mo' }
    },
    yearly: {
      starter: { val: '₹10,999', period: '/yr <br><span class="save-badge">Save 15%</span>' },
      premium: { val: '₹19,999', period: '/yr <br><span class="save-badge">Save 17%</span>' },
      elite: { val: '₹34,999', period: '/yr <br><span class="save-badge">Save 17%</span>' }
    }
  };

  function updatePrices(isYearly) {
    const periodKey = isYearly ? 'yearly' : 'monthly';
    
    if (isYearly) {
      yearlyToggleBtn.classList.add('active');
      monthlyToggleBtn.classList.remove('active');
    } else {
      monthlyToggleBtn.classList.add('active');
      yearlyToggleBtn.classList.remove('active');
    }

    if (starterPriceBox) {
      starterPriceBox.querySelector('.path-price').textContent = pricingData[periodKey].starter.val;
      starterPriceBox.querySelector('.path-period').innerHTML = pricingData[periodKey].starter.period;
    }

    if (premiumPriceBox) {
      premiumPriceBox.querySelector('.path-price').textContent = pricingData[periodKey].premium.val;
      premiumPriceBox.querySelector('.path-period').innerHTML = pricingData[periodKey].premium.period;
    }

    if (elitePriceBox) {
      elitePriceBox.querySelector('.path-price').textContent = pricingData[periodKey].elite.val;
      elitePriceBox.querySelector('.path-period').innerHTML = pricingData[periodKey].elite.period;
    }
  }

  if (monthlyToggleBtn && yearlyToggleBtn) {
    monthlyToggleBtn.addEventListener('click', () => updatePrices(false));
    yearlyToggleBtn.addEventListener('click', () => updatePrices(true));
  }

  // 2. SEASONAL ACCELERATORS COUNTDOWN TIMERS
  const timers = document.querySelectorAll('.acc-timer');

  timers.forEach(timer => {
    const targetDateStr = timer.getAttribute('data-date');
    if (!targetDateStr) return;

    const targetDate = new Date(targetDateStr).getTime();

    const daysEl = timer.querySelector('.days');
    const hoursEl = timer.querySelector('.hours');
    const minutesEl = timer.querySelector('.minutes');
    const secondsEl = timer.querySelector('.seconds');

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        timer.innerHTML = '<div style="color: #ff4d5a; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.5px;">EXPIRED</div>';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

    }, 1000);
  });

  // 3. FAQ ACCORDION LOGIC
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const currentItem = question.parentElement;
      const isOpen = currentItem.classList.contains('active');

      // Close all other accordion items
      document.querySelectorAll('.faq-item, .faq-accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current item
      if (!isOpen) {
        currentItem.classList.add('active');
      }
    });
  });

});
