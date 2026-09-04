/**
 * Lightweight i18n for static subpages (tutorial, about).
 *
 * Reads the language preference from the same localStorage key used
 * by the main app. Elements with a data-i18n="key" attribute get
 * their textContent replaced. Elements with data-i18n-html="key"
 * get their innerHTML replaced (for links / emphasis).
 *
 * Usage:  <p data-i18n="tutorial.subtitle">fallback text</p>
 */

const STORAGE_KEY = 'forro-seq-lang';
const DEFAULT_LANG = 'pt';

const T = {
  // ── Tutorial page ──────────────────────────────────────────────
  pt: {
    // Nav
    'nav.sequencer': '← SEQUENCER',
    'nav.about': 'SOBRE',
    'nav.tutorial': 'TUTORIAL',

    // Tutorial
    'tutorial.title': 'Tutorial',
    'tutorial.subtitle': 'Aprenda a usar o Forró Sequencer em cinco passos. Sem teoria musical — é só clicar e tocar.',

    'tutorial.step1.title': 'Escolha um instrumento',
    'tutorial.step1.text': 'Escolha um dos três instrumentos tradicionais de percussão do forró:',
    'tutorial.step1.zabumba': 'Zabumba — o tambor grave que conduz o ritmo. Duas faixas: maceta (martelo, aberta/fechada) e bacalhau (vareta, normal/acento).',
    'tutorial.step1.pandeiro': 'Pandeiro — o tambor de mão. Uma faixa com cinco sons: silêncio, xi, tum (aberto), tũ (fechado) e tapa.',
    'tutorial.step1.triangle': 'Triângulo — dois sons: fechado (abafado) e aberto (ressonante).',
    'tutorial.step1.ensemble': 'Selecione TODOS para ouvir os três instrumentos tocando juntos.',

    'tutorial.step2.title': 'Escolha um ritmo',
    'tutorial.step2.text': 'Clique em um dos botões de ritmo para carregar um padrão tradicional na grade. O sequenciador já começa com o Baião carregado por padrão.',
    'tutorial.step2.rhythms': 'Ritmos disponíveis: Baião, Xote, Forró, Xaxado, Coco e Rastapé. Cada preset também ajusta o tempo para o BPM tradicional.',
    'tutorial.step2.tip': 'Todos os nomes de ritmos são em português — referem-se a estilos específicos de dança e música do nordeste do Brasil. Não são traduzidos.',

    'tutorial.step3.title': 'Aperte Tocar',
    'tutorial.step3.text': 'Aperte o botão TOCAR para iniciar o ritmo. Você verá o indicador de passo se movendo pela grade e ouvirá o padrão.',
    'tutorial.step3.stop': 'PARAR — para a reprodução',
    'tutorial.step3.clear': 'LIMPAR — apaga o padrão atual',
    'tutorial.step3.tap': 'MARCAR TEMPO — toque o botão repetidamente para definir o BPM por sensação',
    'tutorial.step3.slider': 'Você também pode ajustar o BPM com precisão usando o controle deslizante ou os botões +/−.',

    'tutorial.step4.title': 'Edite o padrão',
    'tutorial.step4.text': 'Clique em qualquer célula da grade para alternar entre os sons disponíveis. Cada clique avança para o próximo estado:',
    'tutorial.step4.maceta': 'Zabumba maceta: silêncio → aberta → fechada → silêncio',
    'tutorial.step4.bacalhau': 'Zabumba bacalhau: silêncio → normal → acento → silêncio',
    'tutorial.step4.pandeiro': 'Pandeiro: silêncio → xi → tum → tũ → tapa → silêncio',
    'tutorial.step4.triangle': 'Triângulo: silêncio → fechado → aberto → silêncio',
    'tutorial.step4.legend': 'A legenda abaixo da grade mostra o código de cores de cada som.',
    'tutorial.step4.tip': 'Ao editar uma célula, o ritmo ativo é desmarcado — seu padrão agora é personalizado. Carregue um preset novamente para resetar.',

    'tutorial.step5.title': 'Adicione compassos e mude a resolução',
    'tutorial.step5.text': 'Use + COMPASSO para adicionar compassos e criar padrões mais longos. Remova com − COMPASSO.',
    'tutorial.step5.resolution': 'Alterne a resolução da grade:',
    'tutorial.step5.binary': '4+4 — 8 passos por compasso (colcheias). O padrão, bom para a maioria dos ritmos.',
    'tutorial.step5.triplet': '12+12 — 24 passos por compasso (subdivisão ternária). Maior resolução para padrões avançados e swing.',

    // Rhythms section
    'tutorial.rhythms.title': 'Os ritmos do forró',
    'tutorial.rhythm.baiao': 'O ritmo fundamental do forró, criado por Luiz Gonzaga e Humberto Teixeira nos anos 1940. Um groove de tempo médio com um padrão característico de zabumba: maceta aberta no tempo 1, maceta fechada no "e" do 2.',
    'tutorial.rhythm.xote': 'O ritmo mais lento do forró, derivado do schottische europeu. Um balanço relaxado, perfeito para a dança a dois. A zabumba toca um padrão mais simples e espaçado.',
    'tutorial.rhythm.forro': 'O ritmo que dá nome ao gênero. Mais rápido que o baião, com um bacalhau mais ocupado. A zabumba conduz com mais força, com o bacalhau preenchendo os espaços entre as batidas da maceta.',
    'tutorial.rhythm.xaxado': 'Originalmente uma dança de guerra dos cangaceiros do nordeste do Brasil. Caráter forte e marcial, com batidas duplas de maceta e pulso firme.',
    'tutorial.rhythm.coco': 'Um ritmo de roda do litoral do nordeste brasileiro. Animado e energético, com o acento da zabumba no tempo 3 dando um balanço característico.',
    'tutorial.rhythm.rastape': 'O estilo mais rápido do forró — alta energia e emocionante. Padrões densos de bacalhau e um ritmo frenético que leva os dançarinos ao limite.',

    // Tips section
    'tutorial.tips.title': 'Dicas',
    'tutorial.tips.quickstart.title': 'Receita rápida',
    'tutorial.tips.quickstart.text': 'Selecione TODOS → escolha BAIÃO → aperte TOCAR. Você ouvirá o trio completo instantaneamente. Depois, troque para instrumentos individuais para ajustar os padrões.',
    'tutorial.tips.lang.title': 'Idioma e tema',
    'tutorial.tips.lang.text': 'O sequenciador está disponível em português e inglês. Clique em PT ou EN para trocar. Use o botão ESCURO / CLARO para alternar o esquema de cores. Ambas preferências são salvas.',

    // Footer
    'footer.text': 'forró sequencer',
    'footer.back': 'voltar ao sequenciador',

    // Theme
    'theme.dark': 'ESCURO',
    'theme.light': 'CLARO',

    // ── About page ─────────────────────────────────────────────────
    'about.title': 'Sobre',
    'about.subtitle': 'Um sequenciador de percussão para ritmos de forró — feito para músicos, estudantes e qualquer pessoa curiosa sobre a música do nordeste do Brasil.',

    'about.me.title': 'Sobre mim',
    'about.me.p1': 'Sou <strong>Yerko Escalona</strong>, originalmente do Chile, atualmente morando em <strong>Viena, Áustria</strong>. Entrei no forró pela dança há cerca de quatro anos e rapidamente me apaixonei pela música. Esse amor me levou a pegar a zabumba, e hoje toco na <strong>Beira Mar</strong> (<a href="https://instagram.com/beira.mar.forro" target="_blank" rel="noopener">@beira.mar.forro</a>), uma banda de forró aqui em Viena.',
    'about.me.p2': 'Construí este sequenciador porque queria uma ferramenta para estudar e visualizar os padrões de percussão que movem o forró — algo que eu pudesse usar para praticar, ensinar e compartilhar ritmos com outros músicos e dançarinos. Como desenvolvedor de software, construir eu mesmo pareceu a coisa natural a fazer.',
    'about.me.p3': 'Você pode me encontrar no Instagram em <a href="https://instagram.com/yerkoescalona" target="_blank" rel="noopener">@yerkoescalona</a>.',

    'about.forro.title': 'O que é forró?',
    'about.forro.p1': '<strong>Forró</strong> é uma família de gêneros musicais e danças de casal do nordeste do Brasil — particularmente dos estados de Pernambuco, Ceará, Paraíba e Rio Grande do Norte. A palavra pode se referir tanto à música quanto ao evento social de dança.',
    'about.forro.p2': 'No seu cerne, o forró é movido por um trio de instrumentos de percussão: a <strong>zabumba</strong> (tambor grave), o <strong>pandeiro</strong> e o <strong>triângulo</strong>. Juntos, eles criam os grooves contagiantes que definem estilos como baião, xote, forró, xaxado, coco e rastapé.',
    'about.forro.p3': 'O gênero foi popularizado por <strong>Luiz Gonzaga</strong> (1912–1989), o "Rei do Baião", que levou os sons do sertão para todo o Brasil. Hoje, o forró é dançado e tocado ao redor do mundo — de São Paulo a Berlim, de Paris a Viena.',

    'about.instruments.title': 'Os instrumentos',
    'about.inst.zabumba': 'Um grande tambor de duas peles tocado com um martelo (<em>maceta</em>) de um lado e uma vareta fina (<em>bacalhau</em>) do outro. A maceta fornece as batidas graves (abertas ou abafadas), enquanto o bacalhau adiciona articulação rítmica e acentos. A zabumba é o coração do trio.',
    'about.inst.pandeiro': 'Um tambor de moldura com platinelas, semelhante a um tamborim, mas tocado com técnica sofisticada. O pandeirista produz múltiplos sons distintos: <em>tum</em> (grave aberto), <em>tũ</em> (grave abafado), <em>tapa</em> (tapa seco) e <em>xi</em> (toque de ponta de dedo nas platinelas). Esses se combinam em padrões intricados e fluidos.',
    'about.inst.triangle': 'O triângulo no forró não é o simples marcador de tempo da música orquestral — ele toca um padrão sincopado e pulsante que se encaixa com a zabumba. Os dois sons principais são <em>fechado</em> (abafado pela mão) e <em>aberto</em> (livre para ressoar). O clássico padrão <em>c-c-o-c</em> é a espinha dorsal de quase todo ritmo de forró.',

    'about.sequencer.title': 'O que este sequenciador faz',
    'about.sequencer.text': 'O Forró Sequencer permite <strong>criar, ouvir e ajustar</strong> padrões tradicionais de percussão de forró passo a passo. Foi pensado para:',
    'about.sequencer.musicians': '<strong>Músicos de forró</strong> — praticar ritmos, experimentar variações, entender como os três instrumentos se encaixam.',
    'about.sequencer.dancers': '<strong>Estudantes de dança</strong> — ouvir instrumentos isolados para entender a estrutura musical que você dança.',
    'about.sequencer.teachers': '<strong>Professores de música</strong> — demonstrar padrões rítmicos visual e auditivamente em aula.',
    'about.sequencer.curious': '<strong>Pessoas curiosas</strong> — explorar a percussão do nordeste brasileiro de forma interativa.',
    'about.sequencer.highlight': 'Todos os sons são sintetizados em tempo real usando a <strong>Web Audio API</strong> — sem samples para carregar, sem downloads. O sequenciador funciona inteiramente no seu navegador.',

    'about.tech.title': 'Construído com',
    'about.tech.js': '<strong>JavaScript puro</strong> — ES modules, sem frameworks',
    'about.tech.audio': '<strong>Web Audio API</strong> — agendamento preciso e síntese em tempo real',
    'about.tech.vite': '<strong>Vite</strong> — servidor de desenvolvimento e builds de produção',
    'about.tech.vitest': '<strong>Vitest</strong> — testes unitários',
    'about.tech.ghpages': '<strong>GitHub Pages</strong> — hospedagem',

    'about.roadmap.title': 'Próximos passos',
    'about.roadmap.swing': 'Parâmetro de swing para arrasta-pé',
    'about.roadmap.save': 'Salvar/carregar padrões no localStorage',
    'about.roadmap.share': 'Exportar padrão como URL compartilhável',
    'about.roadmap.samples': 'Substituir sons sintetizados por gravações reais de zabumba',
    'about.roadmap.pwa': 'Suporte a PWA para instalar na tela inicial',

    'about.opensource.title': 'Código aberto',
    'about.opensource.license': 'Este projeto é código aberto sob a licença <strong>GPL-3.0</strong>. Contribuições e feedback são bem-vindos.',
    'about.opensource.source': 'Código fonte: <a href="https://github.com/yescalona/forro-sequencer" target="_blank" rel="noopener">github.com/yescalona/forro-sequencer</a>',
  },

  en: {
    'nav.sequencer': '← SEQUENCER',
    'nav.about': 'ABOUT',
    'nav.tutorial': 'TUTORIAL',

    'tutorial.title': 'Tutorial',
    'tutorial.subtitle': 'Learn how to use the Forró Sequencer in five steps. No music theory required — just click and play.',

    'tutorial.step1.title': 'Pick an instrument',
    'tutorial.step1.text': 'Choose one of the three traditional forró percussion instruments:',
    'tutorial.step1.zabumba': 'Zabumba — the bass drum that drives the rhythm. Two tracks: maceta (mallet, open/closed) and bacalhau (stick, normal/accent).',
    'tutorial.step1.pandeiro': 'Pandeiro — the frame drum. One track with five sounds: off, xi, tum (open), tũ (closed), and tapa (slap).',
    'tutorial.step1.triangle': 'Triângulo — the triangle. Two sounds: closed (muted) and open (ringing).',
    'tutorial.step1.ensemble': 'Select TODOS / ENSEMBLE to hear all three instruments playing together.',

    'tutorial.step2.title': 'Choose a rhythm',
    'tutorial.step2.text': 'Click one of the preset buttons to load a traditional pattern into the grid. The sequencer starts with Baião loaded by default.',
    'tutorial.step2.rhythms': 'Available rhythms: Baião, Xote, Forró, Xaxado, Coco, and Rastapé. Each preset also sets the tempo to its traditional BPM.',
    'tutorial.step2.tip': 'All rhythm names are Portuguese — they refer to specific dance and music styles from northeastern Brazil. They are not translated.',

    'tutorial.step3.title': 'Press Play',
    'tutorial.step3.text': 'Hit the TOCAR / PLAY button to start the rhythm. You\'ll see the step indicator moving across the grid and hear the pattern.',
    'tutorial.step3.stop': 'PARAR / STOP — stops playback',
    'tutorial.step3.clear': 'LIMPAR / CLEAR — erases the current pattern',
    'tutorial.step3.tap': 'TAP TEMPO — tap the button repeatedly to set the BPM by feel',
    'tutorial.step3.slider': 'You can also adjust BPM precisely with the slider or the +/− buttons.',

    'tutorial.step4.title': 'Edit the pattern',
    'tutorial.step4.text': 'Click any cell in the grid to cycle through the available sounds for that track. Each click advances to the next state:',
    'tutorial.step4.maceta': 'Zabumba maceta: off → open → closed → off',
    'tutorial.step4.bacalhau': 'Zabumba bacalhau: off → normal → accent → off',
    'tutorial.step4.pandeiro': 'Pandeiro: off → xi → tum → tũ → tapa → off',
    'tutorial.step4.triangle': 'Triângulo: off → closed → open → off',
    'tutorial.step4.legend': 'The legend below the grid shows the color coding for each sound.',
    'tutorial.step4.tip': 'Editing a cell clears the active preset highlight — your pattern is now custom. Load a preset again to reset.',

    'tutorial.step5.title': 'Add bars & change resolution',
    'tutorial.step5.text': 'Use + COMPASSO / + BAR to add bars for longer patterns. Remove with − COMPASSO / − BAR.',
    'tutorial.step5.resolution': 'Toggle grid resolution:',
    'tutorial.step5.binary': '4+4 — 8 steps per bar (eighth notes). The default, good for most patterns.',
    'tutorial.step5.triplet': '12+12 — 24 steps per bar (triplet subdivisions). Higher resolution for advanced patterns and swing feels.',

    'tutorial.rhythms.title': 'The rhythms of forró',
    'tutorial.rhythm.baiao': 'The foundational rhythm of forró, created by Luiz Gonzaga and Humberto Teixeira in the 1940s. A medium-tempo groove with a characteristic zabumba pattern: open mallet on beat 1, closed mallet pickup on the "&" of 2.',
    'tutorial.rhythm.xote': 'The slowest forró rhythm, derived from the European schottische. A relaxed, swaying feel perfect for close-partner dancing. The zabumba plays a simpler, more spaced-out pattern.',
    'tutorial.rhythm.forro': 'The genre\'s namesake rhythm. Faster than baião with a busier bacalhau pattern. The zabumba drives harder, with the bacalhau filling in the gaps between mallet strokes.',
    'tutorial.rhythm.xaxado': 'Originally a war dance of the cangaceiros (bandits) of northeastern Brazil. Strong, martial character with double mallet hits and a driving pulse.',
    'tutorial.rhythm.coco': 'A circle-dance rhythm from the coast of northeastern Brazil. Upbeat and energetic, with the zabumba accent on beat 3 giving it a distinctive bounce.',
    'tutorial.rhythm.rastape': 'The fastest forró style — high-energy and exhilarating. Dense bacalhau patterns and a frenetic pace that pushes dancers to their limits.',

    'tutorial.tips.title': 'Tips',
    'tutorial.tips.quickstart.title': 'Quick-start recipe',
    'tutorial.tips.quickstart.text': 'Select ENSEMBLE → pick BAIÃO → press PLAY. You\'ll hear the full trio instantly. Then switch to individual instruments to tweak the patterns.',
    'tutorial.tips.lang.title': 'Language & theme',
    'tutorial.tips.lang.text': 'The sequencer is available in Portuguese and English. Click PT or EN to switch. Use the DARK / LIGHT button to toggle the color scheme. Both preferences are saved.',

    'footer.text': 'forró sequencer',
    'footer.back': 'back to sequencer',

    'theme.dark': 'DARK',
    'theme.light': 'LIGHT',

    'about.title': 'About',
    'about.subtitle': 'A drum sequencer for forró rhythms — built for musicians, students, and anyone curious about the music of northeastern Brazil.',

    'about.me.title': 'About me',
    'about.me.p1': 'I\'m <strong>Yerko Escalona</strong>, originally from Chile, currently based in <strong>Vienna, Austria</strong>. I got into forró through dancing about four years ago and quickly fell in love with the music. That love led me to pick up the zabumba, and today I play it in <strong>Beira Mar</strong> (<a href="https://instagram.com/beira.mar.forro" target="_blank" rel="noopener">@beira.mar.forro</a>), a forró band here in Vienna.',
    'about.me.p2': 'I built this sequencer because I wanted a tool to study and visualize the percussion patterns that drive forró — something I could use to practice, teach, and share rhythms with other musicians and dancers. As a software developer, building it myself felt like the natural thing to do.',
    'about.me.p3': 'You can find me on Instagram at <a href="https://instagram.com/yerkoescalona" target="_blank" rel="noopener">@yerkoescalona</a>.',

    'about.forro.title': 'What is forró?',
    'about.forro.p1': '<strong>Forró</strong> is a family of music genres and partner dances from the northeast of Brazil — particularly the states of Pernambuco, Ceará, Paraíba, and Rio Grande do Norte. The word can refer to both the music and the social dance event itself.',
    'about.forro.p2': 'At its core, forró is powered by a trio of percussion instruments: the <strong>zabumba</strong> (bass drum), the <strong>pandeiro</strong> (frame drum), and the <strong>triângulo</strong> (triangle). Together they create the infectious grooves that define styles like baião, xote, forró, xaxado, coco, and rastapé.',
    'about.forro.p3': 'The genre was popularized by <strong>Luiz Gonzaga</strong> (1912–1989), the "King of Baião," who brought the sounds of the sertão to all of Brazil. Today, forró is danced and played around the world — from São Paulo to Berlin, Paris to Vienna.',

    'about.instruments.title': 'The instruments',
    'about.inst.zabumba': 'A large double-headed bass drum played with a mallet (<em>maceta</em>) on one side and a thin stick (<em>bacalhau</em>, literally "codfish") on the other. The maceta provides the deep bass hits (open or muted), while the bacalhau adds rhythmic articulation and accents. The zabumba is the heartbeat of the trio.',
    'about.inst.pandeiro': 'A frame drum with jingles, similar to a tambourine but played with sophisticated technique. The pandeiro player produces multiple distinct sounds: <em>tum</em> (open bass), <em>tũ</em> (muted bass), <em>tapa</em> (sharp slap), and <em>xi</em> (fingertip brush on the jingles). These combine into intricate, flowing patterns.',
    'about.inst.triangle': 'The triangle in forró is not the simple timekeeper of orchestral music — it plays a driving, syncopated pattern that locks in with the zabumba. The two main sounds are <em>closed</em> (muted by the hand gripping the triangle) and <em>open</em> (allowed to ring freely). The classic <em>c-c-o-c</em> pattern is the backbone of almost every forró rhythm.',

    'about.sequencer.title': 'What this sequencer does',
    'about.sequencer.text': 'The Forró Sequencer lets you <strong>build, hear, and tweak</strong> traditional forró percussion patterns step by step. It is designed for:',
    'about.sequencer.musicians': '<strong>Forró musicians</strong> — practice rhythms, experiment with variations, understand how the three instruments fit together.',
    'about.sequencer.dancers': '<strong>Dance students</strong> — hear isolated instruments to understand the musical structure you\'re dancing to.',
    'about.sequencer.teachers': '<strong>Music teachers</strong> — demonstrate rhythm patterns visually and audibly in class.',
    'about.sequencer.curious': '<strong>Curious people</strong> — explore the percussion of northeastern Brazil interactively.',
    'about.sequencer.highlight': 'All sounds are synthesized in real-time using the <strong>Web Audio API</strong> — no samples to load, no downloads. The sequencer works entirely in your browser.',

    'about.tech.title': 'Built with',
    'about.tech.js': '<strong>Vanilla JavaScript</strong> — ES modules, no frameworks',
    'about.tech.audio': '<strong>Web Audio API</strong> — sample-accurate scheduling and real-time synthesis',
    'about.tech.vite': '<strong>Vite</strong> — development server and production builds',
    'about.tech.vitest': '<strong>Vitest</strong> — unit testing',
    'about.tech.ghpages': '<strong>GitHub Pages</strong> — hosting',

    'about.roadmap.title': 'Roadmap',
    'about.roadmap.swing': 'Swing parameter for arrasta-pé feel',
    'about.roadmap.save': 'Save/load patterns to localStorage',
    'about.roadmap.share': 'Export pattern as shareable URL',
    'about.roadmap.samples': 'Replace synth sounds with real zabumba recordings',
    'about.roadmap.pwa': 'PWA support for install-to-homescreen',

    'about.opensource.title': 'Open source',
    'about.opensource.license': 'This project is open source under the <strong>GPL-3.0</strong> license. Contributions and feedback are welcome.',
    'about.opensource.source': 'Source code: <a href="https://github.com/yescalona/forro-sequencer" target="_blank" rel="noopener">github.com/yescalona/forro-sequencer</a>',
  },
};

function applyLang(lang) {
  const dict = T[lang] || T[DEFAULT_LANG];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] != null) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (dict[key] != null) el.innerHTML = dict[key];
  });

  // Update lang selector active state
  document.querySelectorAll('.lang-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Update theme button text
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    themeBtn.textContent = isLight ? (dict['theme.light'] || 'LIGHT') : (dict['theme.dark'] || 'DARK');
  }

  document.documentElement.lang = lang === 'pt' ? 'pt' : 'en';
  localStorage.setItem(STORAGE_KEY, lang);
}

export function initSubpageI18n() {
  const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  // Build language selector
  const container = document.getElementById('langSelector');
  if (container) {
    ['pt', 'en'].forEach((lang) => {
      const btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.dataset.lang = lang;
      btn.textContent = lang.toUpperCase();
      btn.addEventListener('click', () => applyLang(lang));
      container.appendChild(btn);
    });
  }

  applyLang(saved);
}
