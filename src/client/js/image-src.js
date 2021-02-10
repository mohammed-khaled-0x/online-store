import bodyBackground from '../media/background.png';
import egyptFlagIcon from '../media/icons/egypt-flag.svg';
import englishFlagIcon from '../media/icons/english-flag.svg';

//Background texure image
const body = document.body;
body.style.backgroundImage = `url(${bodyBackground})`;

//Languages Icons
const egyptFlagIconEl = document.getElementById('egypt_flag_icon');
egyptFlagIconEl.src = egyptFlagIcon;
const englishFlagIconEl = document.getElementById('english_flag_icon');
englishFlagIconEl.src = englishFlagIcon;