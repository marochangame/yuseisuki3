(() => {
  "use strict";

  const TOTAL_QUESTIONS = 5;

  // 第2段階（好きTOP3）で集計しやすいように、各選択肢にIDとカテゴリーを持たせています。
  const pairs = [
    // くだもの・おやつ・ごはん
    {category:"くだもの", a:{id:"apple", name:"りんご", emoji:"🍎"}, b:{id:"banana", name:"バナナ", emoji:"🍌"}},
    {category:"くだもの", a:{id:"strawberry", name:"いちご", emoji:"🍓"}, b:{id:"orange", name:"みかん", emoji:"🍊"}},
    {category:"くだもの", a:{id:"grape", name:"ぶどう", emoji:"🍇"}, b:{id:"melon", name:"メロン", emoji:"🍈"}},
    {category:"くだもの", a:{id:"peach", name:"もも", emoji:"🍑"}, b:{id:"watermelon", name:"すいか", emoji:"🍉"}},
    {category:"くだもの", a:{id:"cherry", name:"さくらんぼ", emoji:"🍒"}, b:{id:"kiwi", name:"キウイ", emoji:"🥝"}},
    {category:"くだもの", a:{id:"pineapple", name:"パイナップル", emoji:"🍍"}, b:{id:"lemon", name:"レモン", emoji:"🍋"}},
    {category:"おやつ", a:{id:"icecream", name:"アイス", emoji:"🍦"}, b:{id:"donut", name:"ドーナツ", emoji:"🍩"}},
    {category:"おやつ", a:{id:"cake", name:"ケーキ", emoji:"🍰"}, b:{id:"pudding", name:"プリン", emoji:"🍮"}},
    {category:"おやつ", a:{id:"cookie", name:"クッキー", emoji:"🍪"}, b:{id:"chocolate", name:"チョコ", emoji:"🍫"}},
    {category:"おやつ", a:{id:"candy", name:"あめ", emoji:"🍬"}, b:{id:"lollipop", name:"ペロペロキャンディ", emoji:"🍭"}},
    {category:"ごはん", a:{id:"riceball", name:"おにぎり", emoji:"🍙"}, b:{id:"bread", name:"パン", emoji:"🍞"}},
    {category:"ごはん", a:{id:"curry", name:"カレー", emoji:"🍛"}, b:{id:"ramen", name:"ラーメン", emoji:"🍜"}},
    {category:"ごはん", a:{id:"pizza", name:"ピザ", emoji:"🍕"}, b:{id:"hamburger", name:"ハンバーガー", emoji:"🍔"}},
    {category:"ごはん", a:{id:"sushi", name:"おすし", emoji:"🍣"}, b:{id:"udon", name:"うどん", emoji:"🍲"}},
    {category:"ごはん", a:{id:"fries", name:"ポテト", emoji:"🍟"}, b:{id:"hotdog", name:"ホットドッグ", emoji:"🌭"}},
    {category:"やさい", a:{id:"corn", name:"とうもろこし", emoji:"🌽"}, b:{id:"sweetpotato", name:"さつまいも", emoji:"🍠"}},
    {category:"やさい", a:{id:"broccoli", name:"ブロッコリー", emoji:"🥦"}, b:{id:"carrot", name:"にんじん", emoji:"🥕"}},
    {category:"のみもの", a:{id:"milk", name:"ぎゅうにゅう", emoji:"🥛"}, b:{id:"juice", name:"ジュース", emoji:"🧃"}},

    // どうぶつ
    {category:"どうぶつ", a:{id:"dog", name:"いぬ", emoji:"🐶"}, b:{id:"cat", name:"ねこ", emoji:"🐱"}},
    {category:"どうぶつ", a:{id:"rabbit", name:"うさぎ", emoji:"🐰"}, b:{id:"panda", name:"ぱんだ", emoji:"🐼"}},
    {category:"どうぶつ", a:{id:"elephant", name:"ぞう", emoji:"🐘"}, b:{id:"giraffe", name:"きりん", emoji:"🦒"}},
    {category:"どうぶつ", a:{id:"penguin", name:"ぺんぎん", emoji:"🐧"}, b:{id:"dolphin", name:"いるか", emoji:"🐬"}},
    {category:"どうぶつ", a:{id:"lion", name:"ライオン", emoji:"🦁"}, b:{id:"tiger", name:"とら", emoji:"🐯"}},
    {category:"どうぶつ", a:{id:"monkey", name:"さる", emoji:"🐵"}, b:{id:"koala", name:"コアラ", emoji:"🐨"}},
    {category:"どうぶつ", a:{id:"frog", name:"かえる", emoji:"🐸"}, b:{id:"chick", name:"ひよこ", emoji:"🐥"}},
    {category:"どうぶつ", a:{id:"dinosaur", name:"きょうりゅう", emoji:"🦖"}, b:{id:"dragon", name:"ドラゴン", emoji:"🐉"}},
    {category:"どうぶつ", a:{id:"bear", name:"くま", emoji:"🐻"}, b:{id:"pig", name:"ぶた", emoji:"🐷"}},
    {category:"どうぶつ", a:{id:"cow", name:"うし", emoji:"🐮"}, b:{id:"horse", name:"うま", emoji:"🐴"}},
    {category:"どうぶつ", a:{id:"sheep", name:"ひつじ", emoji:"🐑"}, b:{id:"goat", name:"やぎ", emoji:"🐐"}},
    {category:"どうぶつ", a:{id:"owl", name:"ふくろう", emoji:"🦉"}, b:{id:"parrot", name:"オウム", emoji:"🦜"}},
    {category:"どうぶつ", a:{id:"fox", name:"きつね", emoji:"🦊"}, b:{id:"raccoon", name:"あらいぐま", emoji:"🦝"}},
    {category:"どうぶつ", a:{id:"hamster", name:"ハムスター", emoji:"🐹"}, b:{id:"mouse", name:"ねずみ", emoji:"🐭"}},
    {category:"うみのいきもの", a:{id:"octopus", name:"たこ", emoji:"🐙"}, b:{id:"crab", name:"かに", emoji:"🦀"}},
    {category:"うみのいきもの", a:{id:"shark", name:"さめ", emoji:"🦈"}, b:{id:"whale", name:"くじら", emoji:"🐳"}},
    {category:"うみのいきもの", a:{id:"turtle", name:"かめ", emoji:"🐢"}, b:{id:"fish", name:"さかな", emoji:"🐠"}},
    {category:"むし", a:{id:"butterfly", name:"ちょうちょ", emoji:"🦋"}, b:{id:"bee", name:"はち", emoji:"🐝"}},

    // のりもの
    {category:"のりもの", a:{id:"car", name:"くるま", emoji:"🚗"}, b:{id:"train", name:"でんしゃ", emoji:"🚃"}},
    {category:"のりもの", a:{id:"bus", name:"バス", emoji:"🚌"}, b:{id:"airplane", name:"ひこうき", emoji:"✈️"}},
    {category:"のりもの", a:{id:"rocket", name:"ロケット", emoji:"🚀"}, b:{id:"ship", name:"ふね", emoji:"⛵"}},
    {category:"のりもの", a:{id:"bike", name:"じてんしゃ", emoji:"🚲"}, b:{id:"motorcycle", name:"バイク", emoji:"🏍️"}},
    {category:"のりもの", a:{id:"firetruck", name:"しょうぼうしゃ", emoji:"🚒"}, b:{id:"ambulance", name:"きゅうきゅうしゃ", emoji:"🚑"}},
    {category:"のりもの", a:{id:"taxi", name:"タクシー", emoji:"🚕"}, b:{id:"truck", name:"トラック", emoji:"🚚"}},
    {category:"のりもの", a:{id:"policecar", name:"パトカー", emoji:"🚓"}, b:{id:"tractor", name:"トラクター", emoji:"🚜"}},
    {category:"のりもの", a:{id:"bullettrain", name:"しんかんせん", emoji:"🚅"}, b:{id:"helicopter", name:"ヘリコプター", emoji:"🚁"}},
    {category:"のりもの", a:{id:"subway", name:"ちかてつ", emoji:"🚇"}, b:{id:"tram", name:"ろめんでんしゃ", emoji:"🚋"}},
    {category:"のりもの", a:{id:"scooter", name:"キックボード", emoji:"🛴"}, b:{id:"skateboard", name:"スケボー", emoji:"🛹"}},

    // あそび・スポーツ・おんがく
    {category:"あそび", a:{id:"ball", name:"ボール", emoji:"⚽"}, b:{id:"balloon", name:"ふうせん", emoji:"🎈"}},
    {category:"あそび", a:{id:"drum", name:"たいこ", emoji:"🥁"}, b:{id:"trumpet", name:"ラッパ", emoji:"🎺"}},
    {category:"あそび", a:{id:"book", name:"えほん", emoji:"📖"}, b:{id:"blocks", name:"つみき", emoji:"🧱"}},
    {category:"あそび", a:{id:"paint", name:"おえかき", emoji:"🎨"}, b:{id:"puzzle", name:"パズル", emoji:"🧩"}},
    {category:"あそび", a:{id:"slide", name:"すべりだい", emoji:"🛝"}, b:{id:"swing", name:"ブランコ", icon:"swing.svg"}},
    {category:"スポーツ", a:{id:"soccer", name:"サッカー", emoji:"⚽"}, b:{id:"baseball", name:"やきゅう", icon:"baseball.svg"}},
    {category:"あそび", a:{id:"music", name:"おんがく", emoji:"🎵"}, b:{id:"movie", name:"えいが", emoji:"🎬"}},
    {category:"スポーツ", a:{id:"basketball", name:"バスケ", emoji:"🏀"}, b:{id:"tennis", name:"テニス", emoji:"🎾"}},
    {category:"おんがく", a:{id:"guitar", name:"ギター", emoji:"🎸"}, b:{id:"piano", name:"ピアノ", emoji:"🎹"}},
    {category:"おんがく", a:{id:"microphone", name:"うたう", emoji:"🎤"}, b:{id:"headphones", name:"きく", emoji:"🎧"}},
    {category:"あそび", a:{id:"camera", name:"しゃしん", emoji:"📷"}, b:{id:"game", name:"ゲーム", emoji:"🎮"}},
    {category:"あそび", a:{id:"kite", name:"たこあげ", emoji:"🪁"}, b:{id:"teddybear", name:"ぬいぐるみ", emoji:"🧸"}},
    {category:"スポーツ", a:{id:"bowling", name:"ボウリング", emoji:"🎳"}, b:{id:"darts", name:"ダーツ", emoji:"🎯"}},
    {category:"そとあそび", a:{id:"camping", name:"キャンプ", emoji:"🏕️"}, b:{id:"fishing", name:"つり", emoji:"🎣"}},

    // しぜん・きせつ
    {category:"しぜん", a:{id:"sun", name:"おひさま", emoji:"☀️"}, b:{id:"moon", name:"おつきさま", emoji:"🌙"}},
    {category:"しぜん", a:{id:"rainbow", name:"にじ", emoji:"🌈"}, b:{id:"star", name:"ほし", emoji:"⭐"}},
    {category:"しぜん", a:{id:"flower", name:"おはな", emoji:"🌷"}, b:{id:"tree", name:"き", emoji:"🌳"}},
    {category:"しぜん", a:{id:"snow", name:"ゆき", emoji:"❄️"}, b:{id:"rain", name:"あめ", emoji:"🌧️"}},
    {category:"しぜん", a:{id:"mountain", name:"やま", emoji:"⛰️"}, b:{id:"sea", name:"うみ", emoji:"🌊"}},
    {category:"きせつ", a:{id:"spring", name:"はる", emoji:"🌸"}, b:{id:"summer", name:"なつ", emoji:"🌻"}},
    {category:"きせつ", a:{id:"autumn", name:"あき", emoji:"🍁"}, b:{id:"winter", name:"ふゆ", emoji:"⛄"}},
    {category:"じかん", a:{id:"morning", name:"あさ", emoji:"🌅"}, b:{id:"night", name:"よる", emoji:"🌃"}},
    {category:"てんき", a:{id:"cloud", name:"くもり", emoji:"☁️"}, b:{id:"wind", name:"かぜ", emoji:"💨"}},

    // みにつける・ばしょ・せいかつ
    {category:"みにつける", a:{id:"shoes", name:"くつ", emoji:"👟"}, b:{id:"cap", name:"ぼうし", emoji:"🧢"}},
    {category:"みにつける", a:{id:"glasses", name:"めがね", emoji:"👓"}, b:{id:"watch", name:"とけい", emoji:"⌚"}},
    {category:"みにつける", a:{id:"shirt", name:"シャツ", emoji:"👕"}, b:{id:"pants", name:"ズボン", emoji:"👖"}},
    {category:"みにつける", a:{id:"dress", name:"ワンピース", emoji:"👗"}, b:{id:"coat", name:"うわぎ", emoji:"🧥"}},
    {category:"みにつける", a:{id:"socks", name:"くつした", emoji:"🧦"}, b:{id:"gloves", name:"てぶくろ", emoji:"🧤"}},
    {category:"もちもの", a:{id:"bag", name:"かばん", emoji:"🎒"}, b:{id:"umbrella", name:"かさ", emoji:"☂️"}},
    {category:"ばしょ", a:{id:"home", name:"おうち", emoji:"🏠"}, b:{id:"school", name:"がっこう", emoji:"🏫"}},
    {category:"ばしょ", a:{id:"shop", name:"おみせ", emoji:"🏪"}, b:{id:"restaurant", name:"レストラン", emoji:"🍽️"}},
    {category:"ばしょ", a:{id:"beach", name:"うみべ", emoji:"🏖️"}, b:{id:"park", name:"こうえん", emoji:"🌳"}},
    {category:"せいかつ", a:{id:"bath", name:"おふろ", emoji:"🛁"}, b:{id:"toothbrush", name:"はみがき", emoji:"🪥"}},

    // いろ・かたち
    {category:"いろ", a:{id:"red", name:"あか", emoji:"🔴"}, b:{id:"blue", name:"あお", emoji:"🔵"}},
    {category:"いろ", a:{id:"yellow", name:"きいろ", emoji:"🟡"}, b:{id:"green", name:"みどり", emoji:"🟢"}},
    {category:"いろ", a:{id:"black", name:"くろ", emoji:"⚫"}, b:{id:"white", name:"しろ", emoji:"⚪"}},
    {category:"いろ", a:{id:"purple", name:"むらさき", emoji:"🟣"}, b:{id:"brown", name:"ちゃいろ", emoji:"🟤"}},
    {category:"かたち", a:{id:"circle", name:"まる", emoji:"⭕"}, b:{id:"triangle", name:"さんかく", emoji:"🔺"}},
    {category:"かたち", a:{id:"square", name:"しかく", emoji:"🟦"}, b:{id:"diamond", name:"ひしがた", emoji:"🔶"}}
  ];
  const reactions = ["いいねぇー！", "それー！", "そっちすきー！", "やったぁ！", "うんうん！"];

  const guideCharacters = [
    {name:"うさぎ", src:"char_1.png"},
    {name:"いぬ", src:"char_2.png"},
    {name:"ねこ", src:"char_3.png"},
    {name:"くま", src:"char_4.png"},
    {name:"ぺんぎん", src:"char_5.png"},
    {name:"きょうりゅう", src:"char_6.png"},
    {name:"ひよこ", src:"char_7.png"},
    {name:"ハムスター", src:"char_8.png"}
  ];

  const $ = (id) => document.getElementById(id);
  const startScreen = $("startScreen");
  const gameScreen = $("gameScreen");
  const finishScreen = $("finishScreen");
  const startBtn = $("startBtn");
  const againBtn = $("againBtn");
  const leftChoice = $("leftChoice");
  const rightChoice = $("rightChoice");
  const leftEmoji = $("leftEmoji");
  const rightEmoji = $("rightEmoji");
  const leftLabel = $("leftLabel");
  const rightLabel = $("rightLabel");
  const questionText = $("questionText");
  const progressText = $("progressText");
  const reaction = $("reaction");
  const reactionText = $("reactionText");
  const burst = $("burst");
  const dinoWrap = $("dinoWrap");
  const soundBtn = $("soundBtn");
  const guideChar = $("guideChar");

  let gameQuestions = [];
  let currentQuestionIndex = 0;
  let currentPair = null;
  let currentChoices = [];
  let sessionChoices = [];
  let busy = false;
  let audioCtx = null;
  let jpVoice = null;
  let lastCharacterIndex = -1;

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function buildGameQuestions() {
    // 5問が同じジャンルに偏らないよう、できるだけ別カテゴリーから1問ずつ選びます。
    const byCategory = new Map();
    for (const pair of pairs) {
      if (!byCategory.has(pair.category)) byCategory.set(pair.category, []);
      byCategory.get(pair.category).push(pair);
    }

    const categories = shuffle([...byCategory.keys()]);
    gameQuestions = categories
      .slice(0, TOTAL_QUESTIONS)
      .map(category => {
        const candidates = byCategory.get(category);
        return candidates[Math.floor(Math.random() * candidates.length)];
      });

    // 念のためカテゴリー数が足りない場合だけ、残りを全問題から補います。
    if (gameQuestions.length < TOTAL_QUESTIONS) {
      const used = new Set(gameQuestions);
      const extras = shuffle(pairs.filter(pair => !used.has(pair)));
      gameQuestions.push(...extras.slice(0, TOTAL_QUESTIONS - gameQuestions.length));
    }

    currentQuestionIndex = 0;
    sessionChoices = [];
  }

  function setupVoice() {
    if (!("speechSynthesis" in window)) return;
    const voices = speechSynthesis.getVoices();
    jpVoice =
      voices.find(v => v.lang === "ja-JP" && /Kyoko|Otoya|Japanese|日本/i.test(v.name)) ||
      voices.find(v => v.lang === "ja-JP") ||
      voices.find(v => v.lang && v.lang.startsWith("ja")) ||
      null;
  }

  if ("speechSynthesis" in window) {
    setupVoice();
    speechSynthesis.onvoiceschanged = setupVoice;
  }

  function ensureAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    setupVoice();
  }

  function speak(text, options = {}) {
    ensureAudio();
    const {rate = 1.0, pitch = 1.18, volume = 1, onend = null, cancel = true} = options;

    if (!("speechSynthesis" in window)) {
      if (onend) setTimeout(onend, 700);
      return;
    }

    try {
      if (cancel) speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP";
      u.rate = rate;
      u.pitch = pitch;
      u.volume = volume;
      if (jpVoice) u.voice = jpVoice;

      let ended = false;
      u.onend = () => {
        if (ended) return;
        ended = true;
        if (onend) onend();
      };
      u.onerror = () => {
        if (ended) return;
        ended = true;
        if (onend) setTimeout(onend, 250);
      };

      speechSynthesis.speak(u);
      if (onend) {
        const fallbackMs = Math.max(900, text.length * 140);
        setTimeout(() => {
          if (ended) return;
          ended = true;
          onend();
        }, fallbackMs);
      }
    } catch (e) {
      if (onend) setTimeout(onend, 650);
    }
  }

  function beep(freq, duration, delay = 0, volume = 0.10, type = "triangle") {
    if (!audioCtx) return;
    const t = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.03);
  }


  function setChoiceVisual(el, choice) {
    el.innerHTML = "";

    if (choice.icon) {
      const img = document.createElement("img");
      img.src = choice.icon;
      img.alt = choice.name;
      img.className = "emoji-img";
      img.draggable = false;
      el.appendChild(img);
      return;
    }

    el.textContent = choice.emoji || choice.name;
  }

  function pickGuideCharacter() {
    let i = Math.floor(Math.random() * guideCharacters.length);
    if (guideCharacters.length > 1 && i === lastCharacterIndex) {
      i = (i + 1) % guideCharacters.length;
    }
    lastCharacterIndex = i;
    guideChar.src = guideCharacters[i].src;
    guideChar.alt = guideCharacters[i].name;
  }

  function renderQuestion() {
    currentPair = gameQuestions[currentQuestionIndex];
    currentChoices = Math.random() < 0.5
      ? [currentPair.a, currentPair.b]
      : [currentPair.b, currentPair.a];

    setChoiceVisual(leftEmoji, currentChoices[0]);
    setChoiceVisual(rightEmoji, currentChoices[1]);
    leftLabel.textContent = currentChoices[0].name;
    rightLabel.textContent = currentChoices[1].name;
    questionText.textContent = `${currentChoices[0].name} と ${currentChoices[1].name} どっちがすき？`;
    progressText.textContent = `${currentQuestionIndex + 1} / ${TOTAL_QUESTIONS}`;

    leftChoice.disabled = false;
    rightChoice.disabled = false;
    pickGuideCharacter();
  }

  function playQuestionSound() {
    if (!currentChoices.length) return;
    speak(`ユーセーくんは、${currentChoices[0].name}と${currentChoices[1].name}、どっちがすき？`, {
      rate: 0.98,
      pitch: 1.14,
      volume: 1,
      cancel: true
    });
  }

  function playChoiceSound(chosenName) {
    beep(880, .07, 0.00, .08);
    beep(1175, .09, 0.09, .075);
    beep(1568, .14, 0.21, .055);

    const line = reactions[Math.floor(Math.random() * reactions.length)];
    setTimeout(() => {
      speak(`${chosenName}、${line}`, {
        rate: 1.03,
        pitch: 1.18,
        volume: 1,
        cancel: true
      });
    }, 190);
    return line;
  }

  function makeBurst(extra = false) {
    burst.innerHTML = "";
    const colors = ["#ffd75a", "#ff9baa", "#7ee6ff", "#98ef8c", "#ffffff"];
    const count = extra ? 34 : 22;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      const angle = (Math.PI * 2 * i) / count;
      const dist = (extra ? 135 : 90) + Math.random() * (extra ? 230 : 170);
      s.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
      s.style.setProperty("--y", `${Math.sin(angle) * dist}px`);
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = `${Math.random() * 0.08}s`;
      burst.appendChild(s);
    }
  }

  function showFinish() {
    gameScreen.classList.add("hide");
    gameScreen.setAttribute("aria-hidden", "true");
    finishScreen.classList.remove("hide");
    finishScreen.setAttribute("aria-hidden", "false");

    makeBurst(true);
    reaction.classList.add("show", "finish-reaction");
    beep(784, .08, 0.00, .06);
    beep(988, .08, 0.12, .06);
    beep(1175, .10, 0.24, .06);
    beep(1568, .18, 0.38, .05);
    speak("やったー！5もん、ぜんぶできたね！", {
      rate: 0.97,
      pitch: 1.15,
      volume: 1,
      cancel: true
    });

    setTimeout(() => reaction.classList.remove("show", "finish-reaction"), 1300);
    busy = false;
  }

  function startGame({withIntro = true} = {}) {
    ensureAudio();
    buildGameQuestions();
    renderQuestion();

    finishScreen.classList.add("hide");
    finishScreen.setAttribute("aria-hidden", "true");
    gameScreen.classList.remove("hide");
    gameScreen.setAttribute("aria-hidden", "false");

    if (withIntro) {
      startScreen.classList.add("hide");
      speak("はじめるよー！", {
        rate: 0.95,
        pitch: 1.12,
        volume: 1,
        cancel: true
      });
      beep(784, .06, 0.04, .02);
      beep(1046, .08, 0.24, .018);
      setTimeout(playQuestionSound, 950);
    } else {
      setTimeout(playQuestionSound, 350);
    }
  }

  function handleChoice(side) {
    if (busy || !currentPair) return;
    ensureAudio();
    busy = true;

    leftChoice.disabled = true;
    rightChoice.disabled = true;

    const chosen = currentChoices[side];
    const button = side === 0 ? leftChoice : rightChoice;

    // 今回は保存しません。次段階でこの情報をlocalStorageへ保存すればTOP3にできます。
    sessionChoices.push({
      id: chosen.id,
      name: chosen.name,
      category: currentPair.category,
      chosenAt: Date.now()
    });

    button.classList.add("pressed");
    const line = playChoiceSound(chosen.name);
    reactionText.textContent = line.replace("ー！", "！");
    makeBurst();
    reaction.classList.add("show");
    dinoWrap.classList.add("celebrate");

    setTimeout(() => button.classList.remove("pressed"), 170);
    setTimeout(() => {
      reaction.classList.remove("show");
      dinoWrap.classList.remove("celebrate");
    }, 980);

    setTimeout(() => {
      if (currentQuestionIndex >= TOTAL_QUESTIONS - 1) {
        showFinish();
        return;
      }

      currentQuestionIndex += 1;
      renderQuestion();
      busy = false;
      setTimeout(playQuestionSound, 260);
    }, 1650);
  }

  startBtn.addEventListener("click", () => startGame({withIntro: true}));
  againBtn.addEventListener("click", () => startGame({withIntro: false}));
  leftChoice.addEventListener("click", () => handleChoice(0));
  rightChoice.addEventListener("click", () => handleChoice(1));
  soundBtn.addEventListener("click", () => {
    ensureAudio();
    playQuestionSound();
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
})();
