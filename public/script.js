// public/script.js
var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
switch (month) {
  case 1:
    month = "January";
    break;
  case 2:
    month = "February";
    break;
  case 3:
    month = "March";
    break;
  case 4:
    month = "April";
    break;
  case 5:
    month = "May";
    break;
  case 6:
    month = "June";
    break;
  case 7:
    month = "July";
    break;
  case 8:
    month = "August";
    break;
  case 9:
    month = "September";
    break;
  case 10:
    month = "October";
    break;
  case 11:
    month = "November";
    break;
  case 12:
    month = "December";
    break;
}

var year = date.getFullYear();
document.getElementById('date').innerText = month + " " + day + ", " + year;

fetch('/newspapers')
  .then(response => response.json())
  .then(newspapers => {
    const newspapersContainer = document.getElementById('newspapers');
    newspapers.forEach(newspaper => {
      const newspaperElement = document.createElement('div');
const formattedDate = new Date(newspaper.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
newspaperElement.innerHTML = `<a onmousedown="
localStorage.setItem('newspaperUrl', '${newspaper.url}');
localStorage.setItem('newspaperTitle', '${newspaper.title}');
localStorage.setItem('newspaperDate', '${formattedDate}');
localStorage.setItem('newspaperDescription', '${newspaper.description}');
window.location.href = '/viewPaper/index.html';
">${newspaper.title}</a> Published ${formattedDate}<br><p class="newspaper-description">${newspaper.description}</p>`;
      newspapersContainer.appendChild(newspaperElement);
    });
  })
  .catch(error => {
    console.error('Error fetching newspapers:', error);
  });

document.getElementById('newspaperForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('titleInput').value;
  const url = document.getElementById('urlInput').value.replace('view?usp=sharing','preview');
  const description = document.getElementById('description').value;
  const newNewspaper = { title, url, description };
  try {
    const response = await fetch('/newspapers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNewspaper)
    });
    if (response.ok) {
    } else {
      console.error('Failed to add newspaper:', response.status);
    }
  } catch (error) {
    console.error('Error adding newspaper:', error);
  }
  window.location.reload();
});


if(localStorage.getItem('admin') == 'true') {
  document.getElementById('newspaperForm').style.display = 'block';
}
