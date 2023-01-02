localStorage.clear();
const openEmailFormButton = document.querySelector('.contacts-card__button');
const emailModal = document.querySelector('.modal');
const closeEmailFormButton = emailModal.querySelector('.close-modal');
const emailForm = emailModal.querySelector('.email-form');
const userName = emailModal.querySelector('.user-name-input');
const userEmail = emailModal.querySelector('.user-email-input');
const userText = emailModal.querySelector('.user-text');

let isStorageSupport = true;
let storageName = '';
let storageEmail = '';

try {
  storageName = localStorage.getItem('userName');
  storageEmail = localStorage.getItem('userEmail');
} catch (err) {
  isStorageSupport = false;
}

openEmailFormButton.addEventListener('click', function (event) {
  event.preventDefault();
  emailModal.classList.add('modal_show');
  if (storageName && storageEmail) {
    userName.value = storageName;
    userEmail.value = storageEmail;
    userText.focus();
  } else {
    if (storageName) {
      userEmail.focus();
    } else {
      userName.focus();
    }
  } 
});

closeEmailFormButton.addEventListener('click', function (event) {
  event.preventDefault();
  emailModal.classList.remove('modal_show');
  emailModal.classList.remove("modal_error");
});

emailForm.addEventListener('submit', function (event) {
  if (!userEmail.value || !userText.value) {
    event.preventDefault();
    if (userName.value) {
      localStorage.setItem('userName', userName.value);
    }
    emailModal.classList.remove('modal_error');
    emailModal.offsetWidth = emailModal.offsetWidth;
    emailModal.classList.add('modal_error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('userName', userName.value);
      localStorage.setItem('userEmail', userEmail.value);
    }
  }
});

window.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    if (emailModal.classList.contains("modal_show")) {
      event.preventDefault();
      emailModal.classList.remove("modal_show");
      emailModal.classList.remove("modal_error");   
    }
  }
});

window.addEventListener('click', function (e) {
  const target = e.target;
  const itsEmailModal = target == emailModal || emailModal.contains(target);
  const itsOpenEmailFormButton = target == openEmailFormButton;
  const emailModalIsActive = emailModal.classList.contains('modal_show');
  if (!itsEmailModal && !itsOpenEmailFormButton && emailModalIsActive) {
    emailModal.classList.remove('modal_show');
    emailModal.classList.remove("modal_error");
  }
});