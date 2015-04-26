Rock.utilities = {
    pad: function (number, chars, padding) {
        var str;
        padding || (padding = "0");
        str = String(number);
        if (str.length >= chars) {
            return str;
        }
        return new Array(chars - str.length + 1).join(padding) + str;
    },
    getRockDate: function (jsDate) {
        var day, month, year;
        if (!(jsDate instanceof Date)) {
            return null;
        }
        year = jsDate.getFullYear();
        month = this.pad(jsDate.getMonth() + 1, 2);
        day = this.pad(jsDate.getDate(), 2);
        return year + "-" + month + "-" + day + "T00:00:00";
    },
    getJavaScriptDate: function (rockDate) {
        var day, month, year;
        if (typeof rockDate !== "string") {
            return null;
        }
        year = Number(rockDate.substring(0, 4));
        month = Number(rockDate.substring(5, 7)) - 1;
        day = Number(rockDate.substring(8, 10));
        return new Date(year, month, day);
    },
    base64Encode: function (theString) {
        return new Buffer(theString).toString("base64");
    },
    makeNewGuid: function () {
        var guid, s4;
        s4 = function () {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };
        guid = "" + (s4()) + (s4()) + "-" + (s4()) + "-" + (s4()) + "-" + (s4()) + "-" + (s4()) + (s4()) + (s4());
        return guid.toUpperCase();
    }
};