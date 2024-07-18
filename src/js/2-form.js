'use strict';
const formData = {
  email: '',
  message: '',
};

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const getStoredData = (keyname = LOCAL_STORAGE_KEY) => {
  try {
    const storedFormData = JSON.parse(localStorage.getItem(keyname)) || {};
    return storedFormData;
  } catch (err) {
    return {};
  }
};

const isValidForm = formData => {
  for (const fieldName of Object.keys(formData)) {
    if (!formData[fieldName]) {
      return false;
    }
  }

  return true;
};

const preFillForm = (formElement, formData) => {
  if (formElement) {
    const elements = formElement.elements;
    const storedFormData = getStoredData();

    for (const element of elements) {
      if (Object.keys(formData).includes(element.name)) {
        const storedValue = storedFormData[element.name] || '';
        if (storedValue) {
          element.value = storedValue;
          formData[element.name] = storedValue;
        }
      }
    }
  }
};

const onSubmitHandler = formData => event => {
  event.preventDefault();
  if (!isValidForm(formData)) {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    event.target.reset();
  }
};

const onInputHandler = formData => event => {
  const storedFormData = getStoredData();
  if (Object.keys(formData).includes(event.target.name)) {
    storedFormData[event.target.name] = event.target.value;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedFormData));
    formData[event.target.name] = event.target.value;
  }
};

const feedbackForm = document.querySelector('.feedback-form');
preFillForm(feedbackForm, formData);

feedbackForm.addEventListener('input', onInputHandler(formData));
feedbackForm.addEventListener('submit', onSubmitHandler(formData));
