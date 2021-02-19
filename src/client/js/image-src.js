import bodyBackground from '../assets/background.png';
import egyptFlagIcon from '../assets/icons/egypt-flag.svg';
import englishFlagIcon from '../assets/icons/english-flag.svg';
import logo from '../assets/Logo.png';
//Background texure image
const bodyContainer = document.getElementById('body');
bodyContainer.style.backgroundImage = `url(${bodyBackground})`;

//Languages Icons
const egyptFlagIconEl = document.getElementById('egypt_flag_icon');
egyptFlagIconEl.src = egyptFlagIcon;
const englishFlagIconEl = document.getElementById('english_flag_icon');
englishFlagIconEl.src = englishFlagIcon;

//Logo
const logoTest = document.getElementsByClassName('logo-test')[0];
logoTest.src = logo;
const loadingLogo = document.getElementsByClassName('loading-logo')[0];
loadingLogo.src = logo;
const formLogo = document.getElementsByClassName('login-signup-form-logo')[0];
formLogo.src = logo;