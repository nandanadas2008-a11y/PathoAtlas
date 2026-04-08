// ===========================
//  PATHOGEN ATLAS — ANIMATIONS
// ===========================

let animationFrame = null;

function stopAnimation() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

function runAnimation(canvasId, type, color) {
  stopAnimation();
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const t0 = performance.now();

  const animMap = {
    bacteria_lung: animBacteriaLung,
    bacteria_gut: animBacteriaGut,
    bacteria_bloodstream: animBactBloodstream,
    bacteria_skin: animBactSkin,
    bacteria_nerve: animBactNerve,
    bacteria_lymph: animBactLymph,
    bacteria_brain: animBactBrain,
    bacteria_throat: animBactThroat,
    bacteria_cell: animBactCell,
    virus_respiratory: animVirusRespiratory,
    virus_cell_hijack: animVirusCellHijack,
    virus_bloodstream: animVirusBloodstream,
    virus_liver: animVirusLiver,
    virus_nerve: animVirusNerve,
    virus_skin: animVirusSkin,
    virus_brain: animVirusBrain,
    virus_gut: animVirusGut,
    fungus_surface: animFungusSurface,
    fungus_lung: animFungusLung,
    fungus_brain: animFungusBrain,
    fungus_sinus: animFungusSinus,
    fungus_nerve: animFungusNerve,
    protozoa_rbc: animProtozooRBC,
    protozoa_macrophage: animProtozooMacrophage,
    protozoa_blood: animProtozooBlood,
    protozoa_gut: animProtozooGut,
    protozoa_brain: animProtooBrain,
    protozoa_cell: animProtozooCell,
    protozoa_heart: animProtozooHeart,
    protozoa_eye: animProtozooEye,
  };

  const fn = animMap[type] || animDefault;
  fn(ctx, W, H, t0, color);
}

function lerp(a, b, t) { return a + (b - a) * t; }
function hsl(h, s, l, a = 1) { return `hsla(${h},${s}%,${l}%,${a})`; }

// ========== BACTERIAL ANIMATIONS ==========

function animBacteriaLung(ctx, W, H, t0, color) {
  const bacteria = Array.from({length: 14}, (_, i) => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
    size: 6 + Math.random() * 8, phase: Math.random() * Math.PI * 2
  }));
  // Lung circles
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    // Background
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Draw lungs (simplified)
    ctx.save();
    const breathe = Math.sin(t * 1.5) * 10;
    // Left lung
    ctx.beginPath();
    ctx.ellipse(W/2 - 70, H/2, 55 + breathe/2, 80 + breathe, 0, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(180,60,60,0.12)';
    ctx.strokeStyle = 'rgba(180,60,60,0.25)';
    ctx.lineWidth = 2;
    ctx.fill(); ctx.stroke();
    // Right lung
    ctx.beginPath();
    ctx.ellipse(W/2 + 70, H/2, 55 + breathe/2, 80 + breathe, 0, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();
    // Trachea
    ctx.beginPath();
    ctx.moveTo(W/2, H/2 - 90);
    ctx.lineTo(W/2, H/2 - 50);
    ctx.strokeStyle = 'rgba(180,60,60,0.3)';
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.restore();

    // Draw rod-shaped bacteria
    bacteria.forEach(b => {
      b.x += b.vx; b.y += b.vy;
      if (b.x < 0 || b.x > W) b.vx *= -1;
      if (b.y < 0 || b.y > H) b.vy *= -1;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.phase + t * 0.5);
      ctx.beginPath();
      ctx.ellipse(0, 0, b.size, b.size / 2.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      // flagella
      ctx.beginPath();
      ctx.moveTo(b.size, 0);
      for (let i = 0; i <= 20; i++) {
        const xi = b.size + i * 2;
        const yi = Math.sin(i * 0.8 + t * 4 + b.phase) * 5;
        ctx.lineTo(xi, yi);
      }
      ctx.strokeStyle = color || 'rgba(0,229,160,0.4)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.stroke();
      ctx.restore();
    });

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('PATHOGEN INVADING LUNG TISSUE', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animBacteriaGut(ctx, W, H, t0, color) {
  const cells = Array.from({length: 20}, (_, i) => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2,
    size: 5 + Math.random() * 6
  }));
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Intestinal villi
    for (let i = 0; i < 8; i++) {
      const x = (W / 8) * i + 30;
      const h = 60 + Math.sin(t * 1.2 + i) * 10;
      ctx.beginPath();
      ctx.moveTo(x, H);
      ctx.quadraticCurveTo(x - 15, H - h/2, x, H - h);
      ctx.quadraticCurveTo(x + 15, H - h/2, x, H);
      ctx.fillStyle = 'rgba(220,120,60,0.15)';
      ctx.strokeStyle = 'rgba(220,120,60,0.3)';
      ctx.lineWidth = 2;
      ctx.fill(); ctx.stroke();
    }
    // Bacteria
    cells.forEach(b => {
      b.x += b.vx; b.y += b.vy;
      if (b.x < 0 || b.x > W) b.vx *= -1;
      if (b.y < 0 || b.y > H) b.vy *= -1;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.75)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('BACTERIA COLONIZING GUT EPITHELIUM', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animBactBloodstream(ctx, W, H, t0, color) {
  const rbcs = Array.from({length: 12}, (_, i) => ({
    x: (i / 12) * W * 1.2, y: H/2 + Math.sin(i * 1.5) * 30,
    speed: 1.2 + Math.random() * 0.8
  }));
  const bacteria = Array.from({length: 8}, () => ({
    x: Math.random() * W, y: H/2 + (Math.random() - 0.5) * 60,
    vx: 0.6 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2
  }));
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Blood vessel
    const grad = ctx.createLinearGradient(0, H/2 - 50, 0, H/2 + 50);
    grad.addColorStop(0, 'rgba(120,20,20,0.3)');
    grad.addColorStop(0.5, 'rgba(180,30,30,0.15)');
    grad.addColorStop(1, 'rgba(120,20,20,0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, H/2 - 60, W, 120);
    ctx.strokeStyle = 'rgba(200,40,40,0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, H/2 - 60, W, 120);

    // Red blood cells
    rbcs.forEach(r => {
      r.x += r.speed;
      if (r.x > W + 30) r.x = -30;
      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.scale(1, 0.6);
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(220,60,60,0.6)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180,30,30,0.4)';
      ctx.fill();
      ctx.restore();
    });
    // Bacteria moving in blood
    bacteria.forEach(b => {
      b.x += b.vx;
      if (b.x > W + 10) b.x = -10;
      const y = b.y + Math.sin(t * 3 + b.phase) * 8;
      ctx.beginPath();
      ctx.arc(b.x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.85)';
      ctx.shadowBlur = 12;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('BACTEREMIA — PATHOGEN IN BLOODSTREAM', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animBactSkin(ctx, W, H, t0, color) {
  const spores = Array.from({length: 18}, () => ({
    x: Math.random() * W, y: 60 + Math.random() * (H - 80),
    size: 4 + Math.random() * 5, growing: Math.random() * 0.02
  }));
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Skin layers
    const layers = [
      {y: H * 0.15, h: H * 0.12, c: 'rgba(230,185,140,0.15)', l: 'Epidermis'},
      {y: H * 0.27, h: H * 0.2, c: 'rgba(200,150,100,0.1)', l: 'Dermis'},
      {y: H * 0.47, h: H * 0.3, c: 'rgba(180,130,90,0.08)', l: 'Hypodermis'},
    ];
    layers.forEach(layer => {
      ctx.fillStyle = layer.c;
      ctx.fillRect(0, layer.y, W, layer.h);
      ctx.strokeStyle = 'rgba(230,185,140,0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, layer.y, W, layer.h);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.font = '10px DM Mono, monospace';
      ctx.fillText(layer.l, 8, layer.y + 14);
    });
    // Surface (skin texture)
    ctx.beginPath();
    ctx.moveTo(0, H * 0.15);
    for (let x = 0; x <= W; x += 10) {
      ctx.lineTo(x, H * 0.15 + Math.sin(x * 0.05 + t * 0.3) * 4);
    }
    ctx.strokeStyle = 'rgba(230,185,140,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Bacteria in skin
    spores.forEach(s => {
      s.size += s.growing;
      if (s.size > 12) s.growing = -Math.abs(s.growing);
      if (s.size < 3) s.growing = Math.abs(s.growing);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.7)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('SKIN INFECTION — DERMAL INVASION', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animBactNerve(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Nerve fiber
    ctx.beginPath();
    ctx.moveTo(20, H/2);
    ctx.bezierCurveTo(W * 0.33, H/2 - 30, W * 0.66, H/2 + 30, W - 20, H/2);
    ctx.strokeStyle = 'rgba(167,139,250,0.3)';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.strokeStyle = 'rgba(167,139,250,0.6)';
    ctx.lineWidth = 4;
    ctx.stroke();
    // Myelin sheaths
    for (let i = 0; i < 6; i++) {
      const px = (i / 5) * (W - 60) + 30;
      const py = H/2 + Math.sin(px * 0.01) * 20;
      ctx.beginPath();
      ctx.ellipse(px, py, 20, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167,139,250,0.08)';
      ctx.strokeStyle = 'rgba(167,139,250,0.25)';
      ctx.lineWidth = 2;
      ctx.fill(); ctx.stroke();
    }
    // Toxin particles spreading
    for (let i = 0; i < 12; i++) {
      const prog = ((t * 0.3 + i / 12)) % 1;
      const px = prog * W;
      const py = H/2 + Math.sin(px * 0.01) * 20 + (Math.random() - 0.5) * 10;
      ctx.beginPath();
      ctx.arc(px, py, 4 + Math.sin(t * 3 + i) * 2, 0, Math.PI * 2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.9)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('NEUROTOXIN — NERVE SIGNAL DISRUPTION', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animBactLymph(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Swollen lymph node
    const pulse = Math.sin(t * 2) * 8;
    ctx.beginPath();
    ctx.ellipse(W/2, H/2, 80 + pulse, 65 + pulse * 0.6, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(247,201,72,0.08)';
    ctx.strokeStyle = 'rgba(247,201,72,0.3)';
    ctx.lineWidth = 3;
    ctx.fill(); ctx.stroke();
    // Inner cortex
    ctx.beginPath();
    ctx.ellipse(W/2, H/2, 55 + pulse*0.5, 45 + pulse*0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(247,201,72,0.05)';
    ctx.strokeStyle = 'rgba(247,201,72,0.15)';
    ctx.lineWidth = 1;
    ctx.fill(); ctx.stroke();
    // Bacteria inside node
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + t * 0.4;
      const r = 25 + Math.sin(t * 2 + i) * 10;
      const bx = W/2 + Math.cos(angle) * r;
      const by = H/2 + Math.sin(angle) * r * 0.7;
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.85)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('LYMPHADENOPATHY — SWOLLEN LYMPH NODE', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animBactBrain(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Brain outline
    ctx.beginPath();
    ctx.ellipse(W/2, H/2, 130, 100, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,150,150,0.05)';
    ctx.strokeStyle = 'rgba(255,150,150,0.2)';
    ctx.lineWidth = 3;
    ctx.fill(); ctx.stroke();
    // Brain gyri
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI;
      ctx.beginPath();
      ctx.arc(W/2 + Math.cos(angle) * 60, H/2 + Math.sin(angle) * 40, 30, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,150,150,0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    // Inflammation (pulsing red glow)
    const inflame = (Math.sin(t * 2) + 1) / 2;
    const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 140);
    grad.addColorStop(0, `rgba(255,60,60,${0.08 + inflame * 0.1})`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(W/2, H/2, 140, 110, 0, 0, Math.PI * 2);
    ctx.fill();
    // Bacteria in meninges
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + t * 0.3;
      const bx = W/2 + Math.cos(angle) * (110 + Math.sin(t * 2 + i) * 15);
      const by = H/2 + Math.sin(angle) * (85 + Math.sin(t * 2 + i) * 10);
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.85)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('MENINGEAL INFLAMMATION', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animBactThroat(ctx, W, H, t0, color) {
  const bacteria = Array.from({length: 15}, () => ({
    x: W/2 + (Math.random()-0.5)*100,
    y: H/2 + (Math.random()-0.5)*60,
    size: 4+Math.random()*5
  }));
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Throat opening
    ctx.beginPath();
    ctx.ellipse(W/2, H/2, 100, 75, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200,60,60,0.12)';
    ctx.strokeStyle = 'rgba(200,60,60,0.3)';
    ctx.lineWidth = 3;
    ctx.fill(); ctx.stroke();
    // Uvula
    ctx.beginPath();
    ctx.moveTo(W/2, H/2 - 30);
    ctx.bezierCurveTo(W/2-10, H/2, W/2-5, H/2+20+Math.sin(t*2)*5, W/2, H/2+30+Math.sin(t*2)*5);
    ctx.bezierCurveTo(W/2+5, H/2+20+Math.sin(t*2)*5, W/2+10, H/2, W/2, H/2 - 30);
    ctx.fillStyle = 'rgba(200,60,60,0.3)';
    ctx.fill();
    // Tonsil patches
    ctx.beginPath();
    ctx.ellipse(W/2-75, H/2, 25, 40, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,200,200,0.12)';
    ctx.strokeStyle = 'rgba(255,200,200,0.2)';
    ctx.lineWidth = 2;
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(W/2+75, H/2, 25, 40, -0.2, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    // Bacteria
    bacteria.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size + Math.sin(t*3)*1, 0, Math.PI*2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('PHARYNGEAL BACTERIAL COLONIZATION', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animBactCell(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Host cell
    ctx.beginPath();
    ctx.arc(W/2, H/2, 90, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100,150,255,0.07)';
    ctx.strokeStyle = 'rgba(100,150,255,0.25)';
    ctx.lineWidth = 3;
    ctx.fill(); ctx.stroke();
    // Nucleus
    ctx.beginPath();
    ctx.arc(W/2, H/2, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100,150,255,0.15)';
    ctx.fill();
    // Bacteria invading
    for (let i = 0; i < 8; i++) {
      const angle = (i/8) * Math.PI * 2 + t * 0.5;
      const dist = 50 + Math.sin(t * 2 + i) * 20;
      const bx = W/2 + Math.cos(angle) * dist;
      const by = H/2 + Math.sin(angle) * dist;
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(angle + Math.PI/2);
      ctx.beginPath();
      ctx.ellipse(0, 0, 5, 2.5, 0, 0, Math.PI*2);
      ctx.fillStyle = color || 'rgba(0,229,160,0.85)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = color || '#00e5a0';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('INTRACELLULAR BACTERIAL INVASION', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

// ========== VIRAL ANIMATIONS ==========

function animVirusRespiratory(ctx, W, H, t0, color) {
  const viruses = Array.from({length: 12}, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random()-0.5)*1.2, vy: (Math.random()-0.5)*1.2,
    r: 10+Math.random()*8, spikes: 8+Math.floor(Math.random()*6)
  }));
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Droplet particles in air
    for (let i = 0; i < 5; i++) {
      const drop = {x: ((i*60+t*40)%(W+60))-30, y: 30+i*20+Math.sin(t+i)*10};
      ctx.beginPath();
      ctx.ellipse(drop.x, drop.y, 18, 10, 0, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(100,180,255,0.07)';
      ctx.strokeStyle = 'rgba(100,180,255,0.15)';
      ctx.lineWidth = 1;
      ctx.fill(); ctx.stroke();
    }
    // Draw spiky viruses
    viruses.forEach(v => {
      v.x += v.vx; v.y += v.vy;
      if (v.x < -20 || v.x > W+20) v.vx *= -1;
      if (v.y < -20 || v.y > H+20) v.vy *= -1;
      ctx.save();
      ctx.translate(v.x, v.y);
      // Body
      ctx.beginPath();
      ctx.arc(0, 0, v.r, 0, Math.PI * 2);
      ctx.fillStyle = color || 'rgba(255,107,107,0.75)';
      ctx.shadowBlur = 12;
      ctx.shadowColor = color || '#ff6b6b';
      ctx.fill();
      ctx.shadowBlur = 0;
      // Spikes
      for (let s = 0; s < v.spikes; s++) {
        const a = (s / v.spikes) * Math.PI * 2 + t * 0.5;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * v.r, Math.sin(a) * v.r);
        ctx.lineTo(Math.cos(a) * (v.r + 8), Math.sin(a) * (v.r + 8));
        ctx.strokeStyle = color || 'rgba(255,107,107,0.8)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(Math.cos(a)*(v.r+8), Math.sin(a)*(v.r+8), 2.5, 0, Math.PI*2);
        ctx.fillStyle = color || 'rgba(255,150,150,0.9)';
        ctx.fill();
      }
      ctx.restore();
    });
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('AIRBORNE VIRAL TRANSMISSION', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animVirusCellHijack(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Host cell
    ctx.beginPath();
    ctx.arc(W/2, H/2, 100, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(100,150,255,0.07)';
    ctx.strokeStyle = 'rgba(100,150,255,0.2)';
    ctx.lineWidth = 3;
    ctx.fill(); ctx.stroke();
    // Nucleus with DNA replication
    const nuclPulse = Math.sin(t*2)*5;
    ctx.beginPath();
    ctx.arc(W/2, H/2, 35+nuclPulse, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(100,150,255,0.12)';
    ctx.strokeStyle = 'rgba(100,200,255,0.3)';
    ctx.lineWidth = 2;
    ctx.fill(); ctx.stroke();
    // Viral DNA strands inside nucleus
    ctx.save();
    ctx.translate(W/2, H/2);
    for (let i=0; i<3; i++) {
      ctx.beginPath();
      const phase = i*(Math.PI*2/3) + t;
      ctx.moveTo(Math.cos(phase)*10, Math.sin(phase)*10);
      ctx.quadraticCurveTo(Math.cos(phase+1)*20, Math.sin(phase+1)*20, Math.cos(phase+2)*10, Math.sin(phase+2)*10);
      ctx.strokeStyle = color || 'rgba(255,107,107,0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
    // New virus particles being released
    for (let i=0; i<8; i++) {
      const prog = ((t*0.4 + i/8) % 1);
      const angle = (i/8) * Math.PI*2;
      const dist = 100 + prog * 80;
      const bx = W/2 + Math.cos(angle)*dist;
      const by = H/2 + Math.sin(angle)*dist;
      const alpha = 1 - prog;
      ctx.save();
      ctx.translate(bx, by);
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI*2);
      ctx.fillStyle = (color || 'rgba(255,107,107,') + (color ? '' : alpha*0.8 + ')');
      ctx.fillStyle = color ? color : `rgba(255,107,107,${alpha*0.8})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color || '#ff6b6b';
      ctx.fill();
      ctx.shadowBlur = 0;
      // Mini spikes
      for (let s=0; s<6; s++) {
        const a = (s/6)*Math.PI*2 + t;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a)*8, Math.sin(a)*8);
        ctx.lineTo(Math.cos(a)*13, Math.sin(a)*13);
        ctx.strokeStyle = color || `rgba(255,107,107,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText('VIRAL CELL HIJACKING & REPLICATION', 10, H - 12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animVirusBloodstream(ctx, W, H, t0, color) {
  const viruses = Array.from({length:10},()=>({x:Math.random()*W,y:H/2+(Math.random()-0.5)*60,speed:0.8+Math.random()*0.6,phase:Math.random()*Math.PI*2}));
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    const grad = ctx.createLinearGradient(0, H/2-50, 0, H/2+50);
    grad.addColorStop(0, 'rgba(120,20,20,0.3)');
    grad.addColorStop(0.5, 'rgba(180,30,30,0.15)');
    grad.addColorStop(1, 'rgba(120,20,20,0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, H/2-60, W, 120);
    // RBCs
    for(let i=0;i<8;i++){
      const rx = ((t*60+i*(W/8))%W);
      ctx.save(); ctx.translate(rx, H/2+Math.sin(i)*20); ctx.scale(1,0.6);
      ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2);
      ctx.fillStyle='rgba(220,60,60,0.5)'; ctx.fill(); ctx.restore();
    }
    viruses.forEach(v => {
      v.x += v.speed;
      if (v.x > W+15) v.x = -15;
      const y = v.y + Math.sin(t*2.5+v.phase)*10;
      ctx.save(); ctx.translate(v.x, y);
      ctx.beginPath(); ctx.arc(0,0,7,0,Math.PI*2);
      ctx.fillStyle = color || 'rgba(255,107,107,0.85)';
      ctx.shadowBlur=10; ctx.shadowColor=color||'#ff6b6b'; ctx.fill(); ctx.shadowBlur=0;
      for(let s=0;s<8;s++){
        const a=(s/8)*Math.PI*2+t;
        ctx.beginPath(); ctx.moveTo(Math.cos(a)*7,Math.sin(a)*7); ctx.lineTo(Math.cos(a)*12,Math.sin(a)*12);
        ctx.strokeStyle=color||'rgba(255,107,107,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
      }
      ctx.restore();
    });
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('VIREMIA — VIRUS IN BLOODSTREAM', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animVirusLiver(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    // Liver shape
    ctx.beginPath();
    ctx.moveTo(W*0.15, H*0.4);
    ctx.bezierCurveTo(W*0.1, H*0.2, W*0.6, H*0.1, W*0.85, H*0.3);
    ctx.bezierCurveTo(W*0.95, H*0.5, W*0.8, H*0.75, W*0.5, H*0.78);
    ctx.bezierCurveTo(W*0.25, H*0.78, W*0.1, H*0.65, W*0.15, H*0.4);
    const inflammation = (Math.sin(t*1.5)+1)/2;
    ctx.fillStyle = `rgba(${180+inflammation*40},${60},${20},${0.15+inflammation*0.05})`;
    ctx.strokeStyle = `rgba(${200+inflammation*30},80,40,${0.3+inflammation*0.1})`;
    ctx.lineWidth = 3;
    ctx.fill(); ctx.stroke();
    // Viral particles inside
    for (let i=0;i<10;i++) {
      const angle = (i/10)*Math.PI*2 + t*0.4;
      const rx = W*0.5 + Math.cos(angle)*100;
      const ry = H*0.45 + Math.sin(angle)*60;
      ctx.save(); ctx.translate(rx, ry);
      ctx.beginPath(); ctx.arc(0,0,7,0,Math.PI*2);
      ctx.fillStyle = color||'rgba(255,107,107,0.8)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#ff6b6b'; ctx.fill(); ctx.shadowBlur=0;
      for(let s=0;s<6;s++){
        const a=(s/6)*Math.PI*2+t;
        ctx.beginPath(); ctx.moveTo(Math.cos(a)*7,Math.sin(a)*7); ctx.lineTo(Math.cos(a)*11,Math.sin(a)*11);
        ctx.strokeStyle=color||'rgba(255,107,107,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
      }
      ctx.restore();
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('HEPATIC VIRAL INFECTION', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animVirusNerve(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c0f';
    ctx.fillRect(0, 0, W, H);
    ctx.beginPath();
    ctx.moveTo(20, H/2);
    for(let x=20;x<W-20;x++){
      ctx.lineTo(x, H/2 + Math.sin(x*0.02)*20);
    }
    ctx.strokeStyle = 'rgba(167,139,250,0.5)';
    ctx.lineWidth = 16; ctx.stroke();
    ctx.strokeStyle = 'rgba(167,139,250,0.8)';
    ctx.lineWidth = 3; ctx.stroke();
    // Viruses traveling along nerve
    for(let i=0;i<6;i++){
      const prog = ((t*0.25+i/6)%1);
      const px = 20 + prog*(W-40);
      const py = H/2 + Math.sin(px*0.02)*20;
      ctx.save(); ctx.translate(px, py);
      ctx.beginPath(); ctx.arc(0,0,7,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(255,107,107,0.85)';
      ctx.shadowBlur=10; ctx.shadowColor=color||'#ff6b6b'; ctx.fill(); ctx.shadowBlur=0;
      for(let s=0;s<6;s++){
        const a=(s/6)*Math.PI*2+t*2;
        ctx.beginPath(); ctx.moveTo(Math.cos(a)*7,Math.sin(a)*7); ctx.lineTo(Math.cos(a)*11,Math.sin(a)*11);
        ctx.strokeStyle=color||'rgba(255,107,107,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
      }
      ctx.restore();
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('VIRAL NEUROTROPISM — NERVE INVASION', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animVirusSkin(ctx, W, H, t0, color) {
  const vesicles = Array.from({length:10},(_,i)=>({
    x:50+i*(W-100)/9, y:H/2+(Math.random()-0.5)*40, size:8+Math.random()*12
  }));
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    // Skin
    ctx.fillStyle='rgba(230,185,140,0.1)'; ctx.fillRect(0,H*0.2,W,H*0.6);
    ctx.strokeStyle='rgba(230,185,140,0.2)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(0,H*0.2);
    for(let x=0;x<=W;x+=8) ctx.lineTo(x,H*0.2+Math.sin(x*0.05+t*0.2)*3);
    ctx.stroke();
    // Vesicles/blisters
    vesicles.forEach((v,i) => {
      const pulse = Math.sin(t*1.5+i)*3;
      ctx.beginPath();
      ctx.ellipse(v.x, v.y, v.size+pulse, v.size*0.7+pulse*0.5, 0, 0, Math.PI*2);
      ctx.fillStyle='rgba(255,220,100,0.15)';
      ctx.strokeStyle='rgba(255,200,80,0.35)';
      ctx.lineWidth=2; ctx.fill(); ctx.stroke();
      // Virus inside blister
      ctx.beginPath(); ctx.arc(v.x, v.y, 4, 0, Math.PI*2);
      ctx.fillStyle=color||'rgba(255,107,107,0.8)';
      ctx.shadowBlur=6; ctx.shadowColor=color||'#ff6b6b'; ctx.fill(); ctx.shadowBlur=0;
    });
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('DERMAL VIRAL VESICLE FORMATION', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animVirusBrain(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    ctx.beginPath();
    ctx.ellipse(W/2,H/2,130,100,0,0,Math.PI*2);
    const inf = (Math.sin(t*1.5)+1)/2;
    ctx.fillStyle=`rgba(255,${100+inf*50},${50},${0.06+inf*0.06})`;
    ctx.strokeStyle=`rgba(255,${100+inf*50},${50},${0.25+inf*0.1})`;
    ctx.lineWidth=3; ctx.fill(); ctx.stroke();
    for(let i=0;i<8;i++){
      const angle=(i/8)*Math.PI*2+t*0.3;
      const bx=W/2+Math.cos(angle)*80;
      const by=H/2+Math.sin(angle)*60;
      ctx.save(); ctx.translate(bx,by);
      ctx.beginPath(); ctx.arc(0,0,7,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(255,107,107,0.85)';
      ctx.shadowBlur=10; ctx.shadowColor=color||'#ff6b6b'; ctx.fill(); ctx.shadowBlur=0;
      for(let s=0;s<6;s++){
        const a=(s/6)*Math.PI*2+t;
        ctx.beginPath(); ctx.moveTo(Math.cos(a)*7,Math.sin(a)*7); ctx.lineTo(Math.cos(a)*11,Math.sin(a)*11);
        ctx.strokeStyle=color||'rgba(255,107,107,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
      }
      ctx.restore();
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('VIRAL ENCEPHALITIS', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animVirusGut(ctx, W, H, t0, color) {
  const viruses = Array.from({length:16},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5}));
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    for(let i=0;i<7;i++){
      const x=(W/7)*i+30;
      const h=50+Math.sin(t*1.2+i)*10;
      ctx.beginPath(); ctx.moveTo(x,H);
      ctx.quadraticCurveTo(x-12,H-h/2,x,H-h);
      ctx.quadraticCurveTo(x+12,H-h/2,x,H);
      ctx.fillStyle='rgba(220,120,60,0.1)';
      ctx.strokeStyle='rgba(220,120,60,0.2)'; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
    }
    viruses.forEach(v=>{
      v.x+=v.vx; v.y+=v.vy;
      if(v.x<0||v.x>W)v.vx*=-1; if(v.y<0||v.y>H)v.vy*=-1;
      ctx.save(); ctx.translate(v.x,v.y);
      ctx.beginPath(); ctx.arc(0,0,6,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(255,107,107,0.8)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#ff6b6b'; ctx.fill(); ctx.shadowBlur=0;
      for(let s=0;s<6;s++){
        const a=(s/6)*Math.PI*2+t;
        ctx.beginPath(); ctx.moveTo(Math.cos(a)*6,Math.sin(a)*6); ctx.lineTo(Math.cos(a)*10,Math.sin(a)*10);
        ctx.strokeStyle=color||'rgba(255,107,107,0.6)'; ctx.lineWidth=1.5; ctx.stroke();
      }
      ctx.restore();
    });
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('VIRAL GI TRACT INFECTION', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

// ========== FUNGAL ANIMATIONS ==========

function animFungusSurface(ctx, W, H, t0, color) {
  const hyphae = Array.from({length:8},(_,i)=>({
    x:Math.random()*W, y:Math.random()*H,
    angle:Math.random()*Math.PI*2, length:0, growing:true
  }));
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    // Skin surface
    ctx.fillStyle='rgba(230,185,140,0.1)'; ctx.fillRect(0,H*0.4,W,H*0.6);
    ctx.beginPath(); ctx.moveTo(0,H*0.4);
    for(let x=0;x<=W;x+=6) ctx.lineTo(x,H*0.4+Math.sin(x*0.06+t*0.15)*3);
    ctx.strokeStyle='rgba(230,185,140,0.25)'; ctx.lineWidth=2; ctx.stroke();
    // Hyphae growth
    hyphae.forEach((h,i)=>{
      h.length += 0.5;
      if(h.length > 60+i*10) { h.length = 0; h.x=Math.random()*W; h.y=H*0.4+Math.random()*H*0.4; h.angle=Math.random()*Math.PI*2;}
      ctx.save(); ctx.translate(h.x,h.y); ctx.rotate(h.angle);
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(h.length,0);
      ctx.strokeStyle=color||'rgba(247,201,72,0.7)';
      ctx.lineWidth=3; ctx.lineCap='round';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#f7c948'; ctx.stroke(); ctx.shadowBlur=0;
      // Spores at tips
      ctx.beginPath(); ctx.arc(h.length,0,4,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(247,201,72,0.9)'; ctx.fill();
      ctx.restore();
    });
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('FUNGAL HYPHAL GROWTH ON SURFACE', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animFungusLung(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    const breathe=Math.sin(t*1.3)*8;
    ctx.beginPath(); ctx.ellipse(W/2-65,H/2,50+breathe/2,75+breathe,0,0,Math.PI*2);
    ctx.fillStyle='rgba(180,60,60,0.1)'; ctx.strokeStyle='rgba(180,60,60,0.2)'; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(W/2+65,H/2,50+breathe/2,75+breathe,0,0,Math.PI*2);
    ctx.fill(); ctx.stroke();
    // Fungal growth inside
    for(let i=0;i<12;i++){
      const angle=(i/12)*Math.PI*2+t*0.2;
      const side=i<6?-65:65;
      const bx=W/2+side+Math.cos(angle)*30;
      const by=H/2+Math.sin(angle)*45;
      ctx.save(); ctx.translate(bx,by); ctx.rotate(angle);
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(12+Math.sin(t*2+i)*3,0);
      ctx.strokeStyle=color||'rgba(247,201,72,0.7)'; ctx.lineWidth=2; ctx.lineCap='round';
      ctx.shadowBlur=6; ctx.shadowColor=color||'#f7c948'; ctx.stroke(); ctx.shadowBlur=0;
      ctx.beginPath(); ctx.arc(12+Math.sin(t*2+i)*3,0,3,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(247,201,72,0.8)'; ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('PULMONARY FUNGAL INFECTION', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animFungusBrain(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    ctx.beginPath(); ctx.ellipse(W/2,H/2,130,100,0,0,Math.PI*2);
    ctx.fillStyle='rgba(255,150,150,0.05)'; ctx.strokeStyle='rgba(255,150,150,0.15)'; ctx.lineWidth=3; ctx.fill(); ctx.stroke();
    // Fungal capsule (cryptococcus has a large polysaccharide capsule)
    for(let i=0;i<8;i++){
      const angle=(i/8)*Math.PI*2+t*0.2;
      const bx=W/2+Math.cos(angle)*70;
      const by=H/2+Math.sin(angle)*55;
      // Capsule
      ctx.beginPath(); ctx.arc(bx,by,15,0,Math.PI*2);
      ctx.fillStyle='rgba(247,201,72,0.06)';
      ctx.strokeStyle=color||'rgba(247,201,72,0.2)'; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
      // Cell inside
      ctx.beginPath(); ctx.arc(bx,by,7,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(247,201,72,0.75)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#f7c948'; ctx.fill(); ctx.shadowBlur=0;
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('CRYPTOCOCCAL MENINGITIS', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animFungusSinus(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    // Sinus cavities
    ctx.beginPath(); ctx.ellipse(W/2-55,H/2,45,55,0,0,Math.PI*2);
    ctx.fillStyle='rgba(200,100,100,0.08)'; ctx.strokeStyle='rgba(200,100,100,0.2)'; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(W/2+55,H/2,45,55,0,0,Math.PI*2);
    ctx.fill(); ctx.stroke();
    // Black necrosis effect
    const inf=(Math.sin(t*1.5)+1)/2;
    ctx.beginPath(); ctx.ellipse(W/2-45,H/2,25+inf*5,30+inf*5,0,0,Math.PI*2);
    ctx.fillStyle=`rgba(20,20,20,${0.5+inf*0.3})`; ctx.fill();
    ctx.beginPath(); ctx.ellipse(W/2+45,H/2,25+inf*5,30+inf*5,0,0,Math.PI*2);
    ctx.fill();
    // Hyphae growing
    for(let i=0;i<6;i++){
      const side=i<3?-1:1;
      const bx=W/2+side*40;
      const by=H/2+(i%3-1)*25;
      const len=20+Math.sin(t*2+i)*5;
      ctx.save(); ctx.translate(bx,by); ctx.rotate(side*Math.PI/3+i*0.4);
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(len,0);
      ctx.strokeStyle=color||'rgba(247,201,72,0.7)'; ctx.lineWidth=2; ctx.lineCap='round';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#f7c948'; ctx.stroke(); ctx.shadowBlur=0;
      ctx.restore();
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('RHINOCEREBRAL MUCORMYCOSIS', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animFungusNerve(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    // Vasospasm effect
    for(let x=0;x<W;x+=2){
      const y=H/2+Math.sin(x*0.03)*30+Math.sin(x*0.08+t*2)*5;
      const constrict=Math.sin(x*0.02+t*3)*10;
      ctx.fillStyle=`rgba(${220+constrict*3},${60},${60},${0.05+constrict*0.01})`;
      ctx.fillRect(x,y-15,2,30);
    }
    // Blood vessel
    ctx.beginPath(); ctx.moveTo(0,H/2);
    for(let x=0;x<=W;x++) ctx.lineTo(x,H/2+Math.sin(x*0.03)*30);
    ctx.strokeStyle='rgba(200,50,50,0.4)'; ctx.lineWidth=8; ctx.stroke();
    // Ergot toxins as dark particles
    for(let i=0;i<15;i++){
      const prog=((t*0.4+i/15)%1);
      const px=prog*W;
      const py=H/2+Math.sin(px*0.03)*30;
      ctx.beginPath(); ctx.arc(px,py,5,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(247,201,72,0.85)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#f7c948'; ctx.fill(); ctx.shadowBlur=0;
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('ERGOT ALKALOID — VASOCONSTRICTION', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

// ========== PROTOZOAN ANIMATIONS ==========

function animProtozooRBC(ctx, W, H, t0, color) {
  const cells = Array.from({length:9},(_,i)=>({
    x:50+(i%3)*((W-100)/3), y:60+Math.floor(i/3)*80,
    infected: i%3===1, merozoites: 0
  }));
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    cells.forEach((c,i)=>{
      const pulse=Math.sin(t*2+i)*4;
      ctx.save(); ctx.translate(c.x,c.y); ctx.scale(1,0.65);
      ctx.beginPath(); ctx.arc(0,0,28+pulse,0,Math.PI*2);
      ctx.fillStyle=c.infected?'rgba(167,139,250,0.2)':'rgba(220,60,60,0.3)';
      ctx.strokeStyle=c.infected?(color||'rgba(167,139,250,0.7)'):'rgba(200,60,60,0.5)';
      ctx.lineWidth=2; ctx.fill(); ctx.stroke();
      if(c.infected){
        // Parasites inside RBC
        for(let p=0;p<4;p++){
          const a=(p/4)*Math.PI*2+t*1.5;
          ctx.beginPath(); ctx.arc(Math.cos(a)*10,Math.sin(a)*10,5,0,Math.PI*2);
          ctx.fillStyle=color||'rgba(167,139,250,0.85)';
          ctx.shadowBlur=8; ctx.shadowColor=color||'#a78bfa'; ctx.fill(); ctx.shadowBlur=0;
        }
      }
      ctx.restore();
    });
    // Label
    ctx.fillStyle='rgba(167,139,250,0.5)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('INFECTED', cells.find(c=>c.infected).x-25, cells.find(c=>c.infected).y+45);
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.fillText('INTRAERYTHROCYTIC PARASITE CYCLE', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animProtozooMacrophage(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    // Macrophage
    ctx.beginPath();
    ctx.arc(W/2,H/2,80+Math.sin(t)*5,0,Math.PI*2);
    ctx.fillStyle='rgba(100,180,100,0.08)';
    ctx.strokeStyle='rgba(100,180,100,0.25)'; ctx.lineWidth=3; ctx.fill(); ctx.stroke();
    // Pseudopods
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2+t*0.3;
      const r=80+Math.sin(t*2+i)*15;
      ctx.beginPath();
      ctx.moveTo(W/2+Math.cos(a)*70,H/2+Math.sin(a)*70);
      ctx.lineTo(W/2+Math.cos(a)*r,H/2+Math.sin(a)*r);
      ctx.strokeStyle='rgba(100,180,100,0.2)'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();
    }
    // Leishmania amastigotes inside
    for(let i=0;i<8;i++){
      const angle=(i/8)*Math.PI*2+t*0.4;
      const bx=W/2+Math.cos(angle)*40;
      const by=H/2+Math.sin(angle)*30;
      ctx.beginPath(); ctx.arc(bx,by,6,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(167,139,250,0.85)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#a78bfa'; ctx.fill(); ctx.shadowBlur=0;
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('INTRAMACROPHAGE PARASITE SURVIVAL', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animProtozooBlood(ctx, W, H, t0, color) {
  const tryps = Array.from({length:8},()=>({x:Math.random()*W,y:H/2+(Math.random()-0.5)*60,speed:0.7+Math.random()*0.5,phase:Math.random()*Math.PI*2}));
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    const grad=ctx.createLinearGradient(0,H/2-55,0,H/2+55);
    grad.addColorStop(0,'rgba(120,20,20,0.25)');
    grad.addColorStop(0.5,'rgba(180,30,30,0.12)');
    grad.addColorStop(1,'rgba(120,20,20,0.25)');
    ctx.fillStyle=grad; ctx.fillRect(0,H/2-60,W,120);
    // Trypanosomes (elongated with undulating membrane)
    tryps.forEach(v=>{
      v.x+=v.speed; if(v.x>W+20) v.x=-20;
      const y=v.y+Math.sin(t*3+v.phase)*12;
      ctx.save(); ctx.translate(v.x,y);
      // Body
      ctx.beginPath();
      ctx.moveTo(-15,0);
      for(let i=-15;i<=15;i++){
        ctx.lineTo(i, Math.sin(i*0.4+t*5+v.phase)*5);
      }
      ctx.strokeStyle=color||'rgba(167,139,250,0.8)'; ctx.lineWidth=4; ctx.lineCap='round'; ctx.stroke();
      // Flagellum
      ctx.beginPath(); ctx.moveTo(15,0);
      for(let i=0;i<=15;i++) ctx.lineTo(15+i, Math.sin(i*0.6+t*5+v.phase)*6);
      ctx.strokeStyle=color||'rgba(167,139,250,0.5)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.restore();
    });
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('TRYPANOSOMES IN BLOODSTREAM', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animProtozooGut(ctx, W, H, t0, color) {
  const protozoa = Array.from({length:12},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*1.2,vy:(Math.random()-0.5)*1.2,phase:Math.random()*Math.PI*2}));
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    for(let i=0;i<7;i++){
      const x=(W/7)*i+30, h=55+Math.sin(t*1.2+i)*8;
      ctx.beginPath(); ctx.moveTo(x,H); ctx.quadraticCurveTo(x-12,H-h/2,x,H-h); ctx.quadraticCurveTo(x+12,H-h/2,x,H);
      ctx.fillStyle='rgba(220,120,60,0.1)'; ctx.strokeStyle='rgba(220,120,60,0.2)'; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
    }
    protozoa.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
      ctx.save(); ctx.translate(p.x,p.y);
      // Pear-shaped (Giardia/Trichomonas)
      ctx.beginPath(); ctx.ellipse(0,0,8,12,Math.sin(t+p.phase)*0.5,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(167,139,250,0.75)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#a78bfa'; ctx.fill(); ctx.shadowBlur=0;
      // Flagella
      for(let f=0;f<4;f++){
        const a=(f/4)*Math.PI*2;
        ctx.beginPath(); ctx.moveTo(Math.cos(a)*8,Math.sin(a)*12);
        for(let i=0;i<=10;i++) ctx.lineTo(Math.cos(a)*8+i*Math.cos(a)*1.5, Math.sin(a)*12+i*Math.sin(a)*1.5+Math.sin(i*0.8+t*4+f)*4);
        ctx.strokeStyle=color||'rgba(167,139,250,0.4)'; ctx.lineWidth=1; ctx.stroke();
      }
      ctx.restore();
    });
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('INTESTINAL PROTOZOAN COLONIZATION', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animProtooBrain(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    ctx.beginPath(); ctx.ellipse(W/2,H/2,130,100,0,0,Math.PI*2);
    ctx.fillStyle='rgba(255,150,150,0.05)'; ctx.strokeStyle='rgba(255,100,100,0.2)'; ctx.lineWidth=3; ctx.fill(); ctx.stroke();
    // Toxo cysts (protozoan brain cysts)
    for(let i=0;i<6;i++){
      const angle=(i/6)*Math.PI*2+t*0.15;
      const bx=W/2+Math.cos(angle)*65;
      const by=H/2+Math.sin(angle)*50;
      const cystPulse=Math.sin(t*2+i)*3;
      // Cyst wall
      ctx.beginPath(); ctx.arc(bx,by,14+cystPulse,0,Math.PI*2);
      ctx.fillStyle='rgba(167,139,250,0.06)';
      ctx.strokeStyle=color||'rgba(167,139,250,0.3)'; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
      // Bradyzoites inside
      for(let j=0;j<4;j++){
        const a=(j/4)*Math.PI*2+t;
        ctx.beginPath(); ctx.arc(bx+Math.cos(a)*5,by+Math.sin(a)*5,3,0,Math.PI*2);
        ctx.fillStyle=color||'rgba(167,139,250,0.85)';
        ctx.shadowBlur=6; ctx.shadowColor=color||'#a78bfa'; ctx.fill(); ctx.shadowBlur=0;
      }
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('CEREBRAL PROTOZOAN CYSTS', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animProtozooCell(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    // Host cell
    ctx.beginPath(); ctx.arc(W/2,H/2,90,0,Math.PI*2);
    ctx.fillStyle='rgba(100,150,255,0.07)'; ctx.strokeStyle='rgba(100,150,255,0.2)'; ctx.lineWidth=3; ctx.fill(); ctx.stroke();
    // Protozoa swimming in/around
    for(let i=0;i<6;i++){
      const angle=(i/6)*Math.PI*2+t*0.6;
      const dist=50+Math.sin(t*2+i)*25;
      const bx=W/2+Math.cos(angle)*dist;
      const by=H/2+Math.sin(angle)*dist;
      ctx.save(); ctx.translate(bx,by); ctx.rotate(angle+Math.PI/2);
      ctx.beginPath(); ctx.ellipse(0,0,6,10,0,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(167,139,250,0.8)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#a78bfa'; ctx.fill(); ctx.shadowBlur=0;
      // Flagellum
      ctx.beginPath(); ctx.moveTo(0,10);
      for(let j=0;j<=12;j++) ctx.lineTo(Math.sin(j*0.7+t*5)*4,10+j*2);
      ctx.strokeStyle=color||'rgba(167,139,250,0.4)'; ctx.lineWidth=1.2; ctx.stroke();
      ctx.restore();
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('PROTOZOAN CELLULAR INVASION', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animProtozooHeart(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    // Heart beat
    const beat=Math.abs(Math.sin(t*1.5))*15;
    ctx.beginPath();
    ctx.moveTo(W/2,H/2+60+beat/2);
    ctx.bezierCurveTo(W/2-120-beat,H/2-30,W/2-130-beat,H/2-80-beat,W/2-70,H/2-80-beat);
    ctx.bezierCurveTo(W/2-30,H/2-100-beat,W/2,H/2-60-beat,W/2,H/2-40-beat);
    ctx.bezierCurveTo(W/2,H/2-60-beat,W/2+30,H/2-100-beat,W/2+70,H/2-80-beat);
    ctx.bezierCurveTo(W/2+130+beat,H/2-80-beat,W/2+120+beat,H/2-30,W/2,H/2+60+beat/2);
    ctx.fillStyle=`rgba(220,${40+beat},${40},${0.15+beat*0.005})`;
    ctx.strokeStyle=`rgba(220,60,60,${0.35+beat*0.01})`; ctx.lineWidth=3; ctx.fill(); ctx.stroke();
    // T. cruzi in cardiac muscle
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2+t*0.4;
      const bx=W/2+Math.cos(a)*45;
      const by=H/2+Math.sin(a)*35;
      ctx.save(); ctx.translate(bx,by); ctx.rotate(a);
      ctx.beginPath();
      for(let j=-10;j<=10;j++) ctx.lineTo(j, Math.sin(j*0.4+t*4)*5);
      ctx.strokeStyle=color||'rgba(167,139,250,0.8)'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.stroke();
      ctx.restore();
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('CARDIAC MUSCLE INVASION (CHAGAS)', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animProtozooEye(ctx, W, H, t0, color) {
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    // Eye
    ctx.beginPath(); ctx.ellipse(W/2,H/2,140,80,0,0,Math.PI*2);
    ctx.fillStyle='rgba(220,220,230,0.08)'; ctx.strokeStyle='rgba(220,220,230,0.2)'; ctx.lineWidth=3; ctx.fill(); ctx.stroke();
    // Iris
    const irisCol=Math.sin(t*0.5)*30;
    ctx.beginPath(); ctx.arc(W/2,H/2,45,0,Math.PI*2);
    ctx.fillStyle=`rgba(${100+irisCol},${130+irisCol},${180},0.2)`;
    ctx.strokeStyle='rgba(100,130,180,0.4)'; ctx.lineWidth=3; ctx.fill(); ctx.stroke();
    // Pupil
    ctx.beginPath(); ctx.arc(W/2,H/2,20,0,Math.PI*2);
    ctx.fillStyle='rgba(10,10,15,0.95)'; ctx.fill();
    // Amoeba on cornea
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2+t*0.3;
      const dist=60+Math.sin(t*2+i)*10;
      const bx=W/2+Math.cos(a)*dist;
      const by=H/2+Math.sin(a)*dist*0.6;
      ctx.beginPath(); ctx.arc(bx,by,7+Math.sin(t*3+i)*2,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(167,139,250,0.75)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#a78bfa'; ctx.fill(); ctx.shadowBlur=0;
      // Pseudopods
      for(let j=0;j<4;j++){
        const pa=(j/4)*Math.PI*2+t+i;
        ctx.beginPath(); ctx.moveTo(bx+Math.cos(pa)*7,by+Math.sin(pa)*7);
        ctx.lineTo(bx+Math.cos(pa)*14,by+Math.sin(pa)*14);
        ctx.strokeStyle=color||'rgba(167,139,250,0.4)'; ctx.lineWidth=2; ctx.stroke();
      }
    }
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='11px DM Mono, monospace';
    ctx.fillText('CORNEAL ACANTHAMOEBA KERATITIS', 10, H-12);
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

function animDefault(ctx, W, H, t0, color) {
  const particles = Array.from({length:20},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,size:4+Math.random()*8}));
  function drawFrame(now) {
    const t=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0c0f'; ctx.fillRect(0,0,W,H);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size+Math.sin(t*3)*2,0,Math.PI*2);
      ctx.fillStyle=color||'rgba(0,229,160,0.7)';
      ctx.shadowBlur=8; ctx.shadowColor=color||'#00e5a0'; ctx.fill(); ctx.shadowBlur=0;
    });
    animationFrame = requestAnimationFrame(drawFrame);
  }
  animationFrame = requestAnimationFrame(drawFrame);
}

// ========== HOME CANVAS PARTICLES ==========

function initHomeCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = Array.from({length:60},()=>({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
    size:1+Math.random()*3, type:Math.floor(Math.random()*4)
  }));
  const colors = ['#00e5a0','#ff6b6b','#f7c948','#a78bfa'];
  let heroAnim;
  function drawHero() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='rgba(10,12,15,0.15)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fillStyle=colors[p.type]+'80'; ctx.fill();
    });
    // Connections
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(255,255,255,${(1-dist/120)*0.05})`; ctx.lineWidth=1; ctx.stroke();
        }
      }
    }
    heroAnim = requestAnimationFrame(drawHero);
  }
  drawHero();
  window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  });
}

// ========== CATEGORY ICON ANIMATIONS ==========

function initCategoryIcons() {
  const configs = [
    {id:'catBact', color:'rgba(0,229,160,0.8)', shadowColor:'#00e5a0', type:'bacteria'},
    {id:'catViral', color:'rgba(255,107,107,0.8)', shadowColor:'#ff6b6b', type:'virus'},
    {id:'catFungal', color:'rgba(247,201,72,0.8)', shadowColor:'#f7c948', type:'fungi'},
    {id:'catProto', color:'rgba(167,139,250,0.8)', shadowColor:'#a78bfa', type:'protozoa'},
  ];
  configs.forEach(cfg=>{
    const container=document.getElementById(cfg.id);
    if(!container) return;
    const canvas=container.querySelector('.cat-canvas');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    const W=canvas.width, H=canvas.height;
    const t0=performance.now();
    function draw(now){
      const t=(now-t0)/1000;
      ctx.clearRect(0,0,W,H);
      if(cfg.type==='bacteria'){
        for(let i=0;i<5;i++){
          const a=(i/5)*Math.PI*2+t*0.5;
          const x=W/2+Math.cos(a)*28, y=H/2+Math.sin(a)*28;
          ctx.save(); ctx.translate(x,y); ctx.rotate(a);
          ctx.beginPath(); ctx.ellipse(0,0,8,4,0,0,Math.PI*2);
          ctx.fillStyle=cfg.color; ctx.shadowBlur=6; ctx.shadowColor=cfg.shadowColor; ctx.fill(); ctx.shadowBlur=0;
          ctx.restore();
        }
      } else if(cfg.type==='virus'){
        ctx.beginPath(); ctx.arc(W/2,H/2,18,0,Math.PI*2);
        ctx.fillStyle=cfg.color; ctx.shadowBlur=10; ctx.shadowColor=cfg.shadowColor; ctx.fill(); ctx.shadowBlur=0;
        for(let s=0;s<8;s++){
          const a=(s/8)*Math.PI*2+t;
          ctx.beginPath(); ctx.moveTo(W/2+Math.cos(a)*18,H/2+Math.sin(a)*18); ctx.lineTo(W/2+Math.cos(a)*28,H/2+Math.sin(a)*28);
          ctx.strokeStyle=cfg.color; ctx.lineWidth=2; ctx.stroke();
          ctx.beginPath(); ctx.arc(W/2+Math.cos(a)*30,H/2+Math.sin(a)*30,3,0,Math.PI*2);
          ctx.fillStyle=cfg.color; ctx.fill();
        }
      } else if(cfg.type==='fungi'){
        for(let i=0;i<4;i++){
          const a=(i/4)*Math.PI*2+t*0.3;
          const x=W/2+Math.cos(a)*20, y=H/2+Math.sin(a)*20;
          ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(a+0.5)*15,y+Math.sin(a+0.5)*15);
          ctx.strokeStyle=cfg.color; ctx.lineWidth=3; ctx.lineCap='round'; ctx.shadowBlur=6; ctx.shadowColor=cfg.shadowColor; ctx.stroke(); ctx.shadowBlur=0;
          ctx.beginPath(); ctx.arc(x+Math.cos(a+0.5)*15,y+Math.sin(a+0.5)*15,4,0,Math.PI*2);
          ctx.fillStyle=cfg.color; ctx.fill();
        }
      } else {
        ctx.beginPath(); ctx.ellipse(W/2,H/2,18,24,Math.sin(t*0.5)*0.3,0,Math.PI*2);
        ctx.fillStyle=cfg.color; ctx.shadowBlur=10; ctx.shadowColor=cfg.shadowColor; ctx.fill(); ctx.shadowBlur=0;
        ctx.beginPath(); ctx.moveTo(W/2,H/2+24);
        for(let i=0;i<=15;i++) ctx.lineTo(W/2+Math.sin(i*0.6+t*3)*6,H/2+24+i*2);
        ctx.strokeStyle=cfg.color.replace('0.8)','0.5)'); ctx.lineWidth=2; ctx.stroke();
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  });
}
