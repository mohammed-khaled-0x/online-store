import bodyBackground from '../assets/background.png';
import egyptFlagIcon from '../assets/icons/egypt-flag.svg';
import englishFlagIcon from '../assets/icons/english-flag.svg';

//Background texure image
const bodyContainer = document.getElementById('body');
bodyContainer.style.backgroundImage = `url(${bodyBackground})`;

//Languages Icons
const egyptFlagIconEl = document.getElementById('egypt_flag_icon');
egyptFlagIconEl.src = egyptFlagIcon;
const englishFlagIconEl = document.getElementById('english_flag_icon');
englishFlagIconEl.src = englishFlagIcon;