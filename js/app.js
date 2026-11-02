/**
 * Pharmacy Portal Gateway - Nakhon Nayok Hospital
 * Client-side Controller & Instant Search Engine
 */

// Fallback dataset in case fetch is blocked by browser under file:/// protocol
const FALLBACK_DATA = {
  "site_info": {
    "organization": "กลุ่มงานเภสัชกรรม โรงพยาบาลนครนายก",
    "portal_name": "Pharmacy Portal Gateway",
    "last_updated": "2026-10-30"
  },
  "categories": [
    { "id": "all", "name": "ทั้งหมด", "icon": "fa-solid fa-border-all" },
    { "id": "clinical_tools", "name": "เครื่องมือคลินิก & คำนวณยา", "icon": "fa-solid fa-calculator" },
    { "id": "formulary", "name": "คู่มือ & ข้อมูลยา (DIS)", "icon": "fa-solid fa-book-medical" },
    { "id": "safety", "name": "ความปลอดภัย & ยา HAD", "icon": "fa-solid fa-shield-halved" },
    { "id": "opd_ipd", "name": "บริการจ่ายยา (OPD / IPD)", "icon": "fa-solid fa-pills" },
    { "id": "stock", "name": "คลังยา & เวชภัณฑ์", "icon": "fa-solid fa-boxes-stacked" },
    { "id": "admin", "name": "งานบริหาร & ตารางเวร", "icon": "fa-solid fa-calendar-days" }
  ],
  "links": [
    {
      "id": "formulary-online",
      "title": "คู่มือบัญชียาโรงพยาบาลนครนายก (Online Formulary)",
      "description": "สืบค้นรายการยา บัญชียาหลักแห่งชาติ ขนาดยา เงื่อนไขการสั่งใช้ และยาช่วยชีวิตฉุกเฉิน",
      "url": "https://sites.google.com/view/pharmnayok-formulary",
      "category": "formulary",
      "keywords": ["formulary", "บัญชียา", "รายการยา", "ยาหลัก", "ขนาดยา", "drug list", "สูตรยา"],
      "restricted": false,
      "featured": true,
      "icon": "fa-solid fa-book-medical"
    },
    {
      "id": "had-guidelines",
      "title": "แนวทางติดตามยาความเสี่ยงสูง (High Alert Drugs)",
      "description": "เกณฑ์ความปลอดภัย ฉลากเตือน ข้อควรระวัง และวิธีบริหารยากลุ่ม HAD 29 รายการ",
      "url": "https://sites.google.com/view/pharmnayok-had",
      "category": "safety",
      "keywords": ["had", "high alert drugs", "ยาความเสี่ยงสูง", "แนวทาง", "ความปลอดภัย", "คู่มือยา", "heparin", "insulin"],
      "restricted": false,
      "featured": true,
      "icon": "fa-solid fa-triangle-exclamation"
    },
    {
      "id": "pedidose-calc",
      "title": "Pedidose Calculator (โปรแกรมคำนวณขนาดยาเด็ก)",
      "description": "คำนวณขนาดยาน้ำ ยาปฏิชีวนะ และยาฉีดตามน้ำหนักตัวและอายุของผู้ป่วยเด็ก",
      "url": "https://sites.google.com/view/pharmnayok-pedidose",
      "category": "clinical_tools",
      "keywords": ["pedidose", "ยาเด็ก", "คำนวณยา", "pediatric", "dose calculator", "น้ำหนักตัว", "กุมาร"],
      "restricted": false,
      "featured": true,
      "icon": "fa-solid fa-baby"
    },
    {
      "id": "renaldose-calc",
      "title": "Renal Dose Adjustment (คำนวณปรับขนาดยาตามการทำงานของไต)",
      "description": "คำนวณค่า CrCl ตามสูตร Cockcroft-Gault และแนะนำแนวทางปรับขนาดยาในผู้ป่วยไตบกพร่อง",
      "url": "https://sites.google.com/view/pharmnayok-renaldose",
      "category": "clinical_tools",
      "keywords": ["renal", "crcl", "โรคไต", "ปรับขนาดยา", "cockcroft-gault", "creatinine", "kidney", "ไต"],
      "restricted": false,
      "featured": true,
      "icon": "fa-solid fa-calculator"
    },
    {
      "id": "smart-iv-inject",
      "title": "Smart IV Inject & Compatibility Chatbot",
      "description": "ระบบตรวจสอบความเข้ากันได้ของยาฉีด สารน้ำที่เข้ากันได้ และอัตราการให้ยาทางหลอดเลือดดำ",
      "url": "https://line.me/R/ti/p/@smart-iv-pharm",
      "category": "clinical_tools",
      "keywords": ["iv inject", "ความเข้ากันได้", "สารน้ำ", "compatibility", "ยาฉีด", "chatbot", "iv dilution", "ผสมยา"],
      "restricted": false,
      "featured": true,
      "icon": "fa-solid fa-syringe"
    },
    {
      "id": "adr-me-report",
      "title": "ระบบรายงานแพ้ยาและคลาดเคลื่อนทางยา (ADR & ME System)",
      "description": "แบบฟอร์มบันทึกและสืบค้นประวัติการแพ้ยา บัตรแพ้ยา และรายงานอุบัติการณ์ความคลาดเคลื่อนทางยา",
      "url": "https://docs.google.com/forms/d/e/1FAIpQLSc-mock-adr/viewform",
      "category": "safety",
      "keywords": ["adr", "แพ้ยา", "me", "medication error", "อุบัติการณ์", "ความคลาดเคลื่อน", "รายงาน", "บัตรแพ้ยา"],
      "restricted": true,
      "featured": true,
      "icon": "fa-solid fa-shield-halved"
    },
    {
      "id": "ipd-paperless-tracker",
      "title": "ระบบติดตามใบสั่งยาผู้ป่วยใน (IPD Medication Tracker)",
      "description": "ติดตามสถานะการจัด-จ่ายยาหอผู้ป่วยแบบเรียลไทม์ และแจ้งเตือนยา Stat / ยาด่วนประจำตึก",
      "url": "https://script.google.com/macros/s/mock-ipd-portal/exec",
      "category": "opd_ipd",
      "keywords": ["ipd", "ผู้ป่วยใน", "หอผู้ป่วย", "ใบสั่งยา", "สถานะยา", "stat", "ward", "ตึกผู้ป่วย"],
      "restricted": true,
      "featured": false,
      "icon": "fa-solid fa-bed-pulse"
    },
    {
      "id": "opd-queue-dashboard",
      "title": "Dashboard คิวและระยะเวลารอคอยห้องยา OPD",
      "description": "สถิติระยะเวลารอคอยรับยาเฉลี่ย และสถานะคิวจ่ายยาแบบเรียลไทม์ห้องจ่ายยาผู้ป่วยนอก",
      "url": "https://lookerstudio.google.com/reporting/mock-opd-queue",
      "category": "opd_ipd",
      "keywords": ["opd", "คิว", "ผู้ป่วยนอก", "เวลารอคอย", "queue", "dashboard", "ห้องยา", "รอรับยา"],
      "restricted": false,
      "featured": false,
      "icon": "fa-solid fa-users"
    },
    {
      "id": "due-protocol",
      "title": "แบบฟอร์มและแนวทางกำกับการใช้ยาปฏิชีวนะ (DUE Protocols)",
      "description": "เกณฑ์ขออนุมัติยากลุ่มควบคุมพิเศษ (Ceftazidime/Avibactam, Colistin, Meropenem) พร้อมแบบฟอร์มดาวน์โหลด",
      "url": "https://sites.google.com/view/pharmnayok-due",
      "category": "safety",
      "keywords": ["due", "antibiotics", "ยาปฏิชีวนะ", "colistin", "meropenem", "ceftazidime", "แบบฟอร์ม", "ขออนุมัติยา"],
      "restricted": true,
      "featured": false,
      "icon": "fa-solid fa-file-signature"
    },
    {
      "id": "drug-stock-status",
      "title": "ระบบสืบค้นสถานะคลังยาและรายการยาขาดคราว",
      "description": "ตรวจสอบยอดคงเหลือยาเวชภัณฑ์ รายการยาใกล้หมด และแนวทางใช้ยาทางเลือกทดแทนยาขาดคราว",
      "url": "https://sites.google.com/view/pharmnayok-stock",
      "category": "stock",
      "keywords": ["คลังยา", "ยาขาด", "สต็อกยา", "เวชภัณฑ์", "stock", "shortage", "ยาสำรอง", "เบิกยา"],
      "restricted": true,
      "featured": false,
      "icon": "fa-solid fa-boxes-stacked"
    },
    {
      "id": "smart-temp-alert",
      "title": "ระบบตรวจวัดอุณหภูมิตู้เย็นเก็บยา (Smart Temperature Alert)",
      "description": "ติดตามอุณหภูมิและความชื้นของตู้เย็นเก็บยาและวัคซีนตลอด 24 ชั่วโมง พร้อมระบบแจ้งเตือน Line Alert",
      "url": "https://dashboard.pharmnayok.org/temp-monitor",
      "category": "stock",
      "keywords": ["ตู้เย็น", "อุณหภูมิ", "วัคซีน", "cold chain", "temp", "alert", "ตู้ยา", "ความชื้น"],
      "restricted": true,
      "featured": false,
      "icon": "fa-solid fa-temperature-arrow-down"
    },
    {
      "id": "chemo-compounding-sop",
      "title": "คู่มือปฏิบัติงานผสมยาเคมีบำบัด (Chemotherapy SOP)",
      "description": "ขั้นตอนการเตรียมยาเคมีบำบัด เทคนิคปลอดเชื้อ การป้องกันการปนเปื้อน และชุดอุปกรณ์ Spill Kit",
      "url": "https://drive.google.com/drive/folders/mock-chemo-sop",
      "category": "formulary",
      "keywords": ["chemo", "เคมีบำบัด", "ผสมยา", "sop", "ขั้นตอน", "cytotoxic", "spill kit", "ความปลอดภัย"],
      "restricted": true,
      "featured": false,
      "icon": "fa-solid fa-flask-vial"
    },
    {
      "id": "duty-schedule",
      "title": "ตารางเวรปฏิบัติการและรายชื่อเภสัชกรผู้ประสานงาน",
      "description": "ตารางปฏิบัติงานนอกเวลาราชการ (เวรผลัด) ตาราง OT และเบอร์โทรศัพท์ติดต่อเภสัชกรประจำจุด",
      "url": "https://docs.google.com/spreadsheets/d/mock-duty-schedule/edit",
      "category": "admin",
      "keywords": ["ตารางเวร", "เวร", "รายชื่อ", "เบอร์โทร", "schedule", "duty", "โอที", "ot", "ติดต่อ"],
      "restricted": true,
      "featured": true,
      "icon": "fa-solid fa-calendar-days"
    },
    {
      "id": "dis-faq-database",
      "title": "คลังตอบคำถามทางเภสัชสนเทศ (DIS FAQ Database)",
      "description": "รวมคำถาม-คำตอบการใช้ยาที่พบบ่อย เช่น การบดยา, การบริหารยาทางสายยาง NG Tube และข้อห้ามใช้",
      "url": "https://sites.google.com/view/pharmnayok-dis-faq",
      "category": "formulary",
      "keywords": ["dis", "เภสัชสนเทศ", "faq", "บดยา", "ng tube", "ตอบคำถามยา", "คำถามที่พบบ่อย", "บริหารยา"],
      "restricted": false,
      "featured": false,
      "icon": "fa-solid fa-circle-question"
    },
    {
      "id": "ha-gpp-accreditation",
      "title": "คลังเอกสารมาตรฐาน HA & GPP โรงพยาบาลนครนายก",
      "description": "รวมแบบประเมินตนเอง ตัวชี้วัดคุณภาพทางเภสัชกรรม (KPIs) และเอกสารรับรองมาตรฐานระบบยา",
      "url": "https://drive.google.com/drive/folders/mock-ha-gpp",
      "category": "admin",
      "keywords": ["ha", "gpp", "มาตรฐาน", "kpi", "คุณภาพ", "ประเมินตนเอง", "accreditation", "รับรอง", "kpis"],
      "restricted": true,
      "featured": false,
      "icon": "fa-solid fa-award"
    }
  ]
};

// State Management
let portalData = null;
let currentCategory = 'all';
let currentSearchQuery = '';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const categoryContainer = document.getElementById('categoryContainer');
const featuredSection = document.getElementById('featuredSection');
const featuredLinksContainer = document.getElementById('featuredLinksContainer');
const allLinksSection = document.getElementById('allLinksSection');
const allLinksContainer = document.getElementById('allLinksContainer');
const allLinksTitle = document.getElementById('allLinksTitle');
const searchResultsBar = document.getElementById('searchResultsBar');
const searchResultsText = document.getElementById('searchResultsText');
const emptyState = document.getElementById('emptyState');
const backToTopBtn = document.getElementById('backToTopBtn');

/**
 * Initialize application
 */
async function initApp() {
  portalData = await loadPortalData();
  renderCategories();
  renderPortal();
  loadAnnouncements(); // โหลดประกาศเด่นจาก Google Sheets (CSV)
  setupEventListeners();
}

/**
 * Fetch links.json with graceful fallback
 */
async function loadPortalData() {
  try {
    const response = await fetch('data/links.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Unable to fetch data/links.json directly (e.g. file:/// protocol). Using built-in dataset.', error);
    return FALLBACK_DATA;
  }
}

/**
 * Render category filter buttons
 */
function renderCategories() {
  if (!categoryContainer || !portalData || !portalData.categories) return;

  categoryContainer.innerHTML = portalData.categories.map(cat => `
    <button type="button" class="category-btn ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">
      <i class="${cat.icon}"></i>
      <span>${cat.name}</span>
    </button>
  `).join('');

  // Add click handlers
  categoryContainer.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-category');
      selectCategory(catId);
    });
  });
}

/**
 * Select active category
 */
function selectCategory(catId) {
  currentCategory = catId;
  
  // Update button active state
  categoryContainer.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === catId);
  });

  renderPortal();
}

/**
 * Render Link Card HTML
 */
function createCardHTML(item) {
  const isRestricted = item.restricted === true;
  const isFeatured = item.featured === true;
  
  // Find category name
  const catObj = portalData.categories.find(c => c.id === item.category);
  const catName = catObj ? catObj.name : item.category;

  const restrictedNotice = isRestricted ? `
    <div class="restricted-notice" title="ต้องเข้าสู่ระบบด้วยบัญชีของโรงพยาบาล">
      <i class="fa-solid fa-lock"></i>
      <span>ต้องเข้าสู่ระบบด้วยบัญชีของโรงพยาบาล</span>
    </div>
  ` : '';

  const featuredBadge = isFeatured ? `
    <span class="badge badge-featured">
      <i class="fa-solid fa-star"></i> ใช้บ่อย
    </span>
  ` : '';

  return `
    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="link-card ${isFeatured ? 'featured-card' : ''}" data-id="${item.id}">
      <div class="card-top">
        <div class="card-icon-box">
          <i class="${item.icon || 'fa-solid fa-link'}"></i>
        </div>
        <div class="card-badges">
          ${featuredBadge}
          <span class="badge badge-category">${catName}</span>
        </div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${item.title}</h4>
        <p class="card-desc">${item.description}</p>
        ${restrictedNotice}
      </div>
      <div class="card-action">
        <span>เปิดใช้งาน</span>
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </div>
    </a>
  `;
}

/**
 * Filter items by category and query
 */
function filterItems() {
  if (!portalData || !portalData.links) return [];

  const query = currentSearchQuery.toLowerCase().trim();

  return portalData.links.filter(item => {
    // 1. Category check
    const matchesCategory = (currentCategory === 'all') || (item.category === currentCategory);
    if (!matchesCategory) return false;

    // 2. Search query check
    if (!query) return true;

    const title = (item.title || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const keywords = (item.keywords || []).map(k => k.toLowerCase()).join(' ');
    const category = (item.category || '').toLowerCase();

    return title.includes(query) || 
           desc.includes(query) || 
           keywords.includes(query) || 
           category.includes(query);
  });
}

/**
 * Main render function
 */
function renderPortal() {
  if (!allLinksContainer) return;
  const query = currentSearchQuery.trim();
  const filtered = filterItems();

  // If user is searching:
  if (query) {
    // Hide Featured section during active search to prevent duplication
    if (featuredSection) featuredSection.style.display = 'none';

    // Show search status bar
    if (searchResultsBar) searchResultsBar.classList.add('active');
    if (searchResultsText) searchResultsText.innerHTML = `พบ <strong>${filtered.length}</strong> รายการ สำหรับคำค้นหา "<strong>${escapeHTML(query)}</strong>"`;

    // Update section title
    if (allLinksTitle) allLinksTitle.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> ผลการค้นหา (${filtered.length})`;

    if (filtered.length === 0) {
      allLinksContainer.innerHTML = '';
      if (emptyState) emptyState.classList.add('active');
    } else {
      if (emptyState) emptyState.classList.remove('active');
      allLinksContainer.innerHTML = filtered.map(item => createCardHTML(item)).join('');
    }
  } else {
    // Normal Browse Mode
    if (searchResultsBar) searchResultsBar.classList.remove('active');
    if (emptyState) emptyState.classList.remove('active');

    // 1. Render Featured section
    const featuredItems = (portalData && portalData.links) ? portalData.links.filter(item => item.featured === true) : [];
    if (featuredItems.length > 0 && currentCategory === 'all' && featuredSection) {
      featuredSection.style.display = 'block';
      if (featuredLinksContainer) featuredLinksContainer.innerHTML = featuredItems.map(item => createCardHTML(item)).join('');
    } else if (featuredSection) {
      featuredSection.style.display = 'none';
    }

    // 2. Render Category / All Links
    const activeCatObj = (portalData && portalData.categories) ? portalData.categories.find(c => c.id === currentCategory) : null;
    const catDisplayName = activeCatObj ? activeCatObj.name : 'ทั้งหมด';
    if (allLinksTitle) allLinksTitle.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${catDisplayName} (${filtered.length})`;

    if (filtered.length === 0) {
      allLinksContainer.innerHTML = '';
      if (emptyState) emptyState.classList.add('active');
    } else {
      if (emptyState) emptyState.classList.remove('active');
      allLinksContainer.innerHTML = filtered.map(item => createCardHTML(item)).join('');
    }
  }
}

/**
 * Event Listeners setup
 */
function setupEventListeners() {
  // Search input live filtering (if present)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearSearchBtn) {
        if (currentSearchQuery) {
          clearSearchBtn.classList.add('active');
        } else {
          clearSearchBtn.classList.remove('active');
        }
      }
      renderPortal();
    });
  }

  // Clear search button (if present)
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.classList.remove('active');
      searchInput.focus();
      renderPortal();
    });
  }

  // Suggestion chips click handler (if present)
  document.querySelectorAll('.search-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-search') || chip.innerText.trim();
      if (searchInput) {
        searchInput.value = val;
        currentSearchQuery = val;
      }
      if (clearSearchBtn) clearSearchBtn.classList.add('active');
      renderPortal();
      if (allLinksSection) allLinksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Dropdown menu search trigger links (if present)
  document.querySelectorAll('.search-trigger').forEach(link => {
    link.addEventListener('click', (e) => {
      const query = link.getAttribute('data-query');
      if (query && searchInput) {
        searchInput.value = query;
        currentSearchQuery = query;
        if (clearSearchBtn) clearSearchBtn.classList.add('active');
        renderPortal();
        if (allLinksSection) allLinksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close dropdowns
      document.querySelectorAll('.nav-item.has-dropdown').forEach(item => item.classList.remove('open'));
    });
  });

  // Smooth scroll for internal anchor links (e.g. #visionMissionSection, #structureSection, #policySection, #announcementsSection, #footerContact)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close any open dropdowns
          document.querySelectorAll('.nav-item.has-dropdown').forEach(item => item.classList.remove('open'));
        }
      }
    });
  });

  // Mobile / touch click handling for navigation dropdowns
  document.querySelectorAll('.nav-item.has-dropdown > .nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Allow hover on desktop, toggle on click for touch/mobile
      if (window.innerWidth < 1024) {
        e.preventDefault();
        const parent = btn.closest('.nav-item');
        const wasOpen = parent.classList.contains('open');
        document.querySelectorAll('.nav-item.has-dropdown').forEach(item => item.classList.remove('open'));
        if (!wasOpen) {
          parent.classList.add('open');
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      document.querySelectorAll('.nav-item.has-dropdown').forEach(item => item.classList.remove('open'));
    }
  });

  // Scroll to top button
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Simple HTML escape helper
 */
function escapeHTML(str) {
  return String(str || '').replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/**
 * Robust CSV parser for Google Sheets export
 */
function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let curVal = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        curVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(curVal.trim());
      curVal = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      row.push(curVal.trim());
      if (row.some(cell => cell.length > 0)) lines.push(row);
      row = [];
      curVal = '';
    } else {
      curVal += c;
    }
  }
  if (curVal || row.length > 0) {
    row.push(curVal.trim());
    if (row.some(cell => cell.length > 0)) lines.push(row);
  }
  return lines;
}

/**
 * Parse Thai or Standard date string for day & month display
 */
function parseDateDisplay(dateStr) {
  if (!dateStr) return { day: '--', month: 'ข่าว' };
  const str = String(dateStr).trim();

  // Match e.g. "30 ต.ค. 2569", "28 ต.ค. 69"
  const thaiMatch = str.match(/^(\d{1,2})\s*([^\d\s]+)/);
  if (thaiMatch) {
    return { day: thaiMatch[1], month: thaiMatch[2] };
  }

  // Match slash / dash: e.g. "30/10/2569" or "2026-10-30"
  const slashMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})/);
  if (slashMatch) {
    const months = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const mNum = parseInt(slashMatch[2], 10);
    return { day: slashMatch[1], month: months[mNum] || slashMatch[2] };
  }

  return { day: str.slice(0, 2), month: 'ข่าว' };
}

/**
 * Convert date string to timestamp for sorting newest first
 */
function parseDateToTimestamp(str) {
  if (!str) return 0;
  const s = String(str).trim();

  // ISO format: 2026-10-30
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    return new Date(s).getTime() || 0;
  }

  const thaiMonths = {
    'ม.ค.': 0, 'ก.พ.': 1, 'มี.ค.': 2, 'เม.ย.': 3, 'พ.ค.': 4, 'มิ.ย.': 5,
    'ก.ค.': 6, 'ส.ค.': 7, 'ก.ย.': 8, 'ต.ค.': 9, 'พ.ย.': 10, 'ธ.ค.': 11,
    'มกราคม': 0, 'กุมภาพันธ์': 1, 'มีนาคม': 2, 'เมษายน': 3, 'พฤษภาคม': 4, 'มิถุนายน': 5,
    'กรกฎาคม': 6, 'สิงหาคม': 7, 'กันยายน': 8, 'ตุลาคม': 9, 'พฤศจิกายน': 10, 'ธันวาคม': 11
  };

  const parts = s.split(/[\s\/\-]+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const month = thaiMonths[parts[1]] !== undefined ? thaiMonths[parts[1]] : (parseInt(parts[1], 10) - 1);
    let year = parseInt(parts[2], 10);
    if (year > 2400) year -= 543; // Buddhist to Gregorian year
    if (year < 100) year += 2000;
    const d = new Date(year, month, day);
    return d.getTime() || 0;
  }
  return 0;
}

/**
 * Load announcements from Google Sheets CSV (Publish to web)
 */
async function loadAnnouncements() {
  const container = document.getElementById('announcementsContainer');
  if (!container) return;

  const config = window.APP_CONFIG || {
    ANNOUNCEMENT_CSV_URL: '',
    FALLBACK_NEWS_URL: 'https://sites.google.com/view/pharmnayok-news',
    MAX_ANNOUNCEMENTS: 5
  };

  // Update header button link if exists
  const allLink = document.getElementById('allAnnouncementsLink');
  if (allLink && config.FALLBACK_NEWS_URL) {
    allLink.href = config.FALLBACK_NEWS_URL;
  }

  // Backup mock announcements (in case Google Sheets fails or is not yet configured)
  const fallbackList = [
    {
      date: '28 ต.ค. 2569',
      title: 'แนวทางติดตามยาความเสี่ยงสูง (HAD 29 รายการ) ฉบับปรับปรุง',
      link: config.FALLBACK_NEWS_URL,
      show: 'TRUE'
    },
    {
      date: '25 ต.ค. 2569',
      title: 'แจ้งปรับเปลี่ยนขนาดยาและรูปแบบยาสำรองทดแทนชั่วคราว',
      link: config.FALLBACK_NEWS_URL,
      show: 'TRUE'
    }
  ];

  // If CSV URL is empty or is sample placeholder
  let rawUrl = (config.ANNOUNCEMENT_CSV_URL || '').trim();
  if (!rawUrl || rawUrl.includes('mock_pharmnayok_sheet')) {
    renderAnnouncements(fallbackList, true);
    return;
  }

  // Smart URL Normalizer for Google Sheets
  // Automatically detects and fixes /edit? URLs to direct CSV export format
  let targetUrl = rawUrl;
  if (rawUrl.includes('docs.google.com/spreadsheets/d/')) {
    const sheetIdMatch = rawUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    const gidMatch = rawUrl.match(/gid=([0-9]+)/);
    const sheetId = sheetIdMatch ? sheetIdMatch[1] : '';
    const gid = gidMatch ? gidMatch[1] : '0';

    if (sheetId && !rawUrl.includes('/pub?') && !rawUrl.includes('/gviz/tq')) {
      targetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
    }
  }

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (!rows || rows.length < 2) {
      renderAnnouncements(fallbackList, true);
      return;
    }

    // Match column names from header (วันที่, หัวข้อ, ลิงก์, แสดง)
    const headers = rows[0].map(h => h.trim().toLowerCase());
    let dateIdx = headers.findIndex(h => h.includes('วัน') || h.includes('date'));
    let titleIdx = headers.findIndex(h => h.includes('หัวข้อ') || h.includes('เรื่อง') || h.includes('title'));
    let linkIdx = headers.findIndex(h => h.includes('ลิงก์') || h.includes('link') || h.includes('url'));
    let showIdx = headers.findIndex(h => h.includes('แสดง') || h.includes('show') || h.includes('status'));

    if (dateIdx === -1) dateIdx = 0;
    if (titleIdx === -1) titleIdx = 1;
    if (linkIdx === -1) linkIdx = 2;
    if (showIdx === -1) showIdx = 3;

    const dataRows = rows.slice(1).map((r, originalIdx) => {
      const dateVal = r[dateIdx] || '';
      const titleVal = r[titleIdx] || '';
      const linkVal = r[linkIdx] || '';
      const showVal = r[showIdx] || '';
      return {
        date: dateVal,
        title: titleVal,
        link: linkVal,
        show: showVal,
        rowIndex: originalIdx
      };
    });

    // 1. Filter only rows where "แสดง" is TRUE
    const filtered = dataRows.filter(item => {
      const s = String(item.show).trim().toUpperCase();
      return s === 'TRUE' || s === '1' || s === 'YES' || s === 'จริง';
    });

    if (filtered.length === 0) {
      renderAnnouncements(fallbackList, true);
      return;
    }

    // 2. Sort newest first (เรียงใหม่สุดก่อน)
    filtered.sort((a, b) => {
      const timeA = parseDateToTimestamp(a.date);
      const timeB = parseDateToTimestamp(b.date);
      if (timeA && timeB && timeA !== timeB) {
        return timeB - timeA;
      }
      return b.rowIndex - a.rowIndex; // Newest row in sheet first
    });

    // 3. Take maximum 5 items (สูงสุด 5 รายการ)
    const maxItems = config.MAX_ANNOUNCEMENTS || 5;
    const displayList = filtered.slice(0, maxItems);

    renderAnnouncements(displayList, false);

  } catch (error) {
    console.warn('Unable to load announcements from Google Sheets CSV:', error);
    renderAnnouncements(fallbackList, true);
  }
}

/**
 * Render announcements into DOM
 */
function renderAnnouncements(list, isFallback) {
  const container = document.getElementById('announcementsContainer');
  if (!container) return;

  const config = window.APP_CONFIG || {
    FALLBACK_NEWS_URL: 'https://sites.google.com/view/pharmnayok-news'
  };

  let html = '';

  if (isFallback) {
    html += `
      <div class="announcements-fallback-box">
        <p><i class="fa-solid fa-circle-info"></i> ระบบกำลังแสดงประกาศสำรอง (เนื่องจากยังไม่ได้เชื่อมต่อ Google Sheets หรือระบบกำลังปรับปรุง)</p>
        <a href="${config.FALLBACK_NEWS_URL}" target="_blank" rel="noopener noreferrer" class="btn-sites">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> ไปยังหน้าข่าวสารบน Google Sites
        </a>
      </div>
    `;
  }

  html += list.map(item => {
    const { day, month } = parseDateDisplay(item.date);
    const hasLink = item.link && item.link.trim() !== '#' && item.link.trim() !== '';
    const linkUrl = hasLink ? item.link.trim() : config.FALLBACK_NEWS_URL;

    return `
      <a href="${escapeHTML(linkUrl)}" target="_blank" rel="noopener noreferrer" class="announcement-card" style="text-decoration: none; color: inherit;">
        <div class="announcement-date-box">
          <div class="day">${escapeHTML(day)}</div>
          <div class="month">${escapeHTML(month)}</div>
        </div>
        <div class="announcement-info" style="flex: 1;">
          <h4>${escapeHTML(item.title)}</h4>
          <span class="announcement-action">
            <span>อ่านประกาศ / ดูเอกสาร</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </span>
        </div>
      </a>
    `;
  }).join('');

  container.innerHTML = html;
}

// Kick off when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
