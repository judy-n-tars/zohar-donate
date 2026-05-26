// ── Configuration ──
const CONFIG = {
  goalAmount: 72000,
  currentAmount: 14311.67,
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
function formatCurrency(n, showCents) {
  if (showCents) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return '$' + n.toLocaleString('en-US');
}

// ── Render ──
function render() {
  var pct = CONFIG.goalAmount > 0
    ? Math.min((CONFIG.currentAmount / CONFIG.goalAmount) * 100, 100)
    : 0;

  amountRaisedEl.textContent = formatCurrency(CONFIG.currentAmount, true);
  goalAmountEl.textContent = formatCurrency(CONFIG.goalAmount, false);
  progressGoalLabel.textContent = formatCurrency(CONFIG.goalAmount, false);
  progressPct.textContent = Math.round(pct) + '%';

  donateBtn.href = CONFIG.donateUrl;

  // Animate progress bar
  setTimeout(function() {
    progressFill.style.width = pct + '%';
  }, 300);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', render);
