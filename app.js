// ── Configuration ──
// Update these values to reflect real data
const CONFIG = {
  goalAmount: 50000,         // Total goal in dollars
  currentAmount: 0,          // Amount raised so far
  donorCount: 0,             // Number of donors
  daysLeft: 60,              // Days remaining in campaign
  donateUrl: 'https://your-donation-link.example.com', // Replace with real link
  // Recent donors: { name, amount, time }
  donors: []
};

// ── DOM Elements ──
const amountRaisedEl = document.getElementById('amount-raised');
const goalAmountEl = document.getElementById('goal-amount');
const progressFill = document.getElementById('progress-fill');
const donorCountEl = document.getElementById('donor-count');
const daysLeftEl = document.getElementById('days-left');
const donateBtns = document.querySelectorAll('.donate-btn');
const donorsList = document.getElementById('donors-list');

// ── Format Currency ──
function formatCurrency(amount) {
  return '$' + amount.toLocaleString('en-US');
}

// ── Animate Counter ──
function animateCounter(el, target, prefix = '', duration = 1200) {
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = prefix + current.toLocaleString('en-US');
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ── Render Progress ──
function renderProgress() {
  const pct = Math.min((CONFIG.currentAmount / CONFIG.goalAmount) * 100, 100);
  amountRaisedEl.textContent = formatCurrency(CONFIG.currentAmount);
  goalAmountEl.textContent = formatCurrency(CONFIG.goalAmount);
  donorCountEl.textContent = CONFIG.donorCount.toString();
  daysLeftEl.textContent = CONFIG.daysLeft > 0 ? CONFIG.daysLeft.toString() : 'Ended';

  // Animate progress bar
  setTimeout(() => {
    progressFill.style.width = pct + '%';
  }, 300);

  // Animate the dollar amount
  animateCounter(amountRaisedEl, CONFIG.currentAmount, '$');
}

// ── Render Donors ──
function renderDonors() {
  if (CONFIG.donors.length === 0) {
    donorsList.innerHTML = '<p class="donors-empty">Be the first to donate — every contribution counts!</p>';
    return;
  }

  donorsList.innerHTML = CONFIG.donors.map(d => `
    <div class="donor-card">
      <div>
        <span class="donor-name">${d.name}</span>
        <span class="donor-time" style="margin-left: 8px">${d.time}</span>
      </div>
      <span class="donor-amount">${formatCurrency(d.amount)}</span>
    </div>
  `).join('');
}

// ── Set Donate Links ──
function setDonateLinks() {
  donateBtns.forEach(btn => {
    if (btn.tagName === 'A') {
      btn.href = CONFIG.donateUrl;
    }
  });
}

// ── Initialize ──
function init() {
  renderProgress();
  renderDonors();
  setDonateLinks();
}

document.addEventListener('DOMContentLoaded', init);