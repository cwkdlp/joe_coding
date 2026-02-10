const generateBtn = document.getElementById('generate-btn');
const lottoNumbers = document.querySelectorAll('.number');
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const setTheme = (theme) => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    const isDark = theme === 'dark';
    themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
};

const initTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
        setTheme(stored);
        return;
    }
    setTheme(prefersDark.matches ? 'dark' : 'light');
};

initTheme();

generateBtn.addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    lottoNumbers.forEach((element, index) => {
        element.textContent = Array.from(numbers)[index];
    });
});

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
});

prefersDark.addEventListener('change', (event) => {
    if (!localStorage.getItem('theme')) {
        setTheme(event.matches ? 'dark' : 'light');
    }
});
