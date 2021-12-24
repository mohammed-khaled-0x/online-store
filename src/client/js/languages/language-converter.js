export default function languageConverter() {
    const html = document.getElementsByTagName('html')[0];
    const header = document.getElementById('header');
    const searchBox = document.getElementById('search_box');
    const englishLang = document.getElementById('english');
    const arabicLang = document.getElementById('arabic');
    const helloSpan = document.querySelector('.hello');
    const logName = document.getElementById('log_name');
    const greetingLogin = document.getElementById('greeting_login');
    const greetingSignup = document.getElementById('greeting_signup');
    const greetingLogout = document.getElementById('greeting_logout');
    if(localStorage.lang === 'en') {
        html.lang = 'en';
        header.classList.replace('rtl-header', 'ltr-header');
        searchBox.placeholder = 'What are you waiting for? Search now ...';
        searchBox.title = 'All you need is here, just search';
        englishLang.className = 'selected-language';
        arabicLang.className = '';
        helloSpan.innerText = 'Hello';
        logName.innerText = 'Do you have an account?';
        greetingLogin.innerHTML = 'Yes, <span>Log in</span>';
        greetingSignup.innerHTML = 'No, <span>Sign Up!!</span>';
        greetingLogout.innerHTML = '<span>Logout</span>';
    } else if(localStorage.lang === 'ar') {
        html.lang = 'ar';
        header.classList.replace('ltr-header', 'rtl-header');
        searchBox.placeholder = 'ماذا تنتظر؟ ابحث الآن ...';
        searchBox.title = 'كل ما تحتاجه هنا ، ابحث فقط';
        arabicLang.className = 'selected-language';
        englishLang.className = '';
        helloSpan.innerText = 'أهلاً';
        if(logName.dataset.login === 'false') {
            logName.innerText = 'عندك حساب؟';
        }
        greetingLogin.innerHTML = 'أكيد, <span>تسجيل الدخول</span>';
        greetingSignup.innerHTML = 'لأ, <span>أشترك الأن!!</span>';
        greetingLogout.innerHTML = '<span>تسجيل الخروج</span>';
    } else{
        html.lang = 'en';
        header.classList.replace('rtl-header', 'ltr-header');
        searchBox.placeholder = 'What are you waiting for? Search now ...';
        searchBox.title = 'All you need is here, just search';
        englishLang.className = 'selected-language';
        arabicLang.className = '';
        helloSpan.innerText = 'Hello';
        logName.innerText = 'Do you have an account?';
        greetingLogin.innerHTML = 'Yes, <span>Log in</span>';
        greetingSignup.innerHTML = 'No, <span>Sign Up!!</span>';
        greetingLogout.innerHTML = '<span>Logout</span>';
    }
}
