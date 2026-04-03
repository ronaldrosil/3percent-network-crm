*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --gold: #C9A84C;
  --gold-light: #E8C96B;
  --gold-dim: #7A5F28;
  --obsidian: #0A0B0E;
  --carbon: #12141A;
  --slate: #1C1F2A;
  --panel: #1F2230;
  --border: rgba(201,168,76,0.18);
  --border-soft: rgba(255,255,255,0.06);
  --text: #F0EDE6;
  --muted: #8A8E9A;
  --danger: #E05252;
  --success: #52C58A;
  --warm: #E8784A;
  --blue: #5B8FE8;
  --radius: 12px;
  --shadow: 0 8px 40px rgba(0,0,0,0.5);
}

body {
  background: var(--obsidian);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--carbon); }
::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 4px; }

/* LAYOUT */
.app { display: flex; height: 100vh; overflow: hidden; }

/* SIDEBAR */
.sidebar {
  width: 240px; min-width: 240px;
  background: var(--carbon);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  padding: 24px 0; gap: 2px;
  overflow-y: auto;
}
.sidebar-logo { padding: 0 20px 24px; border-bottom: 1px solid var(--border-soft); margin-bottom: 12px; }
.sidebar-logo h1 {
  font-family: 'Playfair Display', serif; font-size: 26px;
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.sidebar-logo p { font-size: 11px; color: var(--muted); margin-top: 2px; letter-spacing: 1.5px; text-transform: uppercase; }
.nav-section { padding: 16px 20px 6px; font-size: 10px; letter-spacing: 2px; color: var(--gold-dim); text-transform: uppercase; font-weight: 600; }
.nav-item {
  display: flex; align-items: center; gap: 12px; padding: 11px 20px;
  cursor: pointer; transition: all 0.2s; color: var(--muted); font-size: 13.5px; font-weight: 500;
  border-left: 3px solid transparent; user-select: none; position: relative;
}
.nav-item:hover { color: var(--text); background: rgba(255,255,255,0.04); }
.nav-item.active { color: var(--gold); border-left-color: var(--gold); background: rgba(201,168,76,0.08); }
.nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
.nav-badge {
  margin-left: auto; background: var(--danger); border-radius: 10px;
  min-width: 18px; height: 18px; display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; padding: 0 4px;
}

/* MAIN */
.main { flex: 1; overflow-y: auto; background: var(--obsidian); display: flex; flex-direction: column; }

/* TOPBAR */
.topbar {
  padding: 18px 28px; display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid var(--border-soft); background: rgba(10,11,14,0.85);
  backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 50;
}
.topbar-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; }
.topbar-title span { color: var(--gold); }
.topbar-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
.topbar-actions { display: flex; gap: 10px; align-items: center; }

/* BUTTONS */
.btn {
  padding: 9px 18px; border-radius: 8px; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
  transition: all 0.2s; display: inline-flex; align-items: center; gap: 7px; white-space: nowrap;
}
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-gold { background: linear-gradient(135deg, var(--gold), var(--gold-dim)); color: var(--obsidian); }
.btn-gold:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(201,168,76,0.3); }
.btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); }
.btn-ghost:hover:not(:disabled) { color: var(--text); border-color: rgba(255,255,255,0.2); }
.btn-danger { background: rgba(224,82,82,0.12); color: var(--danger); border: 1px solid rgba(224,82,82,0.25); }
.btn-danger:hover:not(:disabled) { background: rgba(224,82,82,0.2); }
.btn-sm { padding: 6px 12px; font-size: 12px; }
.btn-xs { padding: 4px 10px; font-size: 11px; }

/* PAGE */
.page { padding: 28px; flex: 1; }
.page-section { margin-bottom: 32px; }
.section-title {
  font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700;
  color: var(--gold); margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
}
.section-title::after { content: ''; flex: 1; height: 1px; background: var(--border-soft); }

/* CARDS */
.card { background: var(--panel); border: 1px solid var(--border-soft); border-radius: var(--radius); padding: 20px; }
.card-gold { border-color: var(--border); background: linear-gradient(135deg, rgba(201,168,76,0.06), var(--panel)); }

/* GRID */
.grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
.grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }

/* KPI */
.kpi { display: flex; flex-direction: column; gap: 6px; }
.kpi-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); font-weight: 600; }
.kpi-value { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 900; line-height: 1; }
.kpi-sub { font-size: 12px; color: var(--muted); }
.kpi-gold .kpi-value { color: var(--gold); }
.kpi-green .kpi-value { color: var(--success); }
.kpi-warm .kpi-value { color: var(--warm); }
.kpi-blue .kpi-value { color: var(--blue); }

/* TAGS */
.tag { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.tag-prospect { background: rgba(91,143,232,0.15); color: var(--blue); }
.tag-client { background: rgba(82,197,138,0.15); color: var(--success); }
.tag-partner { background: rgba(232,120,74,0.15); color: var(--warm); }
.tag-leader { background: rgba(201,168,76,0.15); color: var(--gold); }

/* HEAT */
.heat-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; flex-shrink: 0; }

/* SCORE BAR */
.score-bar { height: 4px; background: var(--slate); border-radius: 2px; overflow: hidden; }
.score-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }

/* TABLE */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th { text-align: left; padding: 10px 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); border-bottom: 1px solid var(--border-soft); font-weight: 600; white-space: nowrap; }
td { padding: 13px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
tr:hover td { background: rgba(255,255,255,0.02); }
tr.clickable { cursor: pointer; }

/* FORM */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group.full { grid-column: 1 / -1; }
label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); }
input, select, textarea {
  background: var(--slate); border: 1px solid var(--border-soft); border-radius: 8px;
  padding: 10px 14px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 13px;
  transition: border-color 0.2s; outline: none; width: 100%;
}
input:focus, select:focus, textarea:focus { border-color: var(--gold); }
textarea { resize: vertical; min-height: 80px; }
select option { background: var(--slate); }
input[type="range"] { padding: 4px 0; cursor: pointer; accent-color: var(--gold); }

/* MODAL */
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);
  z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal {
  background: var(--panel); border: 1px solid var(--border); border-radius: 16px;
  padding: 32px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto;
  box-shadow: var(--shadow);
}
.modal-title { font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 24px; }
.modal-title span { color: var(--gold); }

/* AI PANEL */
.ai-panel { background: linear-gradient(135deg, rgba(201,168,76,0.05), var(--panel)); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
.ai-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.ai-icon { font-size: 22px; }
.ai-title { font-family: 'Playfair Display', serif; font-size: 17px; color: var(--gold); }
.ai-response { background: var(--slate); border-radius: 10px; padding: 16px; font-size: 13px; line-height: 1.75; color: var(--text); min-height: 60px; white-space: pre-wrap; }
.ai-response.loading { color: var(--muted); font-style: italic; }
.ai-actions { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }

/* PIPELINE */
.pipeline { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 8px; }
.pipe-col { min-width: 220px; background: var(--panel); border-radius: var(--radius); border: 1px solid var(--border-soft); padding: 16px; flex: 1; }
.pipe-col-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--border-soft); }
.pipe-col-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
.pipe-badge { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
.pipe-prospect .pipe-col-title { color: var(--blue); }
.pipe-prospect .pipe-badge { background: rgba(91,143,232,0.15); color: var(--blue); }
.pipe-client .pipe-col-title { color: var(--success); }
.pipe-client .pipe-badge { background: rgba(82,197,138,0.15); color: var(--success); }
.pipe-partner .pipe-col-title { color: var(--warm); }
.pipe-partner .pipe-badge { background: rgba(232,120,74,0.15); color: var(--warm); }
.pipe-leader .pipe-col-title { color: var(--gold); }
.pipe-leader .pipe-badge { background: rgba(201,168,76,0.15); color: var(--gold); }
.pipe-card { background: var(--slate); border-radius: 8px; padding: 12px; margin-bottom: 8px; border: 1px solid var(--border-soft); cursor: pointer; transition: all 0.2s; }
.pipe-card:hover { border-color: var(--border); transform: translateY(-1px); }
.pipe-card-name { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.pipe-card-meta { font-size: 11px; color: var(--muted); }

/* ACTION BAR */
.action-bar { background: var(--panel); border: 1px solid var(--border-soft); border-radius: var(--radius); padding: 24px; display: flex; gap: 0; }
.action-counter { text-align: center; flex: 1; padding: 0 16px; }
.action-counter + .action-counter { border-left: 1px solid var(--border-soft); }
.action-counter-value { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 900; line-height: 1; }
.action-counter-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); margin-top: 4px; }
.action-btns { display: flex; justify-content: center; gap: 14px; margin-top: 10px; }
.action-btn { font-size: 22px; cursor: pointer; transition: transform 0.15s; user-select: none; }
.action-btn:hover { transform: scale(1.35); }

/* REMINDER */
.reminder-item { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: var(--slate); border-radius: 10px; margin-bottom: 8px; border-left: 3px solid transparent; }
.reminder-item.urgent { border-left-color: var(--danger); }
.reminder-item.today { border-left-color: var(--gold); }
.reminder-item.upcoming { border-left-color: var(--blue); }
.reminder-emoji { font-size: 20px; flex-shrink: 0; }
.reminder-content { flex: 1; min-width: 0; }
.reminder-name { font-size: 13px; font-weight: 600; }
.reminder-desc { font-size: 12px; color: var(--muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.reminder-time { font-size: 11px; color: var(--muted); white-space: nowrap; }

/* CHIPS */
.chip-row { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { padding: 5px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; border: 1px solid var(--border-soft); color: var(--muted); transition: all 0.2s; user-select: none; }
.chip:hover { border-color: var(--border); color: var(--text); }
.chip.active { background: rgba(201,168,76,0.15); border-color: var(--gold); color: var(--gold); }

/* SEARCH */
.search-bar { display: flex; align-items: center; gap: 10px; background: var(--slate); border: 1px solid var(--border-soft); border-radius: 8px; padding: 0 14px; transition: border-color 0.2s; }
.search-bar:focus-within { border-color: var(--gold); }
.search-bar input { background: transparent; border: none; flex: 1; padding: 10px 0; width: 100%; }

/* VOICE */
.voice-btn { width: 42px; height: 42px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.2s; background: var(--slate); color: var(--muted); flex-shrink: 0; }
.voice-btn:hover { color: var(--text); }
.voice-btn.active { background: rgba(224,82,82,0.2); color: var(--danger); animation: voice-pulse 1s infinite; }
@keyframes voice-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(224,82,82,0.4)} 50%{box-shadow:0 0 0 8px rgba(224,82,82,0)} }

/* TOAST */
.toast { position: fixed; bottom: 24px; right: 24px; background: var(--panel); border: 1px solid var(--border); border-radius: 10px; padding: 14px 20px; font-size: 13px; z-index: 9999; box-shadow: var(--shadow); animation: slideUp 0.3s ease; display: flex; align-items: center; gap: 10px; max-width: 360px; }
@keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }

/* PROFILE GRID */
.profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.profile-item { background: var(--slate); border-radius: 8px; padding: 12px 14px; }
.profile-item-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 4px; }
.profile-item-value { font-size: 13px; font-weight: 500; }

/* EMPTY */
.empty { text-align: center; padding: 48px 20px; color: var(--muted); }
.empty-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.5; }
.empty-text { font-size: 14px; }

/* DIVIDER */
.divider { height: 1px; background: var(--border-soft); margin: 20px 0; }

/* LOADING SPINNER */
.spinner { width: 20px; height: 20px; border: 2px solid var(--border-soft); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* PULSE */
.pulse { animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

/* AUTH PAGE */
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--obsidian); padding: 20px; }
.auth-card { background: var(--panel); border: 1px solid var(--border); border-radius: 20px; padding: 48px 40px; width: 100%; max-width: 420px; box-shadow: var(--shadow); }
.auth-logo { text-align: center; margin-bottom: 36px; }
.auth-logo h1 { font-family: 'Playfair Display', serif; font-size: 48px; background: linear-gradient(135deg, var(--gold-light), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.auth-logo p { font-size: 12px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
.auth-subtitle { font-size: 14px; color: var(--muted); text-align: center; margin-bottom: 28px; }
.auth-error { background: rgba(224,82,82,0.1); border: 1px solid rgba(224,82,82,0.25); border-radius: 8px; padding: 12px 16px; font-size: 13px; color: var(--danger); margin-bottom: 16px; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .grid-3 { grid-template-columns: repeat(2,1fr); }
  .grid-4 { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 640px) {
  .sidebar { width: 56px; min-width: 56px; }
  .sidebar-logo, .nav-item span.nav-label, .nav-section { display: none; }
  .nav-item { justify-content: center; padding: 14px; }
  .grid-3, .grid-2, .grid-4 { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .pipeline { flex-direction: column; }
  .page { padding: 16px; }
  .topbar { padding: 14px 16px; }
  .action-bar { flex-direction: column; gap: 16px; }
  .action-counter + .action-counter { border-left: none; border-top: 1px solid var(--border-soft); padding-top: 16px; }
}
