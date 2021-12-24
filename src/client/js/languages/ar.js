import labelsProducts from "../apis/labels-products";
import categories from '../apis/categories';
import currencies from "../apis/currencies";
import languageConverter from "./language-converter";
// Arabic language conatiner
const arabic = document.getElementById('arabic');
// English language conatiner
const english = document.getElementById('english');

const ar = () => {
    const arabicBtn = document.getElementById('arabic');
    arabicBtn.onclick = () => {
        const html = document.getElementsByTagName('html')[0];
        if(html.lang !== 'ar') {
            html.lang = 'ar';

            english.removeAttribute('class', 'title');
            arabic.className = 'selected-language';
            arabic.title = 'Selected Language';
    
            const categoryItems = document.getElementById('category_container');
            console.log(categoryItems)
            categoryItems.remove();
            const productsSection = document.getElementsByClassName('products-section');
            console.log(productsSection)
            for(let i = productsSection.length- 1; i >= 0; i--){
                productsSection[i].remove();
                console.log(i);
            }
            localStorage.setItem('lang', 'ar');
            labelsProducts(2, 'ar');
            categories('ar');
            currencies();
            languageConverter();
        }
    }
}

ar()

export default ar;