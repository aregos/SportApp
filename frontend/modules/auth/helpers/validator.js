export default {
    emailValidator: (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    },
    nameValidator: (name) => {
        const regex = /\w{4,12}/;
        return regex.test(String(name).toLowerCase());
    },
    passwordValidator: (password) => {
        const regex = /\w{4,12}/;
        return regex.test(String(password).toLowerCase());
    }
};