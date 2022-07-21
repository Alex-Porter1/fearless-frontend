window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
    const divTag = document.getElementById('loading-conference-spinner');
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
  
      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
      divTag.classList.add("d-none");
      selectTag.classList.remove('d-none');

      console.log(data);
        
        const formTag = document.getElementById('create-attendee-form');
        formTag.addEventListener('submit', async event => {
        const successTag = document.getElementById('success-message');
        event.preventDefault(); 
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
            const attendeeUrl = 'http://localhost:8001/api/attendees/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(attendeeUrl, fetchConfig);
            if (response.ok) {
                formTag.classList.add('d-none');
                successTag.classList.remove('d-none');
                const newAttendee = await response.json();
                console.log(newAttendee);
            }
        });
      
    }
  
  });