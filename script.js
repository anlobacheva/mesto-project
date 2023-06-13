
//Открытие модальных окон
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');

editButton.addEventListener ('click', () => {popup[0].classList.add('popup_opened');});
addButton.addEventListener ('click', () => {popup[1].classList.add('popup_opened');});


//Закрытие модальных окон
const closeButton = document.querySelectorAll('.popup__close-button');
function closePopup() {
    popup.forEach((item) => {
        item.classList.remove('popup_opened');
    }); 
}
closeButton.forEach((closeButton) => {
    closeButton.addEventListener ('click', closePopup);
}); 

//Редактирование имени и информации о себе
const formElement = document.querySelector('div.popup__container form[name=form_edit]');
const nameInput = document.querySelector('form.popup__input-container input[name=firstname]');
const jobInput = document.querySelector('form.popup__input-container input[name=about]');

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__description');
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);


//Открытие попапа с картинкой
const elementPhoto = document.querySelectorAll('.element__photo');
const popupImageSection = document.querySelector('.popup__image-section');
const popupPhoto = document.querySelector('.popup__photo');
const popupCaption = document.querySelector('.popup__caption');

function openImage(evt) {
    const cardElement = evt.target.closest('.element');
    const elementCaption = cardElement.querySelector('.element__caption');
    popupPhoto.setAttribute('src', evt.target.src);
    popupPhoto.setAttribute('alt', evt.target.alt);
    popupCaption.textContent = elementCaption.textContent;
    popupImageSection.classList.add('popup_opened');
}
elementPhoto.forEach((item) => {
    item.addEventListener('click', openImage)
}); 


//Шесть карточек «из коробки»
const initialCards = [
    {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardTemplate = document.querySelector('#card_template').content;
const elements = document.querySelector('.elements');

function addCard(item) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__caption').textContent = item.name;
    cardElement.querySelector('.element__photo').src = item.link;
    cardElement.querySelector('.element__photo').alt = item.name;
    cardElement.querySelector('.element__photo').addEventListener('click', openImage); 
    elements.prepend(cardElement);
};
initialCards.forEach (addCard);


//Добавление карточки через попапа
const secondFormElement = document.querySelector('div.popup__container form[name=form_add]');
const pictureTitle = document.querySelector('form.popup__input-container input[name=picture_title]');
const pictureLink = document.querySelector('form.popup__input-container input[name=picture_link]');

function secondHandleFormSubmit(evt) {
    evt.preventDefault(); 
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__caption').textContent = pictureTitle.value;
    cardElement.querySelector('.element__photo').src = pictureLink.value;
    cardElement.querySelector('.element__photo').alt = pictureTitle.value;
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) { 
        evt.target.classList.toggle('element__like-button_active');
    });
    cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) { 
        evt.target.closest('.element').remove();
    });
    cardElement.querySelector('.element__photo').addEventListener('click', openImage); 
    elements.prepend(cardElement);
    closePopup();
}
secondFormElement.addEventListener('submit', secondHandleFormSubmit);


//Лайк карточки
const likeButton = document.querySelectorAll('.element__like-button');
function likeCard(evt) { 
    evt.target.classList.toggle('element__like-button_active');
}
likeButton.forEach((item) => {
    item.addEventListener('click', likeCard);
}); 


//Удаление карточки
const deleteButton = document.querySelectorAll('.element__delete-button');
function deleteCard(evt) {
    evt.target.closest('.element').remove();
}
deleteButton.forEach((item) => {
    item.addEventListener('click', deleteCard);
}); 
