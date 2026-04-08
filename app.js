// ===========================
//  PATHOGEN ATLAS — APP LOGIC
// ===========================

let selectedSymptoms = [];
let currentAnimTarget = null;

// ---- NAVIGATION ----
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  const navLink = document.querySelector(`[data-page="${page}"]`);
  if (navLink) navLink.classList.add('active');
  window.scrollTo(0, 0);
  stopAnimation();
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.page);
  });
});

document.querySelector('.nav-logo').addEventListener('click', () => navigate('home'));

// ---- BURGER MENU ----
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
navBurger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.right = '20px';
  navLinks.style.background = 'var(--bg3)';
  navLinks.style.border = '1px solid var(--border2)';
  navLinks.style.borderRadius = '12px';
  navLinks.style.padding = '12px';
  navLinks.style.gap = '4px';
});

// ---- SYMPTOM CHECKER ----
const symptomInput = document.getElementById('symptomInput');
const symptomSuggestions = document.getElementById('symptomSuggestions');
const selectedSymptomsDiv = document.getElementById('selectedSymptoms');

// Show quick-pick suggestions
function renderQuickSymptoms() {
  symptomSuggestions.innerHTML = '';
  QUICK_SYMPTOMS.forEach(s => {
    if (!selectedSymptoms.includes(s)) {
      const pill = document.createElement('span');
      pill.className = 'suggestion-pill';
      pill.textContent = s;
      pill.addEventListener('click', () => addSymptom(s));
      symptomSuggestions.appendChild(pill);
    }
  });
}

function addSymptom(symptom) {
  const normalized = symptom.toLowerCase().trim();
  if (!normalized || selectedSymptoms.includes(normalized)) return;
  selectedSymptoms.push(normalized);
  renderSelectedSymptoms();
  renderQuickSymptoms();
  symptomInput.value = '';
  hideResults();
}

function removeSymptom(symptom) {
  selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
  renderSelectedSymptoms();
  renderQuickSymptoms();
  hideResults();
}

function renderSelectedSymptoms() {
  const container = document.getElementById('symptomTagsContainer');
  // Remove old tags but keep input
  Array.from(container.querySelectorAll('.symptom-tag')).forEach(el => el.remove());
  selectedSymptoms.forEach(s => {
    const tag = document.createElement('span');
    tag.className = 'symptom-tag';
    tag.innerHTML = `${s}<button onclick="removeSymptom('${s}')">×</button>`;
    container.insertBefore(tag, symptomInput);
  });
}

// Autocomplete
symptomInput.addEventListener('input', e => {
  const val = e.target.value.toLowerCase().trim();
  if (!val) { renderQuickSymptoms(); return; }
  const matches = ALL_SYMPTOMS.filter(s => s.toLowerCase().includes(val) && !selectedSymptoms.includes(s.toLowerCase())).slice(0, 8);
  symptomSuggestions.innerHTML = '';
  matches.forEach(s => {
    const pill = document.createElement('span');
    pill.className = 'suggestion-pill';
    pill.textContent = s;
    pill.addEventListener('click', () => addSymptom(s));
    symptomSuggestions.appendChild(pill);
  });
});

symptomInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && symptomInput.value.trim()) {
    addSymptom(symptomInput.value.trim());
  }
});

function hideResults() {
  const resultsDiv = document.getElementById('checkerResults');
  if (resultsDiv) resultsDiv.style.display = 'none';
}

// ---- ANALYZE ----
function analyzeSymptoms() {
  if (selectedSymptoms.length === 0) {
    symptomInput.focus();
    symptomInput.placeholder = '⚠ Please enter at least one symptom first...';
    setTimeout(() => symptomInput.placeholder = 'Type a symptom and press Enter...', 2500);
    return;
  }

  const allDiseases = [
    ...DISEASES.bacterial,
    ...DISEASES.viral,
    ...DISEASES.fungal,
    ...DISEASES.protozoan
  ];

  const scored = allDiseases.map(disease => {
    const matched = disease.symptoms.filter(symptom =>
      selectedSymptoms.some(sel =>
        symptom.toLowerCase().includes(sel) || sel.includes(symptom.toLowerCase().split(' ')[0])
      )
    );
    const score = matched.length / disease.symptoms.length;
    return { disease, matched, score, matchCount: matched.length };
  }).filter(r => r.matchCount > 0)
    .sort((a, b) => b.score - a.score || b.matchCount - a.matchCount)
    .slice(0, 9);

  const resultsDiv = document.getElementById('checkerResults');
  const grid = document.getElementById('resultsGrid');
  grid.innerHTML = '';

  if (scored.length === 0) {
    grid.innerHTML = '<div class="no-results"><span>🔍</span>No matches found. Try different or additional symptoms.</div>';
  } else {
    scored.forEach((result, i) => {
      const typeClass = { bacterial: 'bact', viral: 'viral', fungal: 'fungal', protozoan: 'proto' }[result.disease.type];
      const matchPct = Math.round(result.score * 100);
      const card = document.createElement('div');
      card.className = `result-card ${typeClass}`;
      card.style.animationDelay = `${i * 0.07}s`;
      card.innerHTML = `
        <div class="result-match">${result.disease.type} · ${matchPct}% match</div>
        <div class="result-name">${result.disease.name}</div>
        <div class="result-organism">${result.disease.organism}</div>
        <div class="result-symptoms-matched">${result.matchCount} of ${result.disease.symptoms.length} symptoms matched</div>
        <div class="match-bar-wrap"><div class="match-bar" style="width:${matchPct}%"></div></div>
      `;
      card.addEventListener('click', () => openDiseaseModal(result.disease));
      grid.appendChild(card);
    });
  }

  resultsDiv.style.display = 'block';
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---- DISEASE MODAL ----
const COLOR_MAP = {
  bacterial: '#00e5a0',
  viral: '#ff6b6b',
  fungal: '#f7c948',
  protozoan: '#a78bfa'
};

function getModalClass(type) {
  return { bacterial: 'modal-bact', viral: 'modal-viral', fungal: 'modal-fungal', protozoan: 'modal-proto' }[type] || '';
}

function buildModalHTML(disease) {
  const typeLabel = { bacterial: 'Bacterial', viral: 'Viral', fungal: 'Fungal', protozoan: 'Protozoan' }[disease.type];
  return `
    <div class="${getModalClass(disease.type)}">
      <span class="modal-category-badge">${typeLabel}</span>
      <div class="modal-title">${disease.name}</div>
      <div class="modal-organism">Causative Organism: <em>${disease.organism}</em></div>

      <div class="modal-section-title">Symptoms</div>
      <div class="modal-symptoms-list">
        ${disease.symptoms.map(s => `<span class="symptom-chip">${s}</span>`).join('')}
      </div>

      <div class="modal-section-title">Transmission</div>
      <p style="color:var(--text2);font-size:16px;margin-bottom:12px;">${disease.transmission || '—'}</p>

      <div class="modal-section-title">Treatment</div>
      <div class="modal-treatment">${disease.treatment}</div>

      <div class="modal-section-title">Mode of Action Animation</div>
    </div>
  `;
}

function openDiseaseModal(disease) {
  const modal = document.getElementById('diseaseModal');
  const body = document.getElementById('modalBody');
  body.innerHTML = buildModalHTML(disease);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  stopAnimation();
  setTimeout(() => {
    const label = document.getElementById('animLabel');
    if (label) label.textContent = `Animation: ${disease.animation.replace(/_/g, ' ').toUpperCase()}`;
    runAnimation('animCanvas', disease.animation, COLOR_MAP[disease.type]);
  }, 100);
}

function closeModal() {
  document.getElementById('diseaseModal').style.display = 'none';
  document.body.style.overflow = '';
  stopAnimation();
}

// Browse modal
function openBrowseModal(disease) {
  const modal = document.getElementById('browseModal');
  const body = document.getElementById('browseModalBody');
  body.innerHTML = buildModalHTML(disease);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  stopAnimation();
  setTimeout(() => {
    const label = document.getElementById('browseAnimLabel');
    if (label) label.textContent = `Animation: ${disease.animation.replace(/_/g, ' ').toUpperCase()}`;
    runAnimation('browseAnimCanvas', disease.animation, COLOR_MAP[disease.type]);
  }, 100);
}

function closeBrowseModal() {
  document.getElementById('browseModal').style.display = 'none';
  document.body.style.overflow = '';
  stopAnimation();
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeBrowseModal(); }
});

// ---- RENDER DISEASE LISTS ----
function renderDiseaseList(containerId, diseases, cardClass) {
  const container = document.getElementById(containerId);
  if (!container) return;
  diseases.forEach(disease => {
    const typeLabel = { bacterial: 'Bacterial', viral: 'Viral', fungal: 'Fungal', protozoan: 'Protozoan' }[disease.type];
    const card = document.createElement('div');
    card.className = `disease-card ${cardClass}`;
    card.innerHTML = `
      <div class="disease-card-type">${typeLabel}</div>
      <div class="disease-card-name">${disease.name}</div>
      <div class="disease-card-org">${disease.organism}</div>
      <div class="disease-card-symptoms">${disease.symptoms.slice(0, 4).join(' · ')}</div>
      <div class="disease-card-footer">
        <span class="disease-card-btn">View Details →</span>
      </div>
    `;
    card.addEventListener('click', () => openBrowseModal(disease));
    container.appendChild(card);
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  // Init home canvas
  initHomeCanvas();
  initCategoryIcons();

  // Render disease lists
  renderDiseaseList('bacterialList', DISEASES.bacterial, 'bact-card');
  renderDiseaseList('viralList', DISEASES.viral, 'viral-card');
  renderDiseaseList('fungalList', DISEASES.fungal, 'fungal-card');
  renderDiseaseList('protozoanList', DISEASES.protozoan, 'proto-card');

  // Quick symptoms on checker
  renderQuickSymptoms();

  // Nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navLinks.style.display = 'none';
      }
    });
  });
});
