/* ==========================================================================
   새한신용정보 일산지사 — 사이트 공용 데이터 레이어 (localStorage 기반)
   관리자 페이지(admin/index.html)에서 저장한 내용을 각 페이지에 반영합니다.
   ※ 백엔드 서버가 없는 정적 사이트이므로 데이터는 "이 브라우저"에만 저장됩니다.
   ========================================================================== */
(function (global) {
  var STORAGE_KEY = 'shsAdminData_v1';
  var AUTH_KEY = 'shsAdminAuthed_v1';

  var DEFAULTS = {
    settings: {
      password: '1234'
    },
    contact: {
      mainPhone: '1800-5549',
      directPhone: '010-8266-5779',
      csPhone: '031-994-7299',
      fax: '031-994-7470',
      docFax: '0504-081-5779',
      email: 'jeps@naver.com',
      address: '경기도 고양시 일산동구 장백로 204, 203호 (장항동, 보림빌딩)',
      addressShort: '경기도 고양시 일산동구 장백로 204, 203호 (보림빌딩)',
      hoursCompact: '09:00–18:00',
      hoursSpaced: '09:00 – 18:00'
    },
    popup: {
      enabled: true,
      text: '내 사업은 항상<br>그린라이트 일까요?<br>신호가 바뀌는 것은<br>한순간 입니다.<br>매출채권이 있다면<br>미리 미리 대비하세요.',
      bannerText: '매출채권 관리<br>지금 시작하세요<br>📞 1800-5549',
      ctaText: '📞 1800-5549 무료 상담'
    },
    images: {},
    notices: [
      { id: 'n1', tag: 'law', title: '채권추심대행용역 수수료의 부가가치세 면제 적용 종료 안내', date: '2025.06.01', body: '2024년부터 채권추심 수수료에 대한 부가가치세 면제 특례가 종료되었습니다. 이에 따라 추심 수수료에 부가가치세(10%)가 부과됩니다. 계약 체결 전 담당자에게 문의하시면 정확한 수수료 내역을 안내드립니다.' },
      { id: 'n2', tag: 'biz', title: '채권 소멸시효 — 반드시 확인해야 할 기간 안내', date: '2025.05.20', body: '채권은 종류에 따라 소멸시효가 다릅니다. ▶ 상업 채권(물품대금 등): 5년 ▶ 일반 민사 채권(차용금 등): 10년 ▶ 판결로 확정된 채권: 10년 ▶ 임금채권: 3년. 소멸시효가 완성되면 법적 청구가 불가능해지므로 반드시 사전에 상담 받으시기 바랍니다.' },
      { id: 'n3', tag: 'service', title: '비대면 채팅상담 서비스 운영 시작 안내', date: '2025.05.10', body: '전화 통화가 어려우신 고객님을 위해 비대면 채팅상담 서비스를 시작합니다. 홈페이지 채팅 기능 또는 채팅상담 페이지를 통해 언제든지 문의하세요. 평일 09:00~18:00 내 담당자가 신속히 답변드립니다.' },
      { id: 'n4', tag: 'law', title: '개인정보 보호법 개정에 따른 채권 처리 절차 변경', date: '2025.04.28', body: '2024년 개인정보보호법 개정에 따라 채무자 개인정보 수집 및 활용 절차가 일부 변경되었습니다. 위임 계약 시 개인정보 처리 동의서 작성이 강화됩니다. 기존 계약 고객님께서도 갱신 시 새로운 양식으로 재작성이 필요합니다.' },
      { id: 'n5', tag: 'biz', title: '추심 금지 행위 — 채무자 보호 규정 안내', date: '2025.03.15', body: '새한신용정보는 채권추심법상 금지 행위를 엄격히 준수합니다. ▶ 야간(오후 9시~오전 8시) 연락 금지 ▶ 반복적·위협적 언행 금지 ▶ 채무자 외 제3자에게 채무 사실 고지 금지 ▶ 폭언·협박 금지. 불법 추심 피해 시 금융감독원(1332)에 신고하실 수 있습니다.' },
      { id: 'n6', tag: 'notice', title: '2025년 설 연휴 업무 중단 안내 (1/28~1/30)', date: '2025.01.20', body: '2025년 설 연휴(1월 28일~30일) 동안 업무가 중단됩니다. 긴급 문의는 담당자 정해봉 직통(010-8266-5779)으로 연락 주시기 바랍니다. 1월 31일(금)부터 정상 운영합니다.' },
      { id: 'n7', tag: 'law', title: '신용정보법 시행령 개정 — 추심 위임 계약 의무 기재 사항 변경', date: '2024.11.05', body: '신용정보의 이용 및 보호에 관한 법률 시행령 개정으로 추심 위임 계약서의 의무 기재 사항이 추가되었습니다. 수수료 산정 기준, 추심 방법, 개인정보 처리 방침 등이 포함됩니다. 신규 계약 체결 시 새로운 계약서 양식이 사용됩니다.' },
      { id: 'n8', tag: 'service', title: '수신자 부담 전화 1800-5549 서비스 안내', date: '2024.09.01', body: '고객님의 편의를 위해 수신자 부담 전화 1800-5549를 운영합니다. 전화 요금은 새한신용정보에서 부담하므로 고객님께는 통화료가 청구되지 않습니다. 평일 09:00~18:00 운영.' }
    ],
    faqs: [
      { id: 'f1', cat: '상담 · 비용', q: '상담은 정말 무료인가요?', a: '네, 상담은 완전 무료입니다. 전화(1800-5549)는 수신자 부담이라 통화료도 없습니다. 위임 계약 체결 전까지 어떠한 비용도 발생하지 않습니다.', home: false },
      { id: 'f2', cat: '상담 · 비용', q: '수수료는 얼마인가요?', a: '성공보수 방식으로 채권 회수에 성공했을 때만 수수료가 발생합니다. 수수료 비율은 채권의 종류, 금액, 난이도 등에 따라 다르므로 상담 시 개별 안내해 드립니다. 회수에 실패하면 수수료는 없습니다. (단, 2024년부터 수수료에 부가가치세 10% 부과)', home: true },
      { id: 'f3', cat: '상담 · 비용', q: '소액도 추심이 가능한가요?', a: '네, 금액에 관계없이 상담 가능합니다. 소액이라도 시간이 지날수록 소멸시효 등으로 회수가 어려워지므로 빠른 상담을 권장합니다. 다만 매우 소액의 경우 수수료 대비 회수 효율을 고려해 솔직하게 안내드립니다.', home: true },
      { id: 'f4', cat: '추심 대상 · 범위', q: '어떤 종류의 채권을 추심할 수 있나요?', a: '물품대금·용역대금 등 기업 간 매출채권, 개인 간 차용금, 임대차 보증금·월세, 공사대금, 판결·공증 채권 등 다양한 채권을 취급합니다. 어떤 채권이든 일단 상담 주시면 가능 여부를 검토합니다.', home: false },
      { id: 'f5', cat: '추심 대상 · 범위', q: '일산 외 지역 채무자도 추심 가능한가요?', a: '전국 어디든 가능합니다. 새한신용정보 전국 지사 네트워크를 통해 채무자 위치에 관계없이 처리할 수 있습니다. 해외 거주자의 경우 별도 상담이 필요합니다.', home: true },
      { id: 'f6', cat: '추심 대상 · 범위', q: '법인(회사)에 대한 채권도 추심되나요?', a: '네, 개인 채무자뿐 아니라 법인 채무자에 대한 채권도 추심합니다. 법인의 경우 재산 조사 범위가 다소 다르지만, 동일하게 합법적인 방법으로 진행합니다.', home: false },
      { id: 'f7', cat: '절차 · 기간', q: '추심까지 얼마나 걸리나요?', a: '채권의 성격과 채무자 상황에 따라 다릅니다. 채무자가 자발적으로 변제하면 수일~수주 내 해결되기도 하고, 법적 절차가 필요한 경우 수개월이 소요될 수 있습니다. 상담 시 예상 기간을 안내드립니다.', home: false },
      { id: 'f8', cat: '절차 · 기간', q: '채권자(의뢰인)가 해야 할 일이 있나요?', a: '위임 계약 체결 시 필요 서류를 제출하고, 이후 추심 진행 상황은 담당자가 주기적으로 보고드립니다. 추가 정보가 필요한 경우 협조 요청을 드릴 수 있습니다. 일반적으로 의뢰 후 담당자가 대부분의 업무를 처리합니다.', home: false },
      { id: 'f9', cat: '합법성 · 채무자 권리', q: '합법적인 추심인가요?', a: '새한신용정보주식회사는 금융위원회에 등록된 합법 신용정보업자입니다. 채무자 인권을 보호하며 채권추심법이 허용하는 범위 내에서만 진행합니다. 야간 연락, 협박, 제3자 고지 등 불법 행위는 절대 하지 않습니다.', home: true },
      { id: 'f10', cat: '합법성 · 채무자 권리', q: '채무자가 연락을 끊으면 어떻게 하나요?', a: '재산·신용조사를 통해 채무자 소재 및 재산을 파악합니다. 소재 확인 후 내용증명 발송, 법원을 통한 지급명령·소송, 강제집행 등 법적 절차를 순차적으로 진행합니다.', home: false },
      { id: 'f11', cat: '합법성 · 채무자 권리', q: '채무자가 재산이 없으면 회수가 불가능한가요?', a: '현재 재산이 없더라도 추심을 포기할 필요는 없습니다. 채무자의 재산 상황은 언제든 변할 수 있고, 소멸시효 중단을 위한 조치(지급명령 신청 등)를 취해 권리를 보전할 수 있습니다. 담당자와 구체적인 전략을 상담하세요.', home: false }
    ]
  };

  var IMAGE_DEFS = [
    { key: 'logo.png', label: '로고 (전 페이지 상단)', path: 'images/logo.png' },
    { key: 'hero-bg.jpg', label: '메인 히어로 배경 (홈)', path: 'images/hero-bg.jpg' },
    { key: 'popup-greenlight.jpg', label: '팝업 배너 이미지 (홈)', path: 'images/popup-greenlight.jpg' },
    { key: 'section-consult.jpg', label: '섹션 1 — 채권추심 상담 (홈)', path: 'images/section-consult.jpg' },
    { key: 'section-docs.jpg', label: '섹션 2 — 재산·신용조사 (홈)', path: 'images/section-docs.jpg' },
    { key: 'section-legal.jpg', label: '섹션 3 — 합법 추심 (홈)', path: 'images/section-legal.jpg' },
    { key: 'section-network.jpg', label: '전국 네트워크 배경 (홈)', path: 'images/section-network.jpg' },
    { key: 'office.jpg', label: '사무실 사진 (홈)', path: 'images/office.jpg' }
  ];

  var TAG_LABELS = { law: '법령안내', biz: '업무안내', service: '서비스', notice: '공지' };
  var TAG_CLASS = { law: 'tag-law', biz: 'tag-biz', service: 'tag-service', notice: 'tag-notice' };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULTS);
      var parsed = JSON.parse(raw);
      var merged = clone(DEFAULTS);
      Object.keys(parsed).forEach(function (k) {
        if (merged[k] && typeof merged[k] === 'object' && !Array.isArray(merged[k]) && parsed[k] && typeof parsed[k] === 'object' && !Array.isArray(parsed[k])) {
          Object.assign(merged[k], parsed[k]);
        } else {
          merged[k] = parsed[k];
        }
      });
      return merged;
    } catch (e) {
      return clone(DEFAULTS);
    }
  }

  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    return load();
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  /* ---------------- 인증 ---------------- */
  function isAuthed() {
    return sessionStorage.getItem(AUTH_KEY) === '1';
  }
  function checkPassword(pw, data) {
    data = data || load();
    return pw === ((data.settings && data.settings.password) || DEFAULTS.settings.password);
  }
  function login(pw) {
    if (checkPassword(pw)) {
      sessionStorage.setItem(AUTH_KEY, '1');
      return true;
    }
    return false;
  }
  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
  }

  /* ---------------- 이미지 반영 ---------------- */
  function applyImages(data) {
    data = data || load();
    if (!data.images) return;
    var imgs = document.querySelectorAll('img[src]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var base = img.getAttribute('src').split('/').pop();
      if (data.images[base]) img.src = data.images[base];
    }
    var heroBg = document.getElementById('heroBg');
    if (heroBg && data.images['hero-bg.jpg']) {
      heroBg.style.backgroundImage = "url('" + data.images['hero-bg.jpg'] + "')";
    }
  }

  /* ---------------- 연락처 반영 (기본 문자열 → 관리자 설정값으로 치환) ---------------- */
  function applyContact(data) {
    data = data || load();
    var d = DEFAULTS.contact, c = data.contact || {};
    var pairs = [
      [d.docFax, c.docFax],
      [d.fax, c.fax],
      [d.csPhone, c.csPhone],
      [d.directPhone, c.directPhone],
      [d.mainPhone, c.mainPhone],
      [d.email, c.email],
      [d.address, c.address],
      [d.addressShort, c.address],
      [d.hoursCompact, c.hoursCompact || c.hours],
      [d.hoursSpaced, c.hoursSpaced || c.hours]
    ].filter(function (p) { return p[0] && p[1] && p[0] !== p[1]; });

    if (!pairs.length) return;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var node, nodes = [];
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(function (n) {
      var v = n.nodeValue, changed = false;
      pairs.forEach(function (p) {
        if (v.indexOf(p[0]) !== -1) { v = v.split(p[0]).join(p[1]); changed = true; }
      });
      if (changed) n.nodeValue = v;
    });

    var attrEls = document.querySelectorAll('[onclick],[href]');
    for (var i = 0; i < attrEls.length; i++) {
      var el = attrEls[i];
      ['onclick', 'href'].forEach(function (attr) {
        if (!el.hasAttribute(attr)) return;
        var v = el.getAttribute(attr), orig = v;
        pairs.forEach(function (p) { if (v.indexOf(p[0]) !== -1) v = v.split(p[0]).join(p[1]); });
        if (v !== orig) el.setAttribute(attr, v);
      });
    }
  }

  /* ---------------- 팝업 반영 (홈페이지) ---------------- */
  function applyPopup(data) {
    data = data || load();
    var popup = document.getElementById('popup');
    if (!popup) return;
    if (!data.popup || data.popup.enabled === false) {
      popup.style.display = 'none';
      return;
    }
    var textEl = popup.querySelector('.popup-text');
    if (textEl && data.popup.text) textEl.innerHTML = data.popup.text;
    var bannerEl = document.getElementById('popupBannerText');
    if (bannerEl && data.popup.bannerText) bannerEl.innerHTML = data.popup.bannerText;
    var ctaEl = popup.querySelector('.popup-cta');
    if (ctaEl && data.popup.ctaText) ctaEl.textContent = data.popup.ctaText;
  }

  /* ---------------- 공지사항 ---------------- */
  function isDefault(key, data) {
    try { return JSON.stringify(data[key]) === JSON.stringify(DEFAULTS[key]); } catch (e) { return true; }
  }

  function renderNoticeList(data) {
    data = data || load();
    var list = document.getElementById('noticeList');
    if (!list) return;
    list.innerHTML = '';
    data.notices.forEach(function (n) {
      var row = document.createElement('div');
      row.className = 'notice-row';
      row.dataset.cat = n.tag;
      row.addEventListener('click', function () { if (typeof toggleNotice === 'function') toggleNotice(row); });
      row.innerHTML = '<span class="notice-row-tag ' + (TAG_CLASS[n.tag] || '') + '">' + escapeHtml(TAG_LABELS[n.tag] || n.tag) +
        '</span><span class="notice-row-title">' + escapeHtml(n.title) + '</span><span class="notice-row-date">' + escapeHtml(n.date) + '</span>';
      var detail = document.createElement('div');
      detail.className = 'notice-detail';
      detail.textContent = n.body;
      list.appendChild(row);
      list.appendChild(detail);
    });
  }

  function renderNoticeHome(data) {
    data = data || load();
    var grid = document.getElementById('noticeGridHome');
    if (!grid) return;
    if (isDefault('notices', data)) return; // 기본 상태면 기존 애니메이션 마크업 유지
    grid.innerHTML = '';
    data.notices.slice(0, 4).forEach(function (n) {
      var card = document.createElement('div');
      card.className = 'notice-card visible';
      card.addEventListener('click', function () { location.href = 'pages/notice.html'; });
      card.innerHTML = '<div class="nc-tag">' + escapeHtml(TAG_LABELS[n.tag] || n.tag) + '</div><div class="nc-title">' +
        escapeHtml(n.title) + '</div><div class="nc-date">' + escapeHtml(n.date) + '</div>';
      grid.appendChild(card);
    });
  }

  /* ---------------- FAQ ---------------- */
  function renderFaqList(data) {
    data = data || load();
    var list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = '';
    var lastCat = null;
    data.faqs.forEach(function (f, idx) {
      if (f.cat !== lastCat) {
        var label = document.createElement('div');
        label.className = 'faq-cat-label';
        label.textContent = f.cat;
        list.appendChild(label);
        lastCat = f.cat;
      }
      var item = document.createElement('div');
      item.className = 'faq-page-item' + (idx === 0 ? ' open' : '');
      item.innerHTML = '<div class="faq-page-q" onclick="toggleFaq(this.parentElement)"><span class="faq-page-q-num">Q</span>' +
        '<span class="faq-page-q-txt">' + escapeHtml(f.q) + '</span><span class="faq-page-toggle">+</span></div>' +
        '<div class="faq-page-a">' + escapeHtml(f.a) + '</div>';
      list.appendChild(item);
    });
  }

  function renderFaqHome(data) {
    data = data || load();
    var wrap = document.getElementById('faqWrapHome');
    if (!wrap) return;
    if (isDefault('faqs', data)) return; // 기본 상태면 기존 애니메이션 마크업 유지
    wrap.innerHTML = '';
    var items = data.faqs.filter(function (f) { return f.home; }).slice(0, 4);
    items.forEach(function (f, i) {
      var item = document.createElement('div');
      item.className = 'faq-item visible' + (i === 0 ? ' open' : '');
      item.innerHTML = '<div class="faq-q" onclick="toggleFaq(this)"><span class="faq-q-txt">' + escapeHtml(f.q) +
        '</span><span class="faq-toggle">+</span></div><div class="faq-a">' + escapeHtml(f.a) + '</div>';
      wrap.appendChild(item);
    });
  }

  /* ---------------- 이미지 압축 업로드 ---------------- */
  function compressImageFile(file, opts, cb) {
    opts = opts || {};
    var maxWidth = opts.maxWidth || 1600;
    var quality = opts.quality || 0.78;
    var isPng = /\.png$/i.test(file.name) || file.type === 'image/png';
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, maxWidth / img.width);
        var w = Math.round(img.width * scale);
        var h = Math.round(img.height * scale);
        var canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        var dataUrl = isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', quality);
        cb(null, dataUrl);
      };
      img.onerror = function () { cb(new Error('이미지를 불러올 수 없습니다.')); };
      img.src = e.target.result;
    };
    reader.onerror = function () { cb(new Error('파일을 읽을 수 없습니다.')); };
    reader.readAsDataURL(file);
  }

  /* ---------------- 전체 적용 (공개 페이지용) ---------------- */
  function applyAll() {
    var data = load();
    applyImages(data);
    applyContact(data);
    applyPopup(data);
    renderNoticeList(data);
    renderNoticeHome(data);
    renderFaqList(data);
    renderFaqHome(data);
  }

  global.SHS = {
    STORAGE_KEY: STORAGE_KEY,
    DEFAULTS: DEFAULTS,
    IMAGE_DEFS: IMAGE_DEFS,
    TAG_LABELS: TAG_LABELS,
    load: load,
    save: save,
    resetAll: resetAll,
    escapeHtml: escapeHtml,
    isAuthed: isAuthed,
    checkPassword: checkPassword,
    login: login,
    logout: logout,
    applyAll: applyAll,
    applyImages: applyImages,
    applyContact: applyContact,
    applyPopup: applyPopup,
    renderNoticeList: renderNoticeList,
    renderNoticeHome: renderNoticeHome,
    renderFaqList: renderFaqList,
    renderFaqHome: renderFaqHome,
    compressImageFile: compressImageFile
  };
})(window);
