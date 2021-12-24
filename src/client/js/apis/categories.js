import getCategory from './get-category';

// Categories List
const categoriesContainer = document.getElementById('categories');

const mainCategories = 'https://mystore9.herokuapp.com/products/categories/en';
const subCategories = 'https://mystore9.herokuapp.com/products/subcategories/en';

const getCategories = async (lang='en') => {
    // Store apis data of categories and subcategories
    let mainCategoriesItems, subCategoriesItems;

    // Fetch categories data and store it in $mainCategoriesItems variable
    await fetch(`https://mystore9.herokuapp.com/products/categories/${lang}`)
    .then(response => {
        if(response.statusText !== 'ok' || response.status !== 404) {
            const convertResponse = response.json();
            return convertResponse;
        } else {
            console.log('there is an error while fetching');
            const convertResponse = response.json();
            return convertResponse;
        }
    })
    .then(response => {
        return mainCategoriesItems = response;
    });

    // Fetch categories data and store it in $subCategoriesItems variable
    await fetch(`https://mystore9.herokuapp.com/products/subcategories/${lang}`)
    .then(response => {
        if(response.statusText !== 'ok' || response.status !== 404) {
            const convertResponse = response.json();
            return convertResponse;
        } else {
            console.log('there is an error while fetching');
            const convertResponse = response.json();
            return convertResponse;
        }
    })
    .then(response => {
        return subCategoriesItems = response;
    });

    // Categories container
    const categoriesList = document.createElement('ul');
    categoriesList.id = "category_container";
    console.log(mainCategoriesItems);
    for(let category of mainCategoriesItems) {
        // Category item
        const categoryItem = document.createElement('li');
        const categoryItemName = document.createElement('span');
        categoryItemName.innerText = category.name;
        categoryItemName.className = "category-item-name";
        categoryItemName.dataset.categoryId = category.id;

        categoryItemName.onclick = () => {
            if(localStorage.currencyId) {
                getCategory(category.id, category.name, 'categories', localStorage.currencyId);
            } else {
                getCategory(category.id, category.name, 'categories', 1);
            }
        }

        categoryItem.className = "category-item";
        categoryItem.dataset.categoryName = category.name;
        const categoryItemBackground = document.createElement('div');
        categoryItemBackground.className = 'category-item-background';

        categoryItemBackground.onclick = () => {
            if(localStorage.currencyId) {
                getCategory(category.id, category.name, 'categories', localStorage.currencyId);
            } else {
                getCategory(category.id, category.name, 'categories', 1);
            }
        }
        
        categoryItem.append(categoryItemName);
        categoryItem.append(categoryItemBackground);
        categoriesList.append(categoryItem);

        // Subcategories container
        const subCategoriesList = document.createElement('ul');
        subCategoriesList.className = "subcategory-container";

        const subCategoryTitle = document.createElement('h4');
        subCategoryTitle.innerText = category.name;
        subCategoryTitle.className = 'sub-category-title';
        subCategoriesList.append(subCategoryTitle);

        for(let subCategory of subCategoriesItems) {

            if(category.name === subCategory['category_name']) {
                // Subcategory item
                const subCategoryItem = document.createElement('li');
                const subCategoryItemName = document.createElement('span');
                subCategoryItemName.innerText = subCategory.name;
                subCategoryItemName.className = "subcategory-item-name";

                subCategoryItemName.onclick = () => {
                    if(localStorage.currencyId) {
                        getCategory(subCategory.id, subCategory.name, 'subcategories', localStorage.currencyId);
                    } else {
                        getCategory(subCategory.id, subCategory.name, 'subcategories', 1);
                    }
                }

                subCategoryItem.className = "subcategory-item";
                const subCategoryItemBackground = document.createElement('div');
                subCategoryItemBackground.className = 'subcategory-item-background';

                subCategoryItemBackground.onclick = () => {
                    if(localStorage.currencyId) {
                        getCategory(subCategory.id, subCategory.name, 'subcategories', localStorage.currencyId);
                    } else {
                        getCategory(subCategory.id, subCategory.name, 'subcategories', 1);
                    }
                }

                subCategoryItem.append(subCategoryItemName);
                subCategoryItem.append(subCategoryItemBackground);
                subCategoriesList.append(subCategoryItem);
                categoryItem.append(subCategoriesList);
            }
        }
    }

    categoriesContainer.append(categoriesList);

    const others = () => {
        let othersCategoriesItems = [];
        let check = false;
        const totalCategoriesItems = document.getElementById('category_container');

        for(let category in totalCategoriesItems.children) {
            const mainCategories = document.getElementById('categories');
            const mainCategoriesBounding = mainCategories.getBoundingClientRect();
            const categoriesContainer = document.getElementById('category_container');
            const categoriesContainerBounding = categoriesContainer.getBoundingClientRect();
            if(mainCategoriesBounding.bottom < categoriesContainerBounding.bottom || mainCategoriesBounding.clientHeight < categoriesContainer.clientHeight) {
                check = true;
                othersCategoriesItems.push(categoriesContainer.lastElementChild);
                categoriesContainer.lastElementChild.remove()
            } else {
                if(check) {
                    const newCategoryItem = document.getElementById('category_container')
                    othersCategoriesItems.unshift(categoriesContainer.lastElementChild)
                    newCategoryItem.lastElementChild.remove()

                    const categoryItem = document.createElement('li');
                    const categoryItemName = document.createElement('span');
                    categoryItemName.innerText = 'Others';
                    categoryItemName.className = "category-item-name";
                    categoryItem.className = "category-item other-items";
                    const categoryItemBackground = document.createElement('div');
                    categoryItemBackground.className = 'category-item-background';
                    categoryItem.append(categoryItemName);
                    categoryItem.append(categoryItemBackground);

                    const subCategoriesList = document.createElement('ul');
                    subCategoriesList.className = "subcategory-container";

                    const subCategoryTitle = document.createElement('h4');
                    subCategoryTitle.innerText = 'Others';
                    subCategoryTitle.className = 'sub-category-title';
                    subCategoriesList.append(subCategoryTitle);

                    for(let othersCategoryItem of othersCategoriesItems) { 
                        othersCategoryItem.className = 'subcategory-item';
                        othersCategoryItem.children[0].className = 'subcategory-item-name';
                        othersCategoryItem.children[1].className = 'subcategory-item-background';
                        /*if(othersCategoryItem.children[2]) {
                            othersCategoryItem.children[2].className = 'other-subcategory-container';
                        }*/
                        subCategoriesList.append(othersCategoryItem);
                    }
                    categoryItem.append(subCategoriesList);
                    newCategoryItem.append(categoryItem);
                }
                break;
            }
        }
        
    }
    others();

    const styleNewCategories = () => {
        const categories = document.getElementById('category_container');
        categories.style.height = 'calc(100% - 2em)';
        categories.style.display = 'flex';
        categories.style.justifyContent = 'center';
        categories.style.alignItems = 'center';
        categories.style.flexDirection = 'column';
    }
    styleNewCategories();

    const categoryItems = document.getElementsByClassName('category-item');
    for(let categoryItem of categoryItems) {
        categoryItem.onmouseenter = () => {
            if(categoryItem.childElementCount === 3) {
                categoryItem.lastElementChild.style.display = 'block';
                setTimeout( () => {
                    categoryItem.lastElementChild.style.opacity = 1;
                }, 10)
            }
        }
        categoryItem.onmouseleave = () => {
            if(categoryItem.childElementCount === 3) {
                categoryItem.lastElementChild.style.display = 'none';
                categoryItem.lastElementChild.style.opacity = 0;
            }
        }
    }
    /*const otherCategoryItems = document.getElementsByClassName('subcategory-item');
    for(let item of otherCategoryItems) {
        item.onmouseenter = () => {
            if(item.childElementCount === 3) {
                item.lastElementChild.style.display = 'block';
                setTimeout( () => {
                    item.lastElementChild.style.opacity = 1;
                }, 10)
            }
        }
        item.onmouseleave = () => {
            if(item.childElementCount === 3) {
                item.lastElementChild.style.display = 'none';
                item.lastElementChild.style.opacity = 0;
            }
        }
    }*/
};

getCategories()

export default getCategories;