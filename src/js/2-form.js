const onSubmitHandler = fields => event => {
  event.preventDefault();
  const { elements } = event.target;
  let isRequiredError = false;
  const data = {};

  for (const field of fields) {
    for (const element of elements) {
      if (element.name === field.name) {
        const formattedValue = element.value.trim();
        data[element.name] = formattedValue;

        if (field.required && !formattedValue) {
          isRequiredError = true;
        }
      }
    }
  }

  if (isRequiredError) {
    alert('All form fields must be filled in');
  } else {
    event.target.reset();
    console.log(data);
  }
};

const formEl = document.querySelector('.login-form');
const fields = [
  { name: 'email', required: true },
  { name: 'password', required: true },
];
formEl.addEventListener('submit', onSubmitHandler(fields));
