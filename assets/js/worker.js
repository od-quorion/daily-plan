// let tableRows = document.querySelectorAll("tbody tr");

// let allJobs = [];

// tableRows.forEach((row, index) => {

//     let beginTime = row.children[1].innerHTML.split(":");
//     let beginTimeHour = parseInt(beginTime[0]);
//     let beginTimeMinute = parseInt(beginTime[1]);
   
//     beginTime = new Date(year, month - 1, day, beginTimeHour, beginTimeMinute);

//     let endTime = row.children[2].innerHTML.split(":");
//     let endTimeHour = parseInt(endTime[0]);
//     let endTimeMinute = parseInt(endTime[1]);
    
//     endTime = new Date(year, month - 1, day, endTimeHour, endTimeMinute);
    
//     allJobs.push({
//         name : row.children[0].innerHTML,
//         beginTime,
//         endTime,
//         beginTimeHour,
//         beginTimeMinute,
//         endTimeHour,
//         endTimeMinute,
//         isShowed : false
//     });
    
// });

// allJobs.forEach((job, index) =>{
//     if(localStorage.getItem(`${index + 1}.job`) === "notShowed"){
//         if(job.beginTime.getTime() <= date.getTime() && job.endTime.getTime() > date.getTime()){
//             const notification = new Notification('JavaScript Notification API', {
//                 body: `${job.name} Time`,
//                 icon: '../img/quorion_logo.svg'
//             });

//             setTimeout(() => {
//                 notification.close();
//             }, 10 * 1000);

//             notification.addEventListener('click', () => {
//                 window.open('https://od-quorion.github.io/daily-plan', '_blank');
//             });

//             localStorage.setItem(`${index + 1}.job`, "showed");
//         }
//     }
// });

self.onmessage = msg => {
    console.log(msg.data);
    console.log(msg);
};

// setInterval(() => {
//     allJobs.forEach((job, index) =>{
//         if(localStorage.getItem(`${index + 1}.job`) === "notShowed"){
//             if(job.beginTime.getTime() <= date.getTime() && job.endTime.getTime() > date.getTime()){
//                 const notification = new Notification('JavaScript Notification API', {
//                     body: `${job.name} Time`,
//                     icon: '../img/quorion_logo.svg'
//                 });

//                 setTimeout(() => {
//                     notification.close();
//                 }, 10 * 1000);

//                 notification.addEventListener('click', () => {
//                     window.open('https://od-quorion.github.io/daily-plan', '_blank');
//                 });

//                 localStorage.setItem(`${index + 1}.job`, "showed");
//             }
//         }
//     });
    
// }, 300000);