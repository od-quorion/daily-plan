setInterval(() => {
    allJobs.forEach((job, index) =>{
        if(localStorage.getItem(`${index + 1}.job`) === "notShowed"){
            if(job.beginTime.getTime() <= date.getTime() && job.endTime.getTime() > date.getTime()){
                const notification = new Notification('JavaScript Notification API', {
                    body: `${job.name} Time`,
                    icon: '../img/quorion_logo.svg'
                });

                setTimeout(() => {
                    notification.close();
                }, 10 * 1000);

                notification.addEventListener('click', () => {
                    window.open('https://od-quorion.github.io/daily-plan', '_blank');
                });

                localStorage.setItem(`${index + 1}.job`, "showed");
            }
        }
    });
    
}, 300000);