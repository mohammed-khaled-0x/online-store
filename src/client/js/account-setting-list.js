const accountSettingContainer = document.getElementById('account_setting_container');

const accountSettingListContainer = document.getElementsByClassName('account-setting-list-container')[0];
const accountSettingList = document.getElementsByClassName('account-setting-list')[0];

accountSettingContainer.onmouseenter = () => {
    accountSettingListContainer.style.display = 'flex';
    accountSettingListContainer.style.opacity = '1';
    accountSettingList.style.display = 'flex';
    accountSettingList.style.opacity = '1';
}

accountSettingContainer.onmouseleave = () => {
    accountSettingListContainer.style.display = 'none';
    accountSettingListContainer.style.opacity = '0';
    accountSettingList.style.display = 'none';
    accountSettingList.style.opacity = '0';
}

const userAddressesName = document.getElementById('user_addresses_name');

const accountSettingBackground = document.getElementsByClassName('account-setting-background')[0];
const userAddressesContainer = document.getElementById('user_addresses_container');

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
    
    setTimeout( () => {
        accountSettingBackground.style.display = 'none';
        userAddressesContainer.style.display = 'none';
    }, 1000 )
}