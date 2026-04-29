const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const i18n = fs.readFileSync('i18n.js', 'utf8');

const injection = `
    let currentLang = localStorage.getItem('blt_lang') || 'en';
    
${i18n}
    function t(key) {
      return translations[currentLang]?.[key] || translations['en'][key] || key;
    }
    
    function updateDOM() {
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
      });
      const search = document.getElementById('historySearch');
      if (search) search.placeholder = t('tab_history_search');
    }
`;

const updated = html.replace("let currentEditId = null;", "let currentEditId = null;\n" + injection);
fs.writeFileSync('index.html', updated);
