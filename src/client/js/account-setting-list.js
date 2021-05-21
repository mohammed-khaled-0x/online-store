const accountSettingContainer = document.getElementById('account_setting_container');

const accountSettingListContainer = document.getElementsByClassName('account-setting-list-container')[0];
const accountSettingList = document.getElementsByClassName('account-setting-list')[0];

accountSettingContainer.onmouseenter = () => {
    accountSettingListContainer.style.display = 'flex';
    accountSettingListContainer.style.opacity = '1';
    accountSettingList.style.display = 'flex';
    accountSettingList.style.opacity = '1';
    accountSettingList.style.top = '1.2em';
}

accountSettingContainer.onmouseleave = () => {
    accountSettingListContainer.style.display = 'none';
    accountSettingListContainer.style.opacity = '0';
    accountSettingList.style.display = 'none';
    accountSettingList.style.opacity = '0';
    accountSettingList.style.top = '2.2em';
}

const userAddressesName = document.getElementById('user_addresses_name');
const changePasswordName = document.getElementById('change_password_name');

const accountSettingBackground = document.getElementsByClassName('account-setting-background')[0];
const userAddressesCloseButton = document.getElementById('user_addresses_container_title_container').lastElementChild;
const changePasswordCloseButton = document.getElementById('change_password_container_title_container').lastElementChild;
const userAddressesContainer = document.getElementById('user_addresses_container');
const changePasswordContainer = document.getElementById('change_password_container');

userAddressesName.onclick = () => {
    accountSettingBackground.style.display = 'block';    
    userAddressesContainer.style.display = 'flex';

    setTimeout( () => {
        accountSettingBackground.style.opacity = '0.1';
        userAddressesContainer.style.opacity = '1';
    }, 2 )
}

accountSettingBackground.onclick = () => {
    accountSettingBackground.style.opacity = '0';
    userAddressesContainer.style.opacity = '0';
    changePasswordContainer.style.opacity = '0';

    setTimeout( () => {
        accountSettingBackground.style.display = 'none';
        userAddressesContainer.style.display = 'none';
        changePasswordContainer.style.display = 'none';
    }, 1000 )
}

changePasswordName.onclick = () => {
    accountSettingBackground.style.display = 'block';
    changePasswordContainer.style.display = 'flex';

    setTimeout( () => {
        accountSettingBackground.style.opacity = '0.1';
        changePasswordContainer.style.opacity = '1';
    }, 2 )
}

userAddressesCloseButton.onclick = () => {
    accountSettingBackground.style.opacity = '0';
    userAddressesContainer.style.opacity = '0';
    changePasswordContainer.style.opacity = '0';
    userAddressesCloseButton.style.animationName = 'close-button-spin';

    setTimeout( () => {
        accountSettingBackground.style.display = 'none';
        userAddressesContainer.style.display = 'none';
        changePasswordContainer.style.display = 'none';
        userAddressesCloseButton.style.animationName = '';
    }, 1000 )
}

changePasswordCloseButton.onclick = () => {
    accountSettingBackground.style.opacity = '0';
    userAddressesContainer.style.opacity = '0';
    changePasswordContainer.style.opacity = '0';
    changePasswordCloseButton.style.animationName = 'close-button-spin';

    setTimeout( () => {
        accountSettingBackground.style.display = 'none';
        userAddressesContainer.style.display = 'none';
        changePasswordContainer.style.display = 'none';
        changePasswordCloseButton.style.animationName = '';
    }, 1000 )
}