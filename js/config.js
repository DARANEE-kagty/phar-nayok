/**
 * ไฟล์ตั้งค่าเว็บไซต์ (Site Configuration)
 * กลุ่มงานเภสัชกรรม โรงพยาบาลนครนายก
 * 
 * เภสัชกรผู้ดูแลระบบสามารถแก้ไขค่าต่างๆ ในไฟล์นี้ได้โดยตรงด้วยโปรแกรม Notepad
 */

const APP_CONFIG = {
  // 1. วาง URL ของ Google Sheets ที่ "เผยแพร่ไปยังเว็บ (Publish to web)" เป็น CSV ที่นี่
  // ตัวอย่าง: https://docs.google.com/spreadsheets/d/e/2PACX-1vSmockURL.../pub?gid=0&single=true&output=csv
  ANNOUNCEMENT_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMG7aKOeNPfgK1H7-vE2NiQ2Z35xY43szSWbsHnBsZb1AvT-DemxrZoUjGsrJhxr_mlMYLMazoYOw_/pub?gid=0&single=true&output=csv',

  // 2. ลิงก์สำรองไปยังหน้าข่าว/เอกสารบน Google Sites (กรณี Google Sheets ขัดข้อง หรือผู้ใช้ต้องการดูข่าวทั้งหมด)
  FALLBACK_NEWS_URL: 'https://sites.google.com/view/pharmnayok-news',

  // 3. จำนวนประกาศเด่นสูงสุดที่จะแสดงในหน้าแรก
  MAX_ANNOUNCEMENTS: 5
};

// แนบตัวแปรเข้า window เพื่อความสะดวกในการเรียกใช้และทดสอบ
window.APP_CONFIG = APP_CONFIG;
