function createCard(title, name, description, pictureUrl, newStartDate, newEndDate) {
    return `
    <div class="col">
      <div class="card shadow p-3 mb-5 bg-white rounded">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <h5 class="card-subtitle mb-2 text-muted">${name}</h5>
            <p class="card-text fs-5">${description}</p>
            <div class="card-footer text-muted fs-5">${newStartDate} - ${newEndDate}</div>
            </div>
        </div>
    </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {
    
    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);
    
        if (!response.ok) {
          // Figure out what to do when the response is bad
        } else {
          const data = await response.json();
    
          for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
              const details = await detailResponse.json();
              const title = details.conference.name;
              const name = details.conference.location.name;
              const description = details.conference.description;
              const pictureUrl = details.conference.location.picture_url;
              let startDate = details.conference.starts;
                let d1 = new Date(startDate);
                let newStartDate = (d1.getMonth()+1) + "/" + d1.getDate() + "/" + d1.getFullYear();
              let endDate = details.conference.ends;
                let d2 = new Date(endDate);
                let newEndDate = (d2.getMonth()+1) + "/" + d2.getDate() + "/" + d2.getFullYear();
              const html = createCard(title, name, description, pictureUrl, newStartDate, newEndDate);
              const column = document.querySelector('.row');
              column.innerHTML += html;
            }
          }
    
        }
        
      } catch (e) {
        console.error(e);
      }
    
});

