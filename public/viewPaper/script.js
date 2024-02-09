document.getElementById('newspaperView').src = localStorage.getItem('newspaperUrl');

document.getElementById('title').innerHTML = localStorage.getItem('newspaperTitle');
document.getElementById('description').innerHTML = localStorage.getItem('newspaperDescription');
document.getElementById('datePublished').innerHTML = "Published " + localStorage.getItem('newspaperDate');

document.querySelector('.header h1').onmousedown = function(e) {
  window.location.href = '/index.html';
}
