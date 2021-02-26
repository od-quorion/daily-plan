let date = new Date();

let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

let checkBoxes = document.querySelectorAll("input[type=checkbox]");

checkBoxes.forEach(checkBox => {
    checkBox.addEventListener("change", event => {
        let job = event.target.id;
        if(event.currentTarget.checked){
            localStorage.setItem(job, "true");
        }
        else{
            localStorage.setItem(job, "false");
        }
    });

});

let fillCheckBoxesFromLocalStorage = () =>{
    checkBoxes.forEach(checkBox => {
        if(localStorage.getItem(checkBox.id)){
            checkBox.checked = localStorage.getItem(checkBox.id) == "true" ? true : false;
        }
    });
}

fillCheckBoxesFromLocalStorage();

let clearCheckBoxes = () => {
    checkBoxes.forEach(checkBox => {
        checkBox.checked = false;
        localStorage.removeItem(checkBox.id);
    });
}

let clearNotifications = () =>{
    tableRows.forEach((_, index) => {
        localStorage.setItem(`${index + 1}.job`, "notShowed");
    });
};

if(localStorage.getItem("date")){
    let localDate = localStorage.getItem("date").split(".");
    let localYear = parseInt(localDate[2]);
    let localMonth = parseInt(localDate[1]);
    let localDay = parseInt(localDate[0]);

    if((localYear < year) || (localYear == year && localMonth < month) || (localYear == year && localMonth == month && localDay < day)){
        clearCheckBoxes();
        clearNotifications();
        localStorage.setItem("date", `${day}.${month}.${year}`);
    }
}
else{
    localStorage.setItem("date", `${day}.${month}.${year}`);
}

let tableRows = document.querySelectorAll("tbody tr");

let allJobs = [];

tableRows.forEach((row, index) => {

    let beginTime = row.children[1].innerHTML.split(":");
    let beginTimeHour = parseInt(beginTime[0]);
    let beginTimeMinute = parseInt(beginTime[1]);
   
    beginTime = new Date(year, month - 1, day, beginTimeHour, beginTimeMinute);

    let endTime = row.children[2].innerHTML.split(":");
    let endTimeHour = parseInt(endTime[0]);
    let endTimeMinute = parseInt(endTime[1]);
    
    endTime = new Date(year, month - 1, day, endTimeHour, endTimeMinute);
    
    allJobs.push({
        name : row.children[0].innerHTML,
        beginTime,
        endTime,
        beginTimeHour,
        beginTimeMinute,
        endTimeHour,
        endTimeMinute,
        isShowed : false
    });

    if(!localStorage.getItem(`${index + 1}.job`)){
        if(date.getTime() >= endTime.getTime()){
            localStorage.setItem(`${index + 1}.job`, "showed");
            allJobs[index].isShowed = true;
        }
        else if(date.getTime() < endTime.getTime() && date.getTime() >= beginTime.getTime()){
            localStorage.setItem(`${index + 1}.job`, "notShowed");
        }
        else if(date.getTime() < beginTime.getTime()){
            localStorage.setItem(`${index + 1}.job`, "notShowed");
        }
    }

    if(date.getTime() >= endTime.getTime()){
        row.classList.add("timeup");
        row.children[3].children[0].disabled = true;
        row.children[3].children[0].classList.add("ignore");
        row.classList.remove("active");
    }
    else if(date.getTime() < endTime.getTime() && date.getTime() >= beginTime.getTime()){
        row.classList.add("todo");
        row.children[3].children[0].disabled = false;
        row.children[3].children[0].classList.remove("ignore");
        row.classList.add("active");
    }
    else if(date.getTime() < beginTime.getTime()){
        row.children[3].children[0].disabled = true;
        row.children[3].children[0].classList.add("ignore");
        row.classList.remove("active");
    }
});

if (Notification.permission === 'granted') {
    let worker = new Worker("https://od-quorion.github.io/daily-plan/assets/js/worker.js");

    worker.postMessage(allJobs);

} else {
    Notification.requestPermission();
}

// else{
//     let permission = await Notification.requestPermission();
//     granted = permission === 'granted' ? true : false;
//     granted == true ? localStorage.setItem("notificationPermission", true) : localStorage.setItem("notificationPermission", false);
// }

// setInterval(() => {
//     (async () => {
//         // create and show the notification
//         const showNotification = () => {
//             // create a new notification
//             const notification = new Notification('JavaScript Notification API', {
//                 body: 'This is a JavaScript Notification API demo',
//                 icon: '../img/quorion_logo.svg'
//             });

//             // close the notification after 10 seconds
//             setTimeout(() => {
//                 notification.close();
//             }, 10 * 1000);

//             // navigate to a URL when clicked
//             notification.addEventListener('click', () => {

//                 window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
//             });
//         }

//         // // show an error message
//         // const showError = () => {
//         //     const error = document.querySelector('.error');
//         //     error.style.display = 'block';
//         //     error.textContent = 'You blocked the notifications';
//         // }

//         // check notification permission
        

        

//         //     let permission = await Notification.requestPermission();
//         //     console.log(permission);
//         //     granted = permission === 'granted' ? true : false;
//         //     console.log(Notification.permission);
//         // }

//         // show notification or error
//         // granted ? showNotification() : showError();

//     })();
// }, 300000);