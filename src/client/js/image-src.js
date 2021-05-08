// Background texure image
import bodyBackground from '../assets/background.png';
// Arabic icon
import arabicFlagIcon from '../assets/icons/arabic-flag.svg';
// English icon
import englishFlagIcon from '../assets/icons/english-flag.svg';
// Logo
import logo from '../assets/Logo.png';
// Add favorite
import addFavoriteIcon from '../assets/icons/add-to-favorite.svg'
// Added favorite
import addedFavoriteIcon from '../assets/icons/added-to-favorite.svg'

// Main body container
const bodyContainer = document.getElementById('body');
bodyContainer.style.backgroundImage = `url(${bodyBackground})`;

// Languages Icons
// Arabic icon
const arabicFlagIconEl = document.getElementById('arabic_flag_icon');
arabicFlagIconEl.src = arabicFlagIcon;
// English icon
const englishFlagIconEl = document.getElementById('english_flag_icon');
englishFlagIconEl.src = englishFlagIcon;

// Logo
const logoTest = document.getElementsByClassName('logo-test')[0];
logoTest.src = logo;
/*const loadingLogo = document.getElementsByClassName('loading-logo')[0];
loadingLogo.src = logo;*/
const formLogo = document.getElementsByClassName('login-signup-form-logo')[0];
formLogo.src = logo;

setTimeout(() => {
    const addToFavoriteIcon = document.getElementById('add_to_favorite_icon');
    addToFavoriteIcon.src = addFavoriteIcon;
    const addedToFavoriteIcon = document.getElementById('added_to_favorite_icon');
    addedToFavoriteIcon.src = addedFavoriteIcon;
}, 5000)