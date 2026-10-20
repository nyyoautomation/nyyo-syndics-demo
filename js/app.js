/* Nyyo — AI demo for property managers (co-ownership / owners associations). Static, replay mode, fictional data only. */
(function () {
  "use strict";
  const BASE = document.body.dataset.base || "./data/en/";
  const ORDER = ["mtg", "bids", "complaint"];
  const loc = "en-US";
  const SEP = ":";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  /* Lucide icons (lucide-static 0.468.0, ISC), inlined at build time: no CDN, rendered in the same task as the markup (no layout shift). */
  const ICONS = /*ICONS*/{"check":"<path d=\"M20 6 9 17l-5-5\" />","circle-alert":"<circle cx=\"12\" cy=\"12\" r=\"10\" /> <line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /> <line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" />","circle-check":"<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m9 12 2 2 4-4\" />","file-search":"<path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3\" /> <path d=\"m9 18-1.5-1.5\" /> <circle cx=\"5\" cy=\"14\" r=\"3\" />","file-text":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" />","file-type":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M9 13v-1h6v1\" /> <path d=\"M12 12v6\" /> <path d=\"M11 18h2\" />","hammer":"<path d=\"m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9\" /> <path d=\"m18 15 4-4\" /> <path d=\"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5\" />","images":"<path d=\"M18 22H4a2 2 0 0 1-2-2V6\" /> <path d=\"m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18\" /> <circle cx=\"12\" cy=\"8\" r=\"2\" /> <rect width=\"16\" height=\"16\" x=\"6\" y=\"2\" rx=\"2\" />","landmark":"<line x1=\"3\" x2=\"21\" y1=\"22\" y2=\"22\" /> <line x1=\"6\" x2=\"6\" y1=\"18\" y2=\"11\" /> <line x1=\"10\" x2=\"10\" y1=\"18\" y2=\"11\" /> <line x1=\"14\" x2=\"14\" y1=\"18\" y2=\"11\" /> <line x1=\"18\" x2=\"18\" y1=\"18\" y2=\"11\" /> <polygon points=\"12 2 20 7 4 7\" />","mail-warning":"<path d=\"M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5\" /> <path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" /> <path d=\"M20 14v4\" /> <path d=\"M20 22v.01\" />","notebook-pen":"<path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\" /> <path d=\"M2 6h4\" /> <path d=\"M2 10h4\" /> <path d=\"M2 14h4\" /> <path d=\"M2 18h4\" /> <path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\" />","octagon-alert":"<path d=\"M12 16h.01\" /> <path d=\"M12 8v4\" /> <path d=\"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z\" />","pencil":"<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" /> <path d=\"m15 5 4 4\" />","sheet":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /> <line x1=\"3\" x2=\"21\" y1=\"9\" y2=\"9\" /> <line x1=\"3\" x2=\"21\" y1=\"15\" y2=\"15\" /> <line x1=\"9\" x2=\"9\" y1=\"9\" y2=\"21\" /> <line x1=\"15\" x2=\"15\" y1=\"9\" y2=\"21\" />","triangle-alert":"<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\" /> <path d=\"M12 9v4\" /> <path d=\"M12 17h.01\" />","x":"<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />"}/*/ICONS*/;
  const icons = (root = document) => root.querySelectorAll("i[data-lucide]").forEach((el) => {
    const n = el.getAttribute("data-lucide"), b = ICONS[n]; if (!b) return;
    el.insertAdjacentHTML("afterend", `<svg class="lucide lucide-${n}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${b}</svg>`);
    el.remove();
  });
  /* docx (Word export) is loaded only when the user asks for it. */
  const DOCX_URL = "https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js";
  let docxP = null;
  const loadDocx = () => window.docx ? Promise.resolve(window.docx) : (docxP = docxP || new Promise((ok, ko) => {
    const s = document.createElement("script"); s.src = DOCX_URL; s.async = true;
    s.onload = () => (window.docx ? ok(window.docx) : ko(new Error("docx"))); s.onerror = () => { docxP = null; ko(new Error("docx")); };
    document.head.appendChild(s);
  }));
  const T = {
    en: {
      page: "p.", min: (m) => (m >= 60 ? Math.floor(m / 60) + " h" + (m % 60 ? " " + String(m % 60).padStart(2, "0") : "") : m + " min"),
      money: (n) => "$" + Number(n).toLocaleString(loc),
      sev: { bad: "Contradiction", warn: "To check", ok: "Consistent" }, resolved: "Resolved by your input",
      confirm: "Confirm", dismiss: "Dismiss", confirmed: "Confirmed", dismissed: "Dismissed", pending: "To decide",
      triage: (c, d, p) => `${c} confirmed · ${d} dismissed · ${p} to decide`,
      checksOk: (n, t) => `${n}/${t} checks passing`, impact: "Impact", action: "Suggested action",
      todo: "To complete", srcKicker: "Extract from the (fictional) document", openSrc: "View extract", fromDoc: "Extracts used from this document",
      inputKicker: "Your input", stale: "Your inputs changed: the draft has been updated.",
            total: "Total", errAvoid: "Errors avoided on this fictional sample: ",
      docxLoading: "The Word library could not load. Check your connection and try again.",
      docxWarn: "HUMAN REVIEW REQUIRED. Fictional demo data. Your firm remains solely responsible for real documents, meeting notices, votes and replies sent. Flagged discrepancies are suggestions: the property manager decides.",
      docxHeader: "Draft · human review required · fictional data",
      contra: "Contradiction check", checks: "Checks on your inputs", srcAppx: "Appendix: cited sources",
      ctHdr: ["Status", "Discrepancy", "Documents involved", "Decision"], ckHdr: ["Check", "Result", "Ref."],
      footer: "Generated by the Nyyo Automation demo · fictional data · does not replace the property manager's review",
      pageOf: ["Page ", " / "], weight: (w) => ` (${w}%)`, project: "Project", firm: "Management firm",
      title: (n) => `${n}: AI for property managers · Nyyo Automation`, loadFail: "Demo data failed to load: ",
      genFirst: "Run the analysis first.", srcLbl: "Sources", more: "Read more", best: "Best", viewSrc: (n) => `View sources (${n})`, byHand: "By hand (est.)", withTool: "With the tool (est.)", printWarn: "HUMAN REVIEW REQUIRED · fictional sample",
    },
  }.en;

  const ALL = {};
  const st = { u: null, form: {}, triage: {}, ready: false, runId: 0 };
  const ex = (id) => st.u.extracts.find((e) => e.id === id);
  const src = (id) => st.u.sources.find((s) => s.id === id);
  const fieldDef = (id) => st.u.fields.find((f) => f.id === id);

  /* ---------- formatting & rules ---------- */
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(v) { if (!v) return "—"; const [y, m, d] = v.split("-"); return `${MON[Number(m) - 1]} ${Number(d)}, ${y}`; }
  function fmt(id, v) {
    const f = fieldDef(id); if (!f) return String(v);
    if (f.type === "money") return T.money(v || 0);
    if (f.type === "date") return fmtDate(v);
    if (f.type === "number") return Number(v).toLocaleString(loc);
    return String(v || "").trim() || "—";
  }
  const fill = (t) => String(t).replace(/\{(\w+)\}/g, (_, k) => (k in st.form ? fmt(k, st.form[k]) : ""));
  function evalQ(q) {
    const r = q.rule, a = st.form[r.f], b = r.vf ? st.form[r.vf] : r.v;
    const num = fieldDef(r.f).type === "number" || fieldDef(r.f).type === "money";
    const A = num ? Number(a) : a, B = num ? Number(b) : b;
    let pass;
    switch (r.op) {
      case "<=": pass = A <= B; break; case ">=": pass = A >= B; break;
      case "<": pass = A < B; break; case ">": pass = A > B; break;
      case "==": pass = A === B; break; case "nonempty": pass = String(a || "").trim().length > 0; break;
      default: pass = false;
    }
    if (num && (a === "" || isNaN(A))) pass = false;
    if (fieldDef(r.f).type === "date" && !a) pass = false;
    return { ...q, pass, msg: fill(pass ? q.ok : q.ko) };
  }
  const runChecks = () => st.u.checks.map(evalQ);
  function cStatus(c, checks) {
    if (!c.live) return { sev: c.sev, resolved: false };
    const q = checks.find((x) => x.id === c.live);
    if (q && q.pass) return { sev: "ok", resolved: c.sev !== "ok" };
    return { sev: c.sev === "ok" ? "bad" : c.sev, resolved: false };
  }

  /* ---------- citations ---------- */
  const refTxt = (e, s) => `${s.name} · ${s.unit === "p." ? T.page + e.page + " · " : ""}${e.loc}`;
  function cite(id) {
    const e = ex(id); if (!e) return "";
    const s = src(e.src);
    return `<button type="button" class="chip cite-btn" data-ex="${esc(id)}" aria-label="${esc(T.openSrc + ": " + refTxt(e, s))}"><span class="chip-ref mono"><i data-lucide="file-search" aria-hidden="true"></i>${esc(refTxt(e, s))}</span><span class="chip-q">${esc(e.text)}</span><span class="chip-more">${T.more}</span></button>`;
  }
  function citeMini(id) {
    const e = ex(id); if (!e) return "";
    const s = src(e.src);
    return `<button type="button" class="chip chip-mini cite-btn" data-ex="${esc(id)}" aria-label="${esc(T.openSrc + ": " + refTxt(e, s))}"><span class="chip-ref mono"><i data-lucide="file-search" aria-hidden="true"></i>${esc(refTxt(e, s))}</span></button>`;
  }
  const srcs = (ids) => (ids && ids.length ? `<details class="srcs"><summary>${T.viewSrc(ids.length)}</summary><div class="chips">${ids.map(cite).join(" ")}</div></details>` : "");
  function citeTxt(id) { const e = ex(id), s = src(e.src); return `${s.name}, ${s.unit === "p." ? T.page + e.page + ", " : ""}${e.loc}`; }

  /* ---------- tabs ---------- */
  function renderTabs() {
    $("#ucTabs").innerHTML = ORDER.map((id) => { const u = ALL[id];
      return `<button type="button" role="tab" class="sec-tab" id="tab-${id}" data-u="${id}" aria-selected="false" aria-controls="demoRoot" tabindex="-1"><i data-lucide="${u.icon}"></i><span><b>${esc(u.name)}</b><small>${esc(u.short)}</small></span></button>`; }).join("");
    $$(".sec-tab").forEach((b) => b.addEventListener("click", () => select(b.dataset.u, true)));
    $("#ucTabs").addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const i = ORDER.indexOf(st.u.id), n = ORDER[(i + (e.key === "ArrowRight" ? 1 : ORDER.length - 1)) % ORDER.length];
      select(n, true); $("#tab-" + n).focus();
    });
  }
  function select(id, user) {
    if (!ALL[id]) id = ORDER[0];
    st.u = ALL[id]; st.form = {}; st.u.fields.forEach((f) => (st.form[f.id] = f.value)); st.triage = {}; st.ready = false;
    document.body.dataset.uc = id;
    $$(".sec-tab").forEach((b) => { const on = b.dataset.u === id; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; });
    if (user) { const p = new URLSearchParams(location.search); p.set("u", id); history.replaceState(null, "", "?" + p.toString() + location.hash); }
    document.title = T.title(st.u.name);
    $("#ucLead").textContent = st.u.lead;
    renderValue(); renderProject(); renderForm();
    $("#panelOut").classList.add("hidden");
    run();
  }

  /* ---------- value ---------- */
  function renderValue() {
    const v = st.u.value;
    $("#valueUc").textContent = st.u.name;
    $("#valueCase").textContent = v.case;
    $("#valueRows").innerHTML = v.rows.map((r) => `<tr><td>${esc(r[0])}</td><td class="v-before">${T.min(r[1])}</td><td class="v-after">${T.min(r[2])}</td></tr>`).join("") +
      `<tr class="v-total"><td>${T.total}</td><td class="v-before">${T.min(v.total[0])}</td><td class="v-after">${T.min(v.total[1])}</td></tr>`;
    $("#valueCards").innerHTML = v.rows.map((r) => `<div class="m-card"><strong class="m-title">${esc(r[0])}</strong><div class="m-ba"><span><small>${T.byHand}</small><b class="v-before">${T.min(r[1])}</b></span><span><small>${T.withTool}</small><b class="v-after">${T.min(r[2])}</b></span></div></div>`).join("") +
      `<div class="m-card m-total"><strong class="m-title">${T.total}</strong><div class="m-ba"><span><small>${T.byHand}</small><b class="v-before">${T.min(v.total[0])}</b></span><span><small>${T.withTool}</small><b class="v-after">${T.min(v.total[1])}</b></span></div></div>`;
    const stats = v.stats;
    $("#valueStats").innerHTML = stats.map((s) => `<div class="v-stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("") +
      `<div class="v-stat v-err"><span><strong>${T.errAvoid}</strong>${v.errors.map(esc).join("; ")}.</span></div>`;
  }

  /* ---------- project & sources ---------- */
  function renderProject() {
    const p = st.u.project;
    $("#projTitle").textContent = p.title;
    $("#projMeta").innerHTML = p.meta.map((m) => `<span><small>${esc(m[0])}</small><strong>${esc(m[1])}</strong></span>`).join("") + `<span class="wide"><small>${T.firm}</small><strong>${esc(p.firm)}</strong></span>`;
    $("#srcFiles").innerHTML = st.u.sources.map((s) => `<button type="button" class="tender-file" data-src="${s.id}"><i data-lucide="${/\.xlsx$/.test(s.name) ? "sheet" : /\.zip$/.test(s.name) ? "images" : /\.txt$/.test(s.name) ? "notebook-pen" : /\.docx$/.test(s.name) ? "file-type" : "file-text"}"></i><span>${esc(s.name)}</span><small>${esc(s.kind)} · ${s.pages} ${esc(s.unit)}</small></button>`).join("");
    $("#pipeSteps").innerHTML = st.u.steps.map((s, i) => `<li data-i="${i}"><span class="ps-dot"></span><span>${esc(s)}</span></li>`).join("");
    icons();
  }

  /* ---------- replay pipeline ---------- */
  async function run() {
    const id = ++st.runId;
    const items = $$("#pipeSteps li");
    items.forEach((li) => li.classList.remove("done", "on"));
    $("#pipeBar").style.width = "0%";
    $("#btnRun").disabled = true;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (let i = 0; i < items.length; i++) {
      if (id !== st.runId) return;
      items[i].classList.add("on");
      await new Promise((r) => setTimeout(r, reduce ? 40 : 420));
      items[i].classList.remove("on"); items[i].classList.add("done");
      $("#pipeBar").style.width = Math.round(((i + 1) / items.length) * 100) + "%";
    }
    if (id !== st.runId) return;
    $("#btnRun").disabled = false;
    st.ready = true;
    renderOutput();
    $("#panelOut").classList.remove("hidden");
  }

  /* ---------- form ---------- */
  function renderForm() {
    $("#liveForm").innerHTML = st.u.fields.map((f) => `<label class="field"><span>${esc(f.label)}${f.unit && f.type !== "money" ? ` <small>(${esc(f.unit)})</small>` : ""}</span>
      <input id="f_${f.id}" data-f="${f.id}" type="${f.type === "money" ? "number" : f.type}" ${f.type === "number" || f.type === "money" ? 'inputmode="decimal" step="any"' : ""} value="${esc(f.value)}" />
      ${f.hint ? `<small class="hint">${esc(f.hint)}</small>` : ""}</label>`).join("");
    $$("#liveForm input").forEach((i) => i.addEventListener("input", () => {
      st.form[i.dataset.f] = i.value; renderChecks(); if (st.ready) { renderOutput(); $("#staleNote").classList.remove("hidden"); }
    }));
    renderChecks();
  }
  function renderChecks() {
    const res = runChecks(), ok = res.filter((r) => r.pass).length;
    $("#checks").innerHTML = res.map((r) => `<li class="chk ${r.pass ? "pass" : "fail"}"><i data-lucide="${r.pass ? "circle-check" : "circle-alert"}"></i><div><strong>${esc(r.label)}</strong><span>${esc(r.msg)}</span>${srcs([r.ref])}</div></li>`).join("");
    $("#checksSummary").textContent = T.checksOk(ok, res.length);
    $("#checksSummary").className = "pill " + (ok === res.length ? "ok" : "bad");
    icons();
  }

  /* ---------- output ---------- */
  function renderOutput() {
    const o = st.u.output, checks = runChecks();
    $("#outTitle").textContent = o.title;
    $("#outSub").textContent = o.sub;
    $("#outBody").innerHTML = o.sections.map((s) => {
      let h = `<div class="prop-sec"><h3>${esc(s.h)}${s.weight ? `<span class="w-pill">${s.weight} %</span>` : ""}</h3>`;
      if (s.items) h += `<ul class="out-items">${s.items.map((x) => `<li class="${x.todo ? "todo" : ""}"><p>${x.todo ? `<span class="todo-tag">${T.todo}</span> ` : ""}${esc(fill(x.t))}</p>${srcs(x.cite)}</li>`).join("")}</ul>`;
      if (s.table) {
        const flagHtml = (r, k) => (r.flag && r.flag[k] ? `<span class="flag"><i data-lucide="triangle-alert" aria-hidden="true"></i><b>${T.sev.warn}</b> ${esc(fill(r.flag[k]))}</span>` : "");
        const best = (r, k) => (r.best === k ? ` <span class="best">${T.best}</span>` : "");
        h += `<div class="m-cards">${s.table.rows.map((r) => `<div class="m-card"><h4 class="m-title">${esc(fill(r.cells[0]))}</h4><dl>${r.cells.slice(1).map((c, i) => `<div class="m-kv${r.flag && r.flag[i + 1] ? " is-flag" : ""}"><dt>${esc(s.table.head[i + 1])}</dt><dd><span class="num">${esc(fill(c))}</span>${best(r, i + 1)}${flagHtml(r, i + 1)}</dd></div>`).join("")}</dl>${srcs(r.cite)}</div>`).join("")}</div>`;
        h += `<div class="d-table"><div class="table-wrap" tabindex="0" role="region" aria-label="${esc(s.h)}"><table class="table cmp-table"><thead><tr>${s.table.head.map((c) => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${s.table.rows.map((r) => `<tr>${r.cells.map((c, k) => (k === 0 ? `<th scope="row">${esc(fill(c))}</th>` : `<td class="${r.flag && r.flag[k] ? "is-flag" : ""}"><span class="num">${esc(fill(c))}</span>${best(r, k)}${flagHtml(r, k)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>
          <details class="srcs"><summary>${T.viewSrc([...new Set(s.table.rows.flatMap((r) => r.cite))].length)}</summary>${s.table.rows.map((r) => `<div class="srcs-group"><p class="srcs-h">${esc(fill(r.cells[0]))}</p><div class="chips">${r.cite.map(cite).join(" ")}</div></div>`).join("")}</details></div>`;
      }
      return h + "</div>";
    }).join("");
    renderContra(checks);
    icons();
  }
  function sideVal(sd) { return fill(sd.v); }
  function renderContra(checks) {
    const cs = st.u.contradictions;
    $("#contra").innerHTML = cs.map((c) => {
      const s = cStatus(c, checks), tri = st.triage[c.id];
      const sides = c.sides.map((sd) => `<div class="side"><small>${esc(sd.label)}</small><strong>${esc(sideVal(sd))}</strong>${ex(sd.e) ? citeMini(sd.e) : `<span class="cite cite-input"><i data-lucide="pencil"></i>${T.inputKicker}</span>`}</div>`).join(`<span class="vs">${s.sev === "ok" && !s.resolved ? "=" : "≠"}</span>`);
      const btns = s.sev === "ok" ? `<span class="pill ok">${s.resolved ? T.resolved : T.sev.ok}</span>` :
        `<div class="tri"><button type="button" class="btn btn-ghost tri-btn ${tri === "c" ? "on" : ""}" data-tri="${c.id}" data-v="c"><i data-lucide="check"></i>${tri === "c" ? T.confirmed : T.confirm}</button><button type="button" class="btn btn-ghost tri-btn ${tri === "d" ? "on" : ""}" data-tri="${c.id}" data-v="d"><i data-lucide="x"></i>${tri === "d" ? T.dismissed : T.dismiss}</button></div>`;
      return `<div class="ct-card sev-${s.sev}${tri === "d" ? " dismissed" : ""}" id="ct-${c.id}"><div class="ct-head"><span class="pill ${s.sev === "ok" ? "ok" : "warn"}"><i data-lucide="${s.sev === "ok" ? "circle-check" : s.sev === "bad" ? "octagon-alert" : "triangle-alert"}" aria-hidden="true"></i>${esc(T.sev[s.sev])}</span><strong>${esc(c.title)}</strong></div>
        <div class="ct-sides">${sides}</div>
        ${s.sev === "ok" ? "" : `<p class="ct-p"><b>${T.impact}${SEP}</b> ${esc(c.impact)}</p><p class="ct-p"><b>${T.action}${SEP}</b> ${esc(c.action)}</p>`}
        ${btns}</div>`;
    }).join("");
    const open = cs.filter((c) => cStatus(c, checks).sev !== "ok");
    const nc = open.filter((c) => st.triage[c.id] === "c").length, nd = open.filter((c) => st.triage[c.id] === "d").length;
    $("#contraSummary").textContent = T.triage(nc, nd, open.length - nc - nd);
  }

  /* ---------- modal ---------- */
  function openModal(html) { const d = $("#srcModal"); $("#srcBody").innerHTML = html; icons(); d.showModal ? d.showModal() : d.setAttribute("open", ""); }
  function showEx(id) {
    const e = ex(id), s = src(e.src);
    openModal(`<p class="src-kicker">${T.srcKicker}</p><h3>${esc(s.name)} · ${s.unit === "p." ? T.page + e.page + " · " : ""}${esc(e.loc)}</h3><blockquote class="src-quote">${esc(e.text)}</blockquote><p class="doc-note">${esc(s.kind)} — ${esc(st.u.project.title)}</p>`);
  }
  function showSrc(id) {
    const s = src(id), list = st.u.extracts.filter((e) => e.src === id).sort((a, b) => a.page - b.page);
    openModal(`<p class="src-kicker">${T.srcKicker}</p><h3>${esc(s.name)} · ${esc(s.kind)} · ${s.pages} ${esc(s.unit)}</h3><h4>${T.fromDoc}</h4>${list.map((e) => `<blockquote class="src-quote"><span class="mono">${s.unit === "p." ? T.page + e.page + " · " : ""}${esc(e.loc)}</span>${esc(e.text)}</blockquote>`).join("")}`);
  }

  /* ---------- DOCX ---------- */
  async function downloadDocx() {
    if (!st.ready) { alert(T.genFirst); return; }
    let D; const btn = $("#btnDocx"); btn.disabled = true;
    try { D = await loadDocx(); } catch (e) { alert(T.docxLoading); return; } finally { btn.disabled = false; }
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, Header, Footer, PageNumber, AlignmentType, ShadingType } = D;
    const u = st.u, checks = runChecks(), used = new Set();
    const bd = { style: BorderStyle.SINGLE, size: 4, color: "C9D3E3" }, borders = { top: bd, bottom: bd, left: bd, right: bd };
    const cell = (t, w, o = {}) => new TableCell({ borders, width: { size: w, type: WidthType.DXA }, shading: o.fill ? { type: ShadingType.CLEAR, color: "auto", fill: o.fill } : undefined, margins: { top: 60, bottom: 60, left: 90, right: 90 },
      children: [new Paragraph({ children: [new TextRun({ text: String(t), bold: !!o.bold, size: o.size || 18, color: o.color })] })] });
    const table = (ws, head, rows) => new Table({ width: { size: ws.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: ws,
      rows: [...(head ? [new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, ws[i], { bold: true, fill: "E8EEF9" })) })] : []),
        ...rows.map((r) => new TableRow({ children: r.map((c, i) => (c && typeof c === "object" ? cell(c.t, ws[i], c) : cell(c, ws[i]))) }))] });
    const srcRun = (ids) => { ids.forEach((i) => used.add(i)); return ids.length ? [new TextRun({ text: "  [" + ids.map(citeTxt).join(" ; ") + "]", italics: true, color: "5B6B85", size: 17 })] : []; };
    const ch = [
      new Paragraph({ text: u.output.title, heading: HeadingLevel.TITLE }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: u.project.title, bold: true, size: 24 })] }),
      new Paragraph({ spacing: { after: 200 }, shading: { type: ShadingType.CLEAR, color: "auto", fill: "FFF4D6" }, children: [new TextRun({ text: T.docxWarn, bold: true, color: "8A4B00", size: 19 })] }),
      table([2600, 6400], null, [...u.project.meta, [T.firm, u.project.firm]].map((m) => [{ t: m[0], bold: true, fill: "EEF2F8" }, m[1]])),
      new Paragraph({ spacing: { before: 160, after: 160 }, children: [new TextRun({ text: u.output.sub, italics: true })] }),
    ];
    for (const s of u.output.sections) {
      ch.push(new Paragraph({ text: s.h + (s.weight ? T.weight(s.weight) : ""), heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 } }));
      (s.items || []).forEach((x) => ch.push(new Paragraph({ bullet: { level: 0 }, spacing: { after: 80 }, children: [...(x.todo ? [new TextRun({ text: T.todo.toUpperCase() + SEP + " ", bold: true, color: "B54708" })] : []), new TextRun(fill(x.t)), ...srcRun(x.cite)] })));
      if (s.table) {
        const n = s.table.head.length, ws = n === 5 ? [700, 700, 3900, 1300, 1400] : Array(n).fill(Math.floor(8000 / n));
        ch.push(table([...ws, 1800], [...s.table.head, "Source"], s.table.rows.map((r) => { r.cite.forEach((i) => used.add(i)); return [...r.cells.map(fill), r.cite.map(citeTxt).join(" ; ")]; })));
      }
    }
    ch.push(new Paragraph({ text: T.contra, heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 } }));
    ch.push(table([1300, 2900, 3300, 1500], T.ctHdr, u.contradictions.map((c) => {
      const s = cStatus(c, checks), tri = st.triage[c.id];
      c.sides.forEach((sd) => ex(sd.e) && used.add(sd.e));
      return [{ t: s.resolved ? T.resolved : T.sev[s.sev], bold: true, color: s.sev === "bad" ? "B42318" : s.sev === "ok" ? "1E7A3C" : "8A4B00" },
        c.title + (s.sev === "ok" ? "" : " — " + c.action), c.sides.map((sd) => `${sd.label}${SEP} ${sideVal(sd)}`).join(" | "),
        s.sev === "ok" ? "—" : tri === "c" ? T.confirmed : tri === "d" ? T.dismissed : T.pending];
    })));
    ch.push(new Paragraph({ text: T.checks, heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 } }));
    ch.push(table([3200, 4300, 1500], T.ckHdr, checks.map((c) => { used.add(c.ref); return [c.label, { t: (c.pass ? "✓ " : "✗ ") + c.msg, color: c.pass ? "1E7A3C" : "B42318" }, ex(c.ref).loc]; })));
    ch.push(new Paragraph({ text: T.srcAppx, heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 } }));
    [...used].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1))).forEach((i) => { const e = ex(i); ch.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: citeTxt(i), bold: true, size: 17 }), new TextRun({ text: " — " + e.text, size: 17 })] })); });
    ch.push(new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: T.footer, italics: true, color: "5B6B85", size: 16 })] }));
    const doc = new Document({ creator: "Nyyo Automation", title: u.output.title, styles: { default: { document: { run: { font: "Calibri", size: 21 } } } },
      sections: [{ properties: { page: { margin: { top: 1200, bottom: 1100, left: 1200, right: 1200 } } },
        headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: T.docxHeader, size: 16, color: "8A4B00" })] })] }) },
        footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ size: 16, color: "5B6B85", children: [T.pageOf[0], PageNumber.CURRENT, T.pageOf[1], PageNumber.TOTAL_PAGES] })] })] }) },
        children: ch }] });
    const blob = await Packer.toBlob(doc), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = u.docx + ".docx"; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  }
  function exportPdf() {
    if (!st.ready) { alert(T.genFirst); return; }
    const root = $("#printRoot");
    root.innerHTML = `<div class="print-doc"><h1>${esc(st.u.output.title)}</h1><p class="pw">${T.printWarn}</p><p>${esc(st.u.project.title)}</p>${$("#outBody").innerHTML}<h2>${T.contra}</h2>${$("#contra").innerHTML}<h2>${T.checks}</h2><ul>${$("#checks").innerHTML}</ul></div>`;
    root.querySelectorAll("details").forEach((d) => (d.open = true));
    root.classList.remove("hidden");
    const prev = document.title; document.title = st.u.docx; window.print(); document.title = prev;
    setTimeout(() => { root.classList.add("hidden"); root.innerHTML = ""; }, 500);
  }

  /* ---------- boot ---------- */
  async function main() {
    try {
      const list = await Promise.all(ORDER.map((id) => fetch(BASE + id + ".json").then((r) => { if (!r.ok) throw new Error(id + ".json " + r.status); return r.json(); })));
      list.forEach((d) => (ALL[d.id] = d));
    } catch (e) { $("#ucLead").textContent = T.loadFail + e.message; return; }
    renderTabs();
    document.addEventListener("click", (e) => {
      const x = e.target.closest("[data-ex]"); if (x) { showEx(x.dataset.ex); return; }
      const s = e.target.closest("[data-src]"); if (s) { showSrc(s.dataset.src); return; }
      const t = e.target.closest("[data-tri]");
      if (t) { const id = t.dataset.tri; st.triage[id] = st.triage[id] === t.dataset.v ? undefined : t.dataset.v; renderContra(runChecks()); icons(); }
    });
    $("#srcClose").addEventListener("click", () => $("#srcModal").close());
    $("#srcModal").addEventListener("click", (e) => { if (e.target.id === "srcModal") $("#srcModal").close(); });
    $("#btnRun").addEventListener("click", () => { st.ready = false; run(); });
    $("#btnRunSticky").addEventListener("click", () => { $("#demoRoot").scrollIntoView({ behavior: "smooth" }); st.ready = false; run(); });
    $("#btnDocx").addEventListener("click", downloadDocx);
    $("#btnPdf").addEventListener("click", exportPdf);
    const q = new URLSearchParams(location.search).get("u");
    select(ORDER.includes(q) ? q : ORDER[0], false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", main); else main();
})();
