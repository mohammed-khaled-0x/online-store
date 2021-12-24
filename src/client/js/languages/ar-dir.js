const arabicDirection = () => {
    const header = document.getElementById('header');
    header.classList.replace('ltr-header', 'rtl-header');
    const searchBox = document.getElementById('search_box');
    searchBox.placeholder = 'ماذا تنتظر؟ ابحث الآن ...';
    searchBox.title = 'كل ما تحتاجه هنا ، ابحث فقط';
    const searchResultPlaceholder = document.querySelector('#search_result_placeholder');
    searchResultPlaceholder.innerText =  'إذا كنت تريد البحث عن أي شيء ، انظر هنا ، كل ما تريده في انتظارك الآن ، فماذا تنتظر؟';
    const helloSpan = document.querySelector('.hello');
    helloSpan.innerText = 'أهلاً';
    const logName = document.getElementById('log_name');
    if(logName.dataset.login === 'false') {
        logName.innerText = 'عندك حساب؟';
    }
}

export default arabicDirection;