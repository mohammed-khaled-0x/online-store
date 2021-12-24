import labelsProducts from "../apis/labels-products";
import categories from '../apis/categories';
import currencies from "../apis/currencies";
import languageConverter from "./language-converter";
// Arabic language conatiner
const arabic = document.getElementById('arabic');
// English language conatiner
const english = document.getElementById('english');

const en = () => {
    const englishBtn = document.getElementById('english');
    englishBtn.onclick = () => {
        const html = document.getElementsByTagName('html')[0];
        if(html.lang !== 'en') {
            html.lang = 'en';
    
            arabic.removeAttribute('class', 'title');
            english.className = 'selected-language';
            english.title = 'Selected Language';
    
            const productsSection = document.getElementsByClassName('products-section');
            const categoryItems = document.getElementById('category_container');
            categoryItems.remove();
            console.log(productsSection)
            for(let i = productsSection.length- 1; i >= 0; i--){
                productsSection[i].remove();
                console.log(i);
            }
            localStorage.setItem('lang', 'en');
            labelsProducts(2, 'en');
            categories('en');
            currencies();
            languageConverter();
        }
    }
   
}

en()

export default en;