//--------------Clock function---------------

//Find current month in numbers
function findCurMonth(month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
};

let is12h = false;

function loadPreferences () {
    const saved12h = localStorage.getItem('is12h');
    const savedMode = localStorage.getItem('savedMode');
    
    if(saved12h !== null) {
        is12h = JSON.parse(saved12h);
        document.getElementById('check12').checked = is12h;
    }
    if (savedMode !== null) {
        modeCheck(savedMode);
    }

}

// Update date
function updateDate() {
    let dat = String(new Date().getDate()).padStart(2, '0');
    let month = new Date().getMonth(); 
    let year = new Date().getFullYear();
    let monthNr = findCurMonth(month);
    
    let date = document.getElementById('date');
    date.innerText = `${dat} ${monthNr} ${year}`;
}

//Get digital time. pm, am.
function digitalClockTime() {
    let rawHour = new Date().getHours();
    let hour = String(rawHour).padStart(2, '0');
    let min = String(new Date().getMinutes()).padStart(2, '0');
    let sec = String(new Date().getSeconds()).padStart(2, '0');
    
    let digClock = document.getElementById('dig-clock');
    
    if(is12h) {
        let period = rawHour >= 12 ? 'pm' : 'am';

        const newHour = rawHour % 12 || 12;
        const newHourSt = String(newHour).padStart(2, '0');

        digClock.innerText = `${newHourSt}:${min}:${sec} ${period}`;

        
    } else {
        digClock.innerText = `${hour}:${min}:${sec}`;
    }
}



function analogClockTime() {
    let hour = new Date().getHours();
    let min = String(new Date().getMinutes()).padStart(2, '0');
    let sec = String(new Date().getSeconds()).padStart(2, '0');

    let anClockS = document.getElementById('sec-hand');
    const degreesS = sec * 6;
    anClockS.style.transform = `rotate(${degreesS}deg)`;
    
    let anClockM = document.getElementById('min-hand');
    const degreesM = min * 6;
    anClockM.style.transform = `rotate(${degreesM}deg)`;
    
    let anClockH = document.getElementById('hour-hand');
    const degreesH = (hour % 12) * 30 + (min / 60) * 30;
    anClockH.style.transform = `rotate(${degreesH}deg)`;
    
}

function updateTime() {
    digitalClockTime();
    analogClockTime();
}

//Get the full time
function update () {
    updateTime();
    updateDate();
}

//DG, AN, BOTH buttons
const clockControls = document.querySelector('.clock-controls')
const analogClock = document.querySelector('.analog');
const digitalClock = document.querySelector('.digital');

function modeCheck (mode) {
    if (mode === 'dg') {
        digitalClock.classList.remove('hidden');
        analogClock.classList.add('hidden');
        localStorage.setItem('savedMode', mode)
    } else if (mode === 'an') {
        analogClock.classList.remove('hidden');
        digitalClock.classList.add('hidden');            
        localStorage.setItem('savedMode', mode)
    } else if (mode === 'both') {
        analogClock.classList.remove('hidden');
        digitalClock.classList.remove('hidden');
        localStorage.setItem('savedMode', mode)
    }
}
clockControls.addEventListener('click', (e) => {
    const btnNv = e.target.closest('.btnNv');

    if (!btnNv) { return }

    const mode = btnNv.dataset.mode;
    modeCheck(mode);
})

loadPreferences(); // recover from local storage am or pm and bg, an or both
update();
//Update every second
const clockValue = setInterval(update, 1000);



//toggle 12h mode

const check12hContainer = document.querySelector('.check12h-container');

check12hContainer.addEventListener('change', (e) => {
    is12h = e.target.checked;

    localStorage.setItem('is12h', JSON.stringify(is12h));
    digitalClockTime();

})

// search
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchIcon');
const searchForm = document.querySelector('.search');

searchForm.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('#searchIcon')) {
        searchBar.classList.toggle('activeBar');
    }
})

















