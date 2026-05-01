// ── Configuration ──
const CONFIG = {
  goalAmount: 50000,
  currentAmount: 0,
  donorCount: 0,
  donateUrl: 'https://your-donation-link.example.com',
  donors: []
};

// ── DOM ──
const amountRaisedEl = document.getElementById('amount-raised');
const goalAmountEl = document.getElementById('goal-amount');
const progressFill = document.getElementById('progress-fill');
const donorCountEl = document.getElementById('donor-count');
const donateBtn = document.getElementById('donate-btn');
const donorsList = document.getElementById('donors-list');

// ── Helpers ──
function formatCurrency(n) {
  return '$' + n.toLocaleString('en-US');
}

function animateCounter(el, target, prefix, duration) {
  duration = duration || 1200;
  var start = performance.now();
  function tick(now) {
    var t = Math.min((now - start) / duration, 1);
    var eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + Math.round(target * eased).toLocaleString('en-US');
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── Render ──
function render() {
  var pct = CONFIG.goalAmount > 0
    ? Math.min((CONFIG.currentAmount / CONFIG.goalAmount) * 100, 100)
    : 0;

  goalAmountEl.textContent = formatCurrency(CONFIG.goalAmount);
  donorCountEl.textContent = CONFIG.donorCount.toString();

  // Animate amount
  animateCounter(amountRaisedEl, CONFIG.currentAmount, '$');

  // Animate bar after a small delay so transition is visible
  setTimeout(function() {
    progressFill.style.width = pct + '%';
  }, 200);

  // Donate link
  donateBtn.href = CONFIG.donateUrl;

  // Donors
  renderDonors();
}

function renderDonors() {
  if (!CONFIG.donors || CONFIG.donors.length === 0) {
    donorsList.innerHTML = '<p class="donors-empty">Be the first to donate — every contribution counts!</p>';
    return;
  }
  donorsList.innerHTML = CONFIG.donors.map(function(d) {
    return '<div class="donor-row">' +
      '<span class="donor-name">' + d.name + '</span>' +
      '<div class="donor-right">' +
        '<span class="donor-amount">' + formatCurrency(d.amount) + '</span>' +
        '<span class="donor-time">' + d.time + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

// ── Tabs ──
function switchTab(name) {
  var tabs = document.querySelectorAll('.tab');
  var contents = document.querySelectorAll('.tab-content');
  tabs.forEach(function(t) {
    t.classList.toggle('active', t.getAttribute('data-tab') === name);
  });
  contents.forEach(function(c) {
    if (c.id === 'tab-' + name) {
      c.style.display = '';
    } else {
      c.style.display = 'none';
    }
  });
}

// ── Share ──
function sharePage() {
  if (navigator.share) {
    navigator.share({ title: 'Help Zohar', url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href).then(function() {
      alert('Link copied to clipboard!');
    });
  }
}

// ── Init ──
document.addEventListener('DOMContentLoaded', render);