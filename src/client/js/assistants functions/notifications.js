const notifications = (value, status, time=false) => {
    const notificationsContainer = document.getElementById('notifications');
    notificationsContainer.style.display = 'flex'
    const notifications = document.createElement('div');
    notifications.className = 'notifications';
    const notificationsData = document.createElement('span');
    notificationsData.innerText = value;
    notificationsData.className = 'notification-data';
    const notificationsIcon = document.createElement('div');
    notificationsIcon.className = 'notification-icon';
    if(status ===  'ok') {
        notificationsIcon.innerHTML = `
        <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
            <circle fill="#4CAF50" cx="24" cy="24" r="21"/>
            <polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"/>
        </svg>
        `
    } else if(status === 'warn') {
        notificationsIcon.innerHTML = `
        <svg width="1.8em" fill="rgb(255, 204, 0)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" enable-background="new 0 0 512 512" style="&#10;    width: 1em;&#10;">
            <path d="m507.641,431.876l-224-384.002c-5.734-9.828-16.258-15.875-27.641-15.875-11.383,0-21.906,6.047-27.641,15.875l-224,384.002c-5.773,9.898-5.813,22.125-0.109,32.063 5.711,9.938 16.289,16.063 27.75,16.063h448.001c11.461,0 22.039-6.125 27.75-16.063 5.703-9.938 5.664-22.165-0.11-32.063zm-251.641-15.878c-17.656,0-32-14.328-32-32 0-17.672 14.344-32 32-32 17.688,0 32,14.328 32,32 0,17.671-14.312,32-32,32zm32-127.998c0,17.672-14.328,32-32,32s-32-14.328-32-32v-96c0-17.672 14.328-32 32-32s32,14.328 32,32v96z"/>
        </svg>
        `
    } else if(status === 'error') {
        notificationsIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="640" height="640" viewBox="0 0 640 640">
            
            <defs>
                <style>
                .cls-1 {
                    fill: #226122;
                    filter: url(#filter);
                }

                .cls-2, .cls-4 {
                    fill: #fff;
                }

                .cls-3 {
                    fill: #0ec00e;
                    filter: url(#filter-2);
                }

                .cls-4 {
                    fill-rule: evenodd;
                }
                </style>
                <filter id="filter" x="6" y="6" width="628" height="628" filterUnits="userSpaceOnUse">
                <feFlood result="flood" flood-color="#b43a3a"/>
                <feComposite result="composite" operator="in" in2="SourceGraphic"/>
                <feBlend result="blend" in2="SourceGraphic"/>
                </filter>
                <filter id="filter-2" x="35" y="39" width="562" height="562" filterUnits="userSpaceOnUse">
                <feFlood result="flood" flood-color="#f55"/>
                <feComposite result="composite" operator="in" in2="SourceGraphic"/>
                <feBlend result="blend" in2="SourceGraphic"/>
                </filter>
            </defs>
            
            <circle id="Ellipse_1_Kopie" data-name="Ellipse 1 Kopie" class="cls-2" cx="317" cy="320" r="290"/>
            <circle id="Ellipse_1_Kopie_2" data-name="Ellipse 1 Kopie 2" class="cls-3" cx="316" cy="320" r="281"/>
            <path id="Rechteck_1" data-name="Rechteck 1" class="cls-4" d="M397.875,191.993l50.132,50.132-205.3,205.3L192.573,397.3Z"/>
            <path id="Rechteck_1_Kopie" data-name="Rechteck 1 Kopie" class="cls-4" d="M447.743,397.813l-50.194,50.194L191.993,242.451l50.194-50.194Z"/>
        </svg>
        `
    }

    let late = '10s';

    if(time) {
        late = time;
    }

    var numberPattern = /\d+/g;

    const timeLate = late.match( numberPattern )
    console.log(timeLate[0])

    notifications.style.transition = late;
    setTimeout( () => {
        setTimeout( () => {
            notifications.style.opacity = 0;
        }, 2000)

        setTimeout( () => {
            notifications.style.display = 'none';
            //notificationsContainer.style.display = 'none';
            notificationsContainer.firstElementChild.remove();
        }, timeLate[0] * 1000 )
    }, 1000 )
    notifications.append(notificationsData);
    notifications.append(notificationsIcon);
    notificationsContainer.append(notifications);
}

export default notifications;