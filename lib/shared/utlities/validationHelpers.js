Apollos.validate = {
    isEmail: function (str) {
        return Apollos.regex.email.test(str);
    },
    isBcryptHash: function (str) {
        return Apollos.regex.bcrypt.test(str);
    },
    isGuid: function (str) {
        return Apollos.regex.guid.test(str);
    },
    isPhoneNumber: function (str) {
        return Apollos.regex.phoneNumber.test(str);
    }
};