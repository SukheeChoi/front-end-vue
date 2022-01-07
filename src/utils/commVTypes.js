import utils from '@/utils/commUtils.js';

const numberTest = /^(\-)?\d{1,15}$/;
const telNoTest = /^\d{2,3}(\-)?\d{3,4}(\-)?\d{4}$/;
const timeTest = /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i;
const dateTest = /^(d{4})-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;

const LENGTH_MESSAGE = '{0} 길이는 {1}과 {2} 사이여야 합니다.';
const NUMBER_MESSAGE = '{0} 숫자만 입력할 수 있습니다.';

const ValidatorTypes = {
    lengthValidator(value, options) {
        return {
            isValid: value && value.length >= options.min && value.length <= options.max,
            message: utils.makeMsg(options.message, LENGTH_MESSAGE, [options.name, options.min, options.max])
        };
    },

    numberValidator(value, options) {
        return {
            isValid: numberTest.test(value),
            message: utils.makeMsg(options.message, NUMBER_MESSAGE, [options.name])
        };
    },

    rangeValidator(value, options) {
        return {
            isValid: value >= options.start && value <= options.end,
            message: utils.makeMsg(options.message, [options.name, options.start, options.end], "")
        };
    },

    presenceValidator(value, options) {
        return {
            isValid: value,
            message: options.message
        };
    },

    timeValidator(value, options) {
        return {
            isValid: timeTest.test(value),
            message: options.message
        };
    },

    dateValidator(value, options) {
        return {
            isValid: dateTest.test(value),
            message: options.message
        };
    },

    telNoValidator(value, options) {
        return {
            isValid: telNoTest.test(value),
            message: options.message
        };
    }
}

export default ValidatorTypes;
