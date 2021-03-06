"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = exports.phone = exports.word = void 0;
var iterator_1 = require("../array/iterator");
function word(min, max) {
    if (min === void 0) { min = 2; }
    if (max === void 0) { max = 15; }
    var vowels = iterator_1.createIterator("aeiouy".split(""), { loop: true, random: true });
    var consonants = iterator_1.createIterator("bcdfghjklmnpqrstvwxz".split(''), { loop: true, random: true });
    var length = min + (Math.random() * (max - min));
    var isVowel = 0;
    var isConsonant = 0;
    function generate(letters, word, is_vowels) {
        if (is_vowels === void 0) { is_vowels = false; }
        var l = letters.next().value;
        if (is_vowels) {
            isVowel++;
        }
        else {
            isConsonant++;
        }
        if (isVowel >= 2) {
            isVowel = 0;
            letters = consonants;
            is_vowels = false;
        }
        if (isConsonant >= 2) {
            isConsonant = 0;
            letters = vowels;
            is_vowels = true;
        }
        word += l;
        return word.length >= length ? word : generate(letters, word, is_vowels);
    }
    return generate(Math.random() > 0.5 ? vowels : consonants, "");
}
exports.word = word;
function phone() {
    var numbers = iterator_1.createIterator("0123456789".split(''), { loop: true, random: true });
    var p = iterator_1.createIterator("123456789".split(''), { loop: true, random: true });
    var phone = [p.next().value];
    for (var i = 0; i < 4; i++) {
        phone.push([numbers.next().value, numbers.next().value].join(''));
    }
    var prefix = '+';
    var count = 2 + Math.floor(Math.random() * 3);
    for (var j = 0; j < count; j++) {
        prefix += numbers.next().value;
    }
    return prefix + '(0)' + phone.join(' ');
}
exports.phone = phone;
/**
* Generate version from datetime
*/
function date(pretty) {
    if (pretty === void 0) { pretty = false; }
    var now = new Date();
    var date = now.getDate().toString().padStart(2, "0");
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var year = now.getFullYear().toString().padStart(4, "0");
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    if (pretty) {
        return year + "-" + month + "-" + date + "_" + hours + "-" + minutes + "-" + seconds;
    }
    return "" + year + month + date + hours + minutes + seconds;
}
exports.date = date;
