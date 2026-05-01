// ── Configuration ──
const CONFIG = {
  goalAmount: 72000,
  currentAmount: 5000,
  donateUrl: 'https://your-donation-link.example.com',
  donors: [
    { name: 'Sarah L.', initials: 'SL', color: '#2196f3', comment: 'So excited for this!' },
    { name: 'Ben G.', initials: 'BG', color: '#00bcd4', comment: 'A beautiful cause.' },
    { name: 'Maria P.', initials: 'MP', color: '#ff9800', comment: "Let's make it happen!" },
  ]
};

// ── DOM ──
const amountRaisedEl = document.getElementById('amount-raised');
const goalAmountEl = document.getElementById('goal-amount');
const progressFill = document.getElementById('progress-fill');
const progressPct = document.getElementById('progress-pct');
const progressGoalLabel = document.getElementById('progress-goal-label');
const donateBtn = document.getElementById('donate-btn');

// ── Helpers ──
function formatCurrency(n) {
  return '$' + n.toLocaleString('en-US');
}

// ── Render ──
function render() {
  var pct = CONFIG.goalAmount > 0
    ? Math.min((CONFIG.currentAmount / CONFIG.goalAmount) * 100, 100)
    : 0;

  amountRaisedEl.textContent = formatCurrency(CONFIG.currentAmount);
  goalAmountEl.textContent = formatCurrency(CONFIG.goalAmount);
  progressGoalLabel.textContent = formatCurrency(CONFIG.goalAmount);
  progressPct.textContent = Math.round(pct) + '%';

  donateBtn.href = CONFIG.donateUrl;

  // Animate progress bar
  setTimeout(function() {
    progressFill.style.width = pct + '%';
  }, 300);
}

// ── Tab Switching ──
document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
  });
});

// ── Init ──
document.addEventListener('DOMContentLoaded', render);