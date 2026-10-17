/* =====================================================================
   CBIST — A NOSSA HISTÓRIA  ·  fundos fotográficos da Central e da Inscrição
   Versão 2 (17/10/2026)

   PARTE 1 (DADOS) é a única a editar: fotos, legendas, edições, campeões.
   PARTE 2 (MOTOR) monta o cabeçalho com fotos, o separador «História»,
   a faixa «Porquê jogar» da inscrição e o modo guia.

   COMO ACRESCENTAR UMA FOTOGRAFIA
   1. Correr  python preparar_fotos.py  "pasta com as fotos originais"
      → cria fotos/<nome>-800.webp e fotos/<nome>-1600.webp (sem GPS/EXIF).
   2. Carregar os dois ficheiros para a pasta fotos/ do GitHub.
   3. Aqui, escrever o <nome> (sem -800/-1600 nem .webp) no campo foto:"".
   MODO GUIA: abrir a página com ?guia=1 no fim do endereço mostra, em cada
   moldura vazia, que fotografia lá deve ir.
   ===================================================================== */
(function () {
"use strict";

/* ============================ PARTE 1 — DADOS ============================ */
const DADOS = {
  // WhatsApp que recebe fotografias antigas (só algarismos, com o indicativo 258)
  contactoFotos: "258847874692",

  // RASCUNHO — a Comissão pode reescrever. Não acrescentar factos não confirmados.
  intro: {
    pt: "Organizado pela Associação Craques da Boca, o torneio junta em Maputo equipas de veteranos — homens a partir dos 35 anos e mulheres a partir dos 30 — vindas de Moçambique e da região, para dias de basquetebol, convívio e festa. Em 2026 chega à 10.ª edição. Aqui contamos as edições anteriores: as equipas, os campeões e os momentos que fizeram o torneio.",
    en: "Run by the Craques da Boca Association, the tournament brings veterans' teams — men aged 35 and over, women aged 30 and over — from Mozambique and the region to Maputo for days of basketball, friendship and celebration. In 2026 it reaches its 10th edition. Here is the story of the editions so far: the teams, the champions and the moments that made the tournament."
  },
  numeros: [
    {v: "10", pt: "edições",                  en: "editions"},
    {v: "6",  pt: "categorias",               en: "categories"},
    {v: "7",  pt: "países convidados em 2026", en: "countries invited in 2026"}
  ],

  // Cabeçalho da Central: as fotos passam por esta ordem e contam a história.
  // ano/ed = de quando é a foto; pt/en = legenda curta (aparece ao lado do ano).
  capa: [
    {id: "c1", foto: "", foco: "50% 40%", ano: "", ed: 1,  pt: "O início", en: "Where it all began",
     vaga: {pt: "A primeira equipa ou os fundadores dos Craques da Boca, na 1.ª edição. Horizontal.",
            en: "The first Craques da Boca team or the founders, at the 1st edition. Landscape."}},
    {id: "c2", foto: "", foco: "50% 40%", ano: "", ed: "", pt: "Os primeiros anos", en: "The early years",
     vaga: {pt: "Um lance de jogo de uma das primeiras edições: bola no ar, bancada ao fundo. Horizontal.",
            en: "Game action from one of the early editions: ball in the air, crowd behind. Landscape."}},
    {id: "c3", foto: "", foco: "50% 40%", ano: "", ed: "", pt: "Além-fronteiras", en: "Across borders",
     vaga: {pt: "A primeira equipa estrangeira no torneio, de preferência com a bandeira do país. Horizontal.",
            en: "The first foreign team at the tournament, ideally with its flag. Landscape."}},
    {id: "c4", foto: "", foco: "50% 40%", ano: "", ed: "", pt: "Elas também jogam", en: "The women's game",
     vaga: {pt: "Um jogo ou uma equipa das categorias femininas. Horizontal.",
            en: "A game or a team from the women's categories. Landscape."}},
    {id: "c5", foto: "", foco: "50% 35%", ano: "", ed: "", pt: "A glória", en: "Glory",
     vaga: {pt: "Campeões a levantar o troféu, em qualquer edição. Horizontal.",
            en: "Champions lifting the trophy, any edition. Landscape."}},
    {id: "c6", foto: "", foco: "50% 40%", ano: "2025", ed: 9, pt: "Todas as equipas da 9.ª edição", en: "Every team at the 9th edition",
     vaga: {pt: "Fotografia de grupo de todas as equipas, ou a cerimónia de abertura de 2025. Horizontal, larga.",
            en: "Group photo of all teams, or the 2025 opening ceremony. Wide landscape."}}
  ],

  // Formulário de inscrição
  inscricao: {
    capa: [
      {id: "i1", foto: "", foco: "50% 45%", ano: "", ed: "", pt: "A abertura", en: "Opening day",
       vaga: {pt: "Todas as equipas alinhadas em campo na abertura, ou a bancada cheia. Horizontal, larga.",
              en: "All teams lined up on court at the opening, or a packed stand. Wide landscape."}}
    ],
    faixa: [
      {id: "f1", foto: "", foco: "50% 40%", titulo: {pt: "Competição", en: "Competition"},
       texto: {pt: "Basquetebol a sério, por escalões de idade.", en: "Real basketball, by age group."},
       vaga: {pt: "Um lance intenso entre veteranos. Vertical ou quadrada.", en: "An intense moment between veterans. Portrait or square."}},
      {id: "f2", foto: "", foco: "50% 40%", titulo: {pt: "Amizade", en: "Friendship"},
       texto: {pt: "Adversários em campo, amigos fora dele.", en: "Rivals on court, friends off it."},
       vaga: {pt: "Equipas juntas depois do jogo, o convívio. Vertical ou quadrada.", en: "Teams together after the game. Portrait or square."}},
      {id: "f3", foto: "", foco: "50% 40%", titulo: {pt: "Internacional", en: "International"},
       texto: {pt: "Equipas de Moçambique e da região.", en: "Teams from Mozambique and the region."},
       vaga: {pt: "Uma equipa visitante (Lesoto, África do Sul, Essuatíni…). Vertical ou quadrada.", en: "A visiting team (Lesotho, South Africa, Eswatini…). Portrait or square."}},
      {id: "f4", foto: "", foco: "50% 40%", titulo: {pt: "Glória", en: "Glory"},
       texto: {pt: "Troféus, medalhas e a gala final.", en: "Trophies, medals and the awards gala."},
       vaga: {pt: "Troféus, medalhas ou a entrega de prémios. Vertical ou quadrada.", en: "Trophies, medals or the prize-giving. Portrait or square."}}
    ]
  },

  // Textura muito leve no fundo das duas páginas (opcional): bola, rede ou piso, sem pessoas
  textura: "",

  // ILUSTRAÇÕES (IA) — imagens fictícias geradas por inteligência artificial, usadas só enquanto
  // não houver fotografias reais. Mostram sempre a etiqueta «Imagem ilustrativa (IA)» e nunca
  // aparecem na linha do tempo da História. Para as retirar de todo: usar: false.
  ilustracoes: {
    usar: true,
    central: [
      {foto: "ia-jogo",     foco: "66% 40%", pt: "Basquetebol de veteranos",   en: "Veterans' basketball"},
      {foto: "ia-feminino", foco: "74% 50%", pt: "As categorias femininas",    en: "The women's categories"},
      {foto: "ia-trofeu",   foco: "70% 30%", pt: "A conquista do título",      en: "Winning the title"}
    ],
    inscricao: [
      {foto: "ia-abertura", foco: "50% 60%", pt: "A abertura do torneio",      en: "Opening day"}
    ],
    faixa: {f1: "ia-competicao", f2: "ia-amizade", f3: "ia-internacional", f4: "ia-gloria"}
  },

  // Uma linha por edição. Só aparecem ao público as edições com «ano» preenchido.
  // equipas / paises: quantas equipas e quantos países participaram (números)
  // campeoes: {M35:"Clube", M40:"", M50:"", F30:"", F40:"", F50:""}
  edicoes: [
    {ed: 1,  ano: "", datas: "", local: "", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 2,  ano: "", datas: "", local: "", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 3,  ano: "", datas: "", local: "", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 4,  ano: "", datas: "", local: "", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 5,  ano: "", datas: "", local: "", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 6,  ano: "", datas: "", local: "", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 7,  ano: "", datas: "", local: "", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 8,  ano: "", datas: "", local: "", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 9,  ano: "2025", datas: "4–6 Dez", local: "Maputo", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: ""},
    {ed: 10, ano: "2026", datas: "3–5 Dez", local: "Maputo", foto: "", foco: "", equipas: "", paises: "", texto: {pt: "", en: ""}, campeoes: {}, mvp: "", actual: true}
  ],

  // Mais fotografias (qualquer edição): {foto:"", ano:"", pt:"", en:""}
  galeria: [],

  // Lendas: quem marcou o torneio (fundadores, presentes em todas as edições, …)
  // {nome:"", clube:"", foto:"", titulo:{pt:"Fundador", en:"Founder"}}
  lendas: []
};

/* ============================ PARTE 2 — MOTOR ============================ */
const CATS = [["M35", "M+35"], ["M40", "M+40"], ["M50", "M+50"], ["F30", "F+30"], ["F40", "F+40"], ["F50", "F+50"]];
let GUIA = false;
try { GUIA = new URLSearchParams(location.search).has("guia"); } catch (e) {}
const RAIZ = (() => { try { return document.currentScript.src.replace(/historia\.js(\?.*)?$/, ""); } catch (e) { return ""; } })();
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const src = (n, w) => `${RAIZ}fotos/${encodeURIComponent(n)}-${w}.webp`;
const srcset = n => `${src(n, 800)} 800w, ${src(n, 1600)} 1600w`;
const reduzido = () => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
const poupar = () => { try { return !!(navigator.connection && navigator.connection.saveData); } catch (e) { return false; } };
const ord = (n, lang) => lang === "en" ? n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th") : n + ".ª";

const L = {
  pt: {ed: n => `${ord(n, "pt")} edição`, pausa: "Pausar fotografias", tocar: "Continuar fotografias", foto: n => `Fotografia ${n}`,
       vaga: "Foto em falta", guia: "Modo guia: cada moldura tracejada diz que fotografia lá deve ir. Para voltar ao normal, tire «?guia=1» do endereço.",
       historia: "A nossa história", edAEd: "Edição a edição", honra: "Quadro de honra", galeria: "Galeria", mvp: "MVP",
       porConf: "Ano, datas e campeões por confirmar.", ajudaT: "Ajude-nos a contar a história",
       ajudaP: "Tem fotografias, cartazes ou a lista de campeões das edições anteriores? Envie pelo WhatsApp como Documento (para manter a qualidade), com o ano e a categoria de cada foto.",
       ajudaB: "Enviar fotos pelo WhatsApp", ajudaMsg: "Olá! Tenho fotos/informação das edições anteriores do Craques da Boca International Summer Tournament:",
       agoraP: "A próxima página escreve-se em campo. Inscrições até 9 de Novembro.", agoraFim: "A 10.ª edição está a ser escrita em campo.",
       inscrever: "Inscrever equipa", aoVivo: "Resultados ao vivo", porque: "10 edições de basquetebol e amizade", verHist: "A nossa história →",
       vagaEd: n => `Equipa campeã, cartaz ou fotografia de grupo da ${n}.ª edição.`, vagaGal: "Mais fotos de qualquer edição (jogos, bancada, convívio).",
       categoria: "Categoria", fechar: "Fechar", titulos: "Títulos por clube", lendas: "Lendas do torneio",
       eqN: n => `${n} equipas`, paN: n => `${n} ${n == 1 ? "país" : "países"}`,
       vagaLenda: "Retrato de um fundador ou de quem jogou todas as edições (vertical), com o nome e o clube.",
       ia: "Imagem ilustrativa (IA)", iaCurta: "Ilustração IA"},
  en: {ed: n => `${ord(n, "en")} edition`, pausa: "Pause photos", tocar: "Play photos", foto: n => `Photo ${n}`,
       vaga: "Missing photo", guia: "Guide mode: each dashed frame says which photo belongs there. To go back to normal, remove “?guia=1” from the address.",
       historia: "Our story", edAEd: "Edition by edition", honra: "Roll of honour", galeria: "Gallery", mvp: "MVP",
       porConf: "Year, dates and champions to be confirmed.", ajudaT: "Help us tell the story",
       ajudaP: "Do you have photos, posters or the list of champions from past editions? Send them on WhatsApp as a Document (to keep the quality), with the year and category of each photo.",
       ajudaB: "Send photos on WhatsApp", ajudaMsg: "Hello! I have photos/information from past editions of the Craques da Boca International Summer Tournament:",
       agoraP: "The next chapter is written on court. Registration closes 9 November.", agoraFim: "The 10th edition is being written on court.",
       inscrever: "Register a team", aoVivo: "Live results", porque: "10 editions of basketball and friendship", verHist: "Our story →",
       vagaEd: n => `Champion team, poster or group photo of the ${ord(n, "en")} edition.`, vagaGal: "More photos from any edition (games, crowd, socials).",
       categoria: "Category", fechar: "Close", titulos: "Titles by club", lendas: "Tournament legends",
       eqN: n => `${n} teams`, paN: n => `${n} ${n == 1 ? "country" : "countries"}`,
       vagaLenda: "Portrait of a founder or of someone who played every edition (portrait), with name and club.",
       ia: "Illustrative image (AI)", iaCurta: "AI illustration"}
};
const T = lang => L[lang] || L.pt;
const txt = (o, lang) => (o && (o[lang] || o.pt)) || "";

function vagaHTML(titulo, desc, cls) {
  return `<div class="vaga ${cls || ""}"><b>📷 ${esc(titulo)}</b><span>${esc(desc)}</span></div>`;
}
function imgHTML(nome, foco, alt, opts) {
  opts = opts || {};
  return `<img src="${src(nome, 800)}" ${opts.grande ? `srcset="${srcset(nome)}" sizes="${opts.sizes || "100vw"}"` : ""} alt="${esc(alt)}" loading="lazy" decoding="async"` +
    ` style="object-position:${esc(foco || "50% 50%")}" ${opts.zoom ? `data-zoom="${esc(nome)}" data-legenda="${esc(alt)}"` : ""} onerror="this.remove()">`;
}

/* ---------- cabeçalho com fotografias que passam ---------- */
function capa(header, lista, getLang) {
  if (!header) return {refresh() {}};
  const bg = document.createElement("div");
  bg.className = "hero-bg"; bg.setAttribute("aria-hidden", "true");
  header.insertBefore(bg, header.firstChild);
  const cap = header.querySelector(".hero-cap"), ctl = header.querySelector(".hero-ctl");
  // Fotos reais primeiro; enquanto houver menos de 3, completam-se com as ilustrações (IA).
  const I = DADOS.ilustracoes || {}, ilu = !I.usar ? [] :
    (lista === DADOS.capa ? I.central : lista === DADOS.inscricao.capa ? I.inscricao : []) || [];
  const reais = lista.filter(s => s.foto);
  const itens = GUIA ? lista.slice() : (reais.length >= 3 ? reais : reais.concat(ilu.map(x => Object.assign({ia: true}, x))));
  if (!itens.length) { bg.classList.add("vazio"); return {refresh() {}}; }
  if (!itens.some(s => s.foto)) bg.classList.add("vazio");
  const slides = itens.map(() => { const d = document.createElement("div"); d.className = "sl"; bg.appendChild(d); return d; });
  let i = 0, timer = null, parado = reduzido() || poupar() || itens.length < 2;

  function montar(k) {
    const s = itens[k], d = slides[k];
    if (d.dataset.ok) return; d.dataset.ok = "1";
    if (s.foto) {
      const im = new Image();
      im.alt = ""; im.decoding = "async"; im.sizes = "100vw";
      if (k === 0) try { im.fetchPriority = "high"; } catch (e) {}
      im.srcset = srcset(s.foto); im.src = src(s.foto, 1600);
      im.style.objectPosition = s.foco || "50% 50%";
      im.onerror = () => { im.remove(); d.classList.add("falhou"); };
      d.appendChild(im);
    }   // sem foto (só no modo guia): fica o fundo de linhas de campo e a legenda diz que foto falta
  }
  function legenda() {
    if (!cap) return;
    const s = itens[i], lang = getLang(), quando = [s.ano, s.ed ? T(lang).ed(+s.ed) : ""].filter(Boolean).join(" · ");
    if (!s.foto) { cap.innerHTML = `<b>📷 ${esc(T(lang).vaga)} ${i + 1}/${itens.length}</b><span>${esc(txt(s, lang))} — ${esc(txt(s.vaga, lang))}</span>`; return; }
    if (s.ia) { cap.innerHTML = `<b>${esc(T(lang).ia)}</b><span>${esc(txt(s, lang))}</span>`; return; }
    cap.innerHTML = `${quando ? `<b>${esc(quando)}</b>` : ""}<span>${esc(txt(s, lang))}</span>`;
  }
  function controlos() {
    if (!ctl || itens.length < 2) return;
    const lang = getLang();
    ctl.innerHTML = `<span class="dots">${itens.map((s, k) => `<button type="button" aria-label="${esc(T(lang).foto(k + 1))}" aria-current="${k === i}"></button>`).join("")}</span>` +
      `<button type="button" class="pp" aria-label="${esc(parado ? T(lang).tocar : T(lang).pausa)}">${parado ? "▶" : "❚❚"}</button>`;
    ctl.querySelectorAll(".dots button").forEach((b, k) => b.onclick = () => { mostrar(k); reiniciar(); });
    ctl.querySelector(".pp").onclick = () => { parado = !parado; reiniciar(); controlos(); };
  }
  function mostrar(k) {
    i = (k + itens.length) % itens.length;
    montar(i);
    slides.forEach((d, j) => d.classList.toggle("on", j === i));
    if (!parado && itens.length > 1) montar((i + 1) % itens.length);   // pré-carrega só a seguinte
    legenda();
    if (ctl) ctl.querySelectorAll(".dots button").forEach((b, k) => b.setAttribute("aria-current", k === i));
  }
  function reiniciar() {
    clearInterval(timer);
    if (!parado && itens.length > 1) timer = setInterval(() => { if (!document.hidden) mostrar(i + 1); }, 7000);
  }
  mostrar(0); controlos(); reiniciar();
  return {refresh() { legenda(); controlos(); }};
}

/* ---------- textura de fundo (opcional) ---------- */
function textura() {
  document.body.classList.add("craques");
  if (DADOS.textura) document.body.style.setProperty("--textura", `url("${src(DADOS.textura, 800)}")`);
}

/* ---------- Inscrição: «Porquê jogar o CBIST» ---------- */
function faixa(lang, linkHistoria) {
  const t = T(lang);
  const tiles = DADOS.inscricao.faixa.map(f => {
    const tit = txt(f.titulo, lang), tx = txt(f.texto, lang);
    if (!f.foto && GUIA) return `<div class="tile vaga"><b>📷 ${esc(tit)}</b><span>${esc(txt(f.vaga, lang))}</span></div>`;
    const I = DADOS.ilustracoes || {}, ia = !f.foto && I.usar && I.faixa && I.faixa[f.id];
    const img = f.foto ? imgHTML(f.foto, f.foco, `${tit} — ${tx}`) : ia ? imgHTML(ia, "50% 35%", `${t.iaCurta}: ${tit}`) : "";
    return `<figure class="tile">${img}${ia ? `<span class="ia-tag">${esc(t.iaCurta)}</span>` : ""}<figcaption><b>${esc(tit)}</b><span>${esc(tx)}</span></figcaption></figure>`;
  }).join("");
  return `<div class="porque-top"><h2>${esc(t.porque)}</h2>${linkHistoria ? `<a class="hero-link" style="color:var(--accent-ink)" href="${esc(linkHistoria)}">${esc(t.verHist)}</a>` : ""}</div>
    ${numerosHTML(lang)}<div class="tiles">${tiles}</div>`;
}
function numerosHTML(lang) {
  return `<div class="nums">${DADOS.numeros.map(n => `<div><b>${esc(n.v)}</b><span>${esc(txt(n, lang))}</span></div>`).join("")}</div>`;
}

/* ---------- Central: separador «História» ---------- */
function vistaHistoria(lang, ctx) {
  ctx = ctx || {};
  const t = T(lang), out = [];
  if (GUIA) out.push(`<p class="guia-banner">${esc(t.guia)}</p>`);
  out.push(`<section class="hist-intro"><h2 class="sec">${esc(t.historia)}</h2><p>${esc(txt(DADOS.intro, lang))}</p>${numerosHTML(lang)}</section>`);

  const eds = DADOS.edicoes.filter(e => GUIA || e.ano || e.actual);
  out.push(`<section class="blk"><h2 class="sec">${esc(t.edAEd)}</h2><ol class="linha">${eds.map(e => edicaoHTML(e, lang, ctx)).join("")}</ol></section>`);

  const comCamp = DADOS.edicoes.filter(e => e.campeoes && Object.values(e.campeoes).some(Boolean));
  if (comCamp.length) {
    out.push(`<section class="blk"><h2 class="sec">${esc(t.honra)}</h2><div class="tblw"><table>
      <thead><tr><th class="l">${esc(t.categoria)}</th>${comCamp.map(e => `<th class="l">${esc(e.ano || t.ed(e.ed))}</th>`).join("")}</tr></thead>
      <tbody>${CATS.filter(([c]) => comCamp.some(e => e.campeoes[c])).map(([c, curto]) => `<tr><td class="l"><b>${curto}</b></td>${comCamp.map(e => `<td class="l">${esc(e.campeoes[c] || "—")}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div></section>`);
  }

  if (comCamp.length) {
    const conta = {};
    comCamp.forEach(e => CATS.forEach(([c]) => { const n = e.campeoes[c]; if (n) conta[n] = (conta[n] || 0) + 1; }));
    const lista = Object.entries(conta).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    out.push(`<section class="blk"><h2 class="sec">${esc(t.titulos)}</h2><div class="tblw"><table><tbody>${lista.map(([n, v], k) =>
      `<tr><td class="pos">${k + 1}</td><td class="l">${esc(n)}</td><td class="pts">${v} 🏆</td></tr>`).join("")}</tbody></table></div></section>`);
  }

  const lendas = DADOS.lendas.filter(l => l.nome);
  if (lendas.length || GUIA) {
    out.push(`<section class="blk"><h2 class="sec">${esc(t.lendas)}</h2><div class="galeria">${lendas.map(l => {
      const leg = [l.nome, l.clube].filter(Boolean).join(" · ");
      return `<figure>${l.foto ? imgHTML(l.foto, l.foco, leg, {zoom: true}) : ""}<figcaption><b>${esc(l.nome)}</b><br>${esc([txt(l.titulo, lang), l.clube].filter(Boolean).join(" · "))}</figcaption></figure>`;
    }).join("")}${GUIA && !lendas.length ? vagaHTML(t.lendas, t.vagaLenda) : ""}</div></section>`);
  }

  const gal = DADOS.galeria.filter(g => g.foto);
  if (gal.length || GUIA) {
    out.push(`<section class="blk"><h2 class="sec">${esc(t.galeria)}</h2><div class="galeria">${gal.map(g => {
      const leg = [g.ano, txt(g, lang)].filter(Boolean).join(" · ");
      return `<figure>${imgHTML(g.foto, g.foco, leg, {zoom: true})}${leg ? `<figcaption>${esc(leg)}</figcaption>` : ""}</figure>`;
    }).join("")}${GUIA && !gal.length ? vagaHTML(t.galeria, t.vagaGal) : ""}</div></section>`);
  }

  const msg = encodeURIComponent(t.ajudaMsg);
  out.push(`<section class="ajuda"><h3>${esc(t.ajudaT)}</h3><p>${esc(t.ajudaP)}</p>
    <p><a class="btnl" href="https://wa.me/${esc(DADOS.contactoFotos)}?text=${msg}" target="_blank" rel="noopener">${esc(t.ajudaB)}</a></p></section>`);
  return `<div class="hist">${out.join("")}</div>`;
}
function edicaoHTML(e, lang, ctx) {
  const t = T(lang), titulo = t.ed(e.ed);
  let ph;
  if (e.foto) ph = `<figure class="ph">${imgHTML(e.foto, e.foco, `${e.ano} · ${titulo}`, {zoom: true})}</figure>`;
  else if (GUIA) ph = `<figure class="ph" style="display:grid">${vagaHTML(titulo, t.vagaEd(e.ed))}</figure>`;
  else ph = `<figure class="ph" aria-hidden="true"><span class="num">${e.ed}<sup>${lang === "en" ? ord(e.ed, "en").replace(/^\d+/, "") : ".ª"}</sup></span></figure>`;
  const datas = lang === "en" ? String(e.datas || "").replace(/\b(Fev|Abr|Mai|Ago|Set|Out|Dez)\b/g, m => ({Fev: "Feb", Abr: "Apr", Mai: "May", Ago: "Aug", Set: "Sep", Out: "Oct", Dez: "Dec"})[m]) : e.datas;
  const onde = [datas && e.ano ? `${datas} ${e.ano}` : "", e.local, e.equipas ? t.eqN(e.equipas) : "", e.paises ? t.paN(e.paises) : ""].filter(Boolean).join(" · ");
  const camp = CATS.filter(([c]) => e.campeoes && e.campeoes[c]).map(([c, curto]) => `<li><b>${curto}</b>${esc(e.campeoes[c])}</li>`).join("");
  let acts = "";
  if (e.actual) {
    acts = `<div class="acts">${ctx.inscricaoAberta && ctx.linkInscricao ? `<a class="btnl" href="${esc(ctx.linkInscricao)}">${esc(t.inscrever)}</a>` : ""}` +
      `<a class="btnl ghost" href="#jogos" data-tab="jogos">${esc(t.aoVivo)}</a></div>`;
  }
  const texto = txt(e.texto, lang) || (e.actual ? (ctx.inscricaoAberta ? t.agoraP : t.agoraFim) : (!e.ano || (!camp && GUIA) ? t.porConf : ""));
  return `<li class="ed ${e.actual ? "agora" : ""}">${ph}<div class="bd">
    <div class="yr"><b>${esc(e.ano || "—")}</b><span>${esc(titulo)}${onde ? " · " + esc(onde) : ""}</span></div>
    ${texto ? `<p>${esc(texto)}</p>` : ""}
    ${camp ? `<ul class="camp">${camp}</ul>` : ""}
    ${e.mvp ? `<p class="note">${esc(t.mvp)}: ${esc(e.mvp)}</p>` : ""}
    ${acts}</div></li>`;
}

/* ---------- ampliar fotografias ---------- */
let dlg = null;
function ligarZoom(raiz, getLang) {
  raiz.addEventListener("click", ev => {
    const im = ev.target.closest && ev.target.closest("img[data-zoom]");
    if (!im) return;
    if (!dlg) {
      dlg = document.createElement("dialog"); dlg.className = "zoom";
      dlg.innerHTML = `<img alt=""><p></p><button type="button">✕</button>`;
      dlg.querySelector("button").onclick = () => dlg.close();
      dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
    }
    const lang = getLang ? getLang() : "pt";
    dlg.querySelector("button").setAttribute("aria-label", T(lang).fechar);
    const g = dlg.querySelector("img"); g.src = src(im.dataset.zoom, 1600); g.alt = im.dataset.legenda || "";
    dlg.querySelector("p").textContent = im.dataset.legenda || "";
    try { dlg.showModal(); } catch (e) { dlg.setAttribute("open", ""); }
  });
}

window.CBIST_HISTORIA = {dados: DADOS, guia: GUIA, capa, textura, faixa, vistaHistoria, ligarZoom, vagaHTML, esc};
})();
