
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const popupImageSection = document.querySelector('.popup__image-section');

const profileForm = document.querySelector('div.popup__container form[name=form_edit]');
const nameInput = document.querySelector('form.popup__input-container input[name=firstname]');
const jobInput = document.querySelector('form.popup__input-container input[name=about]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupPhoto = document.querySelector('.popup__photo');
const popupCaption = document.querySelector('.popup__caption');

const cardTemplate = document.querySelector('#card_template').content;
const elements = document.querySelector('.elements');

const cardForm = document.querySelector('div.popup__container form[name=form_add]');
const pictureName = document.querySelector('form.popup__input-container input[name=picture_title]');
const pictureLink = document.querySelector('form.popup__input-container input[name=picture_link]');


//Открытие модальных окон
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
editButton.addEventListener ('click', () => {openPopup(profilePopup)});
addButton.addEventListener ('click', () => {openPopup(cardPopup)});


//Закрытие модальных окон
function closePopup() {
    popups.forEach((item) => {
        item.classList.remove('popup_opened');
    }); 
}
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener ('click', closePopup);
}); 


//Редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}
profileForm.addEventListener('submit', handleProfileFormSubmit);


//Открытие попапа с картинкой
function openImage(evt) {
    const cardElement = evt.target.closest('.element');
    const elementCaption = cardElement.querySelector('.element__caption');
    popupPhoto.setAttribute('src', evt.target.src);
    popupPhoto.setAttribute('alt', evt.target.alt);
    popupCaption.textContent = elementCaption.textContent;
    openPopup(popupImageSection)
}


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


function addCard(item) {
    const cardElement = createCard(item.name, item.link)
    elements.prepend(cardElement);
};
initialCards.forEach (addCard);


//Создание карточки
function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const elementPhoto = cardElement.querySelector('.element__photo');
    const elementCaption = cardElement.querySelector('.element__caption');
    elementPhoto.src = link;
    elementPhoto.alt = name;
    elementCaption.textContent = name;
    elementPhoto.addEventListener('click', openImage); 
    const likeButton = cardElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', likeCard);
    const deleteButton = cardElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    return cardElement
}


//Добавление карточки через попап
function handleCardFormFormSubmit(evt) {
    evt.preventDefault(); 
    const cardElement = createCard(pictureName.value, pictureLink.value)
    elements.prepend(cardElement);
    closePopup();
    pictureName.value = '';
    pictureLink.value = '';
}
cardForm.addEventListener('submit', handleCardFormFormSubmit);


//Лайк карточки
function likeCard(item) { 
    item.target.classList.toggle('element__like-button_active');
}


//Удаление карточки
function deleteCard(evt) {
    evt.target.closest('.element').remove();
}
