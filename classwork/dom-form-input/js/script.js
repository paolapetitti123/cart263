let loginButton = document.getElementById(`login-button`);
let passwordInput = document.getElementById(`password-input`);
let slider = document.getElementById(`range-slider`);
let colorPicker = document.getElementById(`color-picker`);
let datePicker = document.getElementById(`date-picker`);

datePicker.addEventListener(`change`, function(event) {
    let date = event.target.value;
    alert(date);
});
