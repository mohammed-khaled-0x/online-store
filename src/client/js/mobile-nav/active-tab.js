const tabList = ['home_tab_btn', 'search_tab_btn', 'cart_tab_btn', 'avatar_tab_btn'];
const tabs = document.getElementsByTagName('svg');

const tabsColor = document.getElementsByClassName('gr-c');

const mobileSearch = document.getElementById('mobile_search');

for(let tabId of tabList) {
    const tab = document.getElementById(tabId);
    tab.onclick = () => {
        console.log(tab)
        for(let tabColor of tabsColor) {
            tabColor.style.stopColor = '#000 !important';
            tabColor.setAttribute('style', 'stop-color:#000 !important');
        }
        for(let tag of tab.children) {
            if(tag.tagName === 'linearGradient') {
                tag.children[0].style.stopColor = '#FDC830 !important';
                tag.children[0].setAttribute('style', 'stop-color:#FDC830 !important');
                tag.children[1].style.stopColor = '#F37335 !important';
                tag.children[1].setAttribute('style', 'stop-color:#F37335 !important');
            }
        }
        if(tab.id === 'search_tab_btn') {
            mobileSearch.style.display = 'flex';
            setTimeout( () => {
                mobileSearch.style.animationPlayState = 'reverse';
            }, 5)
        }
    }

}