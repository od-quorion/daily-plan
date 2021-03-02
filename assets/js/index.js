let date = new Date();

let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

let tableRows = document.querySelectorAll("tbody tr");
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

    if(localStorage.getItem(checkBox.id)){
        checkBox.checked = localStorage.getItem(checkBox.id) == "true" ? true : false;
    }

});

let clearCheckBoxes = () => {
    checkBoxes.forEach(checkBox => {
        checkBox.checked = false;
        localStorage.removeItem(checkBox.id);
    });
}

if(localStorage.getItem("date")){
    let localDate = localStorage.getItem("date").split(".");
    let localYear = parseInt(localDate[2]);
    let localMonth = parseInt(localDate[1]);
    let localDay = parseInt(localDate[0]);

    if((localYear < year) || (localYear == year && localMonth < month) || (localYear == year && localMonth == month && localDay < day)){
        clearCheckBoxes();
        localStorage.setItem("date", `${day}.${month}.${year}`);
    }
}
else{
    localStorage.setItem("date", `${day}.${month}.${year}`);
}

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
    
    
    if(date.getTime() >= endTime.getTime()){
        let isCompleted = localStorage.getItem(row.children[3].children[0].id);
        if(isCompleted && isCompleted === "true"){
            row.classList.add("completed");
        }
        else{
            row.classList.add("timeup");
        }
        row.children[3].children[0].disabled = true;
        row.children[3].children[0].classList.add("ignore");
        row.classList.remove("active");
    }
    else if(date.getTime() < endTime.getTime() && date.getTime() >= beginTime.getTime()){
        row.classList.add("todo");
        row.children[3].children[0].disabled = false;
        row.children[3].children[0].classList.remove("ignore");
        row.classList.add("active");
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
    }
    else if(date.getTime() < beginTime.getTime()){
        row.children[3].children[0].disabled = true;
        row.children[3].children[0].classList.add("ignore");
        row.classList.remove("active");
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
    }
});

if (Notification.permission === 'granted') {
    let worker = new Worker("https://od-quorion.github.io/daily-plan/assets/js/worker.js");
    worker.postMessage(allJobs);

} else {
    Notification.requestPermission(permission => {
        if(permission === "granted"){
            let worker = new Worker("https://od-quorion.github.io/daily-plan/assets/js/worker.js");
            worker.postMessage(allJobs);
       }
    });
}