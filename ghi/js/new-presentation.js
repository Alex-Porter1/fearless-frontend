window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/'

        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const selectTag = document.getElementById('conference'); 
            
            for (let conference of data.conferences){
                let option = document.createElement("option");
                option.value = conference.href;
                option.innerHTML = conference.name;
                selectTag.appendChild(option);
            }
         
            const formTag = document.getElementById('create-presentation-form');
            formTag.addEventListener('submit', async event =>{
            event.preventDefault();
            
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
                const practiceID = selectTag.options[selectTag.selectedIndex];
                console.log("PRACTICEID:", practiceID);
                const conferenceId = selectTag.options[selectTag.selectedIndex].value;
                console.log(typeof(conferenceId))
                console.log("CONFERENCEID", conferenceId);
                const conferenceUrl = `http://localhost:8000${conferenceId}presentations/`;
                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const response = await fetch(conferenceUrl, fetchConfig);
                if (response.ok){
                    formTag.reset();
                }
        
        });
    }
});
