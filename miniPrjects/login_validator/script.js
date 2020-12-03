const password = document.querySelector("#password");
const passwordError = document.querySelector(".password-error");
const confirmPassword = document.querySelector("#password2");
const confirmError = document.querySelector(".confirm-error");
const submit = document.querySelector(".submit");

function checkEmpty(input) {
    return input.trim() === "";
}

function checkUsername() {
    const username = document.querySelector("#username");
    const usernameError = document.querySelector(".username-error");
    const text = username.value;
    if (checkEmpty(text)) {
        usernameError.innerText = "유저 이름을 입력해주세요!";
        usernameError.classList.remove("success");
    }
    else if (!(text.length <= 6)) {
        usernameError.innerText = "유저 이름은 6글자 이하이여야 합니다!";
        usernameError.classList.remove("success");
    }
    else {
        usernameError.innerText = `✅ good!`;
        usernameError.classList.add("success");
    }
}


function checkEmail() {
    const email = document.querySelector("#email");
    const emailError = document.querySelector(".email-error");
    const text = email.value;
    if (checkEmpty(text)) {
        emailError.innerText = "Email을 입력해주세요!";
        emailError.classList.remove("success");
    }
    else if (!/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(text)) {
        emailError.innerText = "이메일 형식으로 작성해주세요.";
        emailError.classList.remove("success");
    }
    else if (!/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[g][m][a][i][l]*\.[a-zA-Z]{2,3}$/.test(text)) {
        emailError.innerText = "gmail만 가능합니다.";
        emailError.classList.remove("success");
    }
    else {
        emailError.innerText = `✅ good!`;
        emailError.classList.add("success");
    }
}

function checkPassword() {
    const text = password.value;
    if (checkEmpty(text)) {
        passwordError.innerText = "비밀번호를 입력해주세요!";
        passwordError.classList.remove("success");
    }
    else if (!(/[A-Z]/).test(text)) {
        passwordError.innerText = "최소 하나의 대문자를 작성해주세요!";
        passwordError.classList.remove("success");
    }
    else if (!(/\d/).test(text)) {
        passwordError.innerText = "최소 하나의 숫자를 작성해주세요!";
        passwordError.classList.remove("success");
    }
    else if (!(/[^a-zA-Z\d]/).test(text)) {
        passwordError.innerText = "최소 하나의 특수문자를 작성해주세요";
        passwordError.classList.remove("success");
    }
    else {
        passwordError.innerText = `✅ good!`;
        passwordError.classList.add("success");
        return password;
    }
}

function checkConfirm() {
    const text = password.value;
    const text2 = confirmPassword.value;
    if (checkEmpty(text2)) {
        confirmError.innerText = "확인용 비밀번호를 넣어주세요!";
        confirmError.classList.remove("success");
    }
    else {
        confirmError.innerText = `✅ good!`;
        confirmError.classList.add("success");
        checkPasswordMatch(text, text2);
    }
}

function checkPasswordMatch(password, confirm) {
    if (password !== confirm) {
        confirmError.innerText = "비밀번호가 일치하지 않습니다.";
        confirmError.classList.remove("success");
    }
    else {
        confirmError.innerText = `✅ good!`;
        confirmError.classList.add("success");
    }
}

function init() {
    username.addEventListener("input", checkUsername);
    email.addEventListener("input", checkEmail);
    password.addEventListener("input", checkPassword);
    confirmPassword.addEventListener("input", checkConfirm);
}


function handleSubmit(e) {
    e.preventDefault();
    checkUsername();
    checkEmail();
    checkPassword();
    checkConfirm();
}

submit.addEventListener("click", handleSubmit);


init();


