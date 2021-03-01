self.onmessage = msg => {
    
    let date = new Date();
    
    msg.data.forEach(job => {
        if(job.isShowed === false && job.beginTime.getTime() <= date.getTime() && job.endTime.getTime() > date.getTime()){
            const notification = new Notification('Quorion Daily Plan', {
                body: `${job.name} Time`,
                icon: '../img/qback-logo.png',
                badge : '../img/qback-logo.png'
            });
            
            job.isShowed = true;
            
            setTimeout(() => {
                notification.close()
            }, 4000);

            notification.addEventListener('click', () => {
                window.open('https://od-quorion.github.io/daily-plan/', '_blank');
            });

            notification.addEventListener('close', () =>{
                notification.close();
            });
        }
    });

    setInterval(() => {
        let date = new Date();
        
        msg.data.forEach(job => {
            if(job.isShowed === false && job.beginTime.getTime() <= date.getTime() && job.endTime.getTime() > date.getTime()){
                const notification = new Notification('Quorion Daily Plan', {
                    body: `${job.name} Time`,
                    icon: '../img/qback-logo.png',
                    badge : '../img/qback-logo.png'
                });

                job.isShowed = true;
                
                setTimeout(() => {
                    notification.close()
                }, 4000);

                notification.addEventListener('click', () => {
                    window.open('https://od-quorion.github.io/daily-plan/', '_blank');
                });
    
                notification.addEventListener('close', () =>{
                    notification.close();
                });
            }
        });
    }, 15000);

};

