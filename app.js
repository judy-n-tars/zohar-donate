// ── Configuration ──
const CONFIG = {
  goalAmount: 72000,
  currentAmount: 8573,
  donateUrl: 'https://onehouse.kabbalah.com/en/giving/?fund=young-adults-zohar-2026',
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

// ── Init ──
document.addEventListener('DOMContentLoaded', render);
