function createCard(name, description, pictureUrl, startDate, endDate, location) {
  return `
    <div class="card shadow mb-5">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">${startDate} - ${endDate}</div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Figure out what to do when the response is bad
      throw new Error('Response not ok');
    } else {
      const data = await response.json();
      let j = 3;
      for (let conference of data.conferences) {
          const html = `<div class="card num${j}" aria-hidden="true">
          <div class="card-body">
            <h5 class="card-title placeholder-glow">
              Loading...
            </h5>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
          </div>
        </div>`

          const column = document.querySelector(`.col.num${j % 3}`);
          column.innerHTML += html;
          j++;
      }

      let i = 3;
      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const placeholder = document.querySelector(`.card.num${i}`);
          //placeholder.innerHTML = null
          placeholder.remove()

          const details = await detailResponse.json();
          console.log(details)
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;

          let startDate = details.conference.starts;
          let d1 = new Date(startDate)
          let newStartDate = (d1.getMonth()+1) + "/" + d1.getDate() + "/" + d1.getFullYear()

          let endDate = details.conference.ends;
          let d2 = new Date(endDate)
          let newEndDate = (d2.getMonth()+1) + "/" + d2.getDate() + "/" + d2.getFullYear()

          const location = details.conference.location.name

          const html = createCard(title, description, pictureUrl, newStartDate, newEndDate, location);

          let column = document.querySelector(`.col.num${i % 3}`);
          column.innerHTML += html;
          //let row = document.querySelector(`.card.num${i % 3}`);
          //console.log(row)
          //column.innerHTML = `<div class="col.num${i % 3}"></div>`;
          // row.innerHTML = "";
          //row.innerHTML += html;

          i++;
        }
      }

    }
  } catch (e) {
    // Figure out what to do if an error is raised
    console.error('error', e);
    const alertBox = document.getElementById('alert');
    let wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible" role="alert">There is an error.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    alertBox.append(wrapper);
  }

});