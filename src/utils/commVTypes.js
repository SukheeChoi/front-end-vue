import utils from '@/utils/commUtils.js';
import { useI18n } from 'vue-i18n';

const numberTest = /^(\-)?\d{1,15}$/;
const telNoTest = /^\d{2,3}(\-)?\d{3,4}(\-)?\d{4}$/;
const timeTest = /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i;
const dateTest = /^(d{4})-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;

const ValidatorTypes = {
    lengthValidator(value, options) {
        return {
            isValid: value && value.length >= options.min && value.length <= options.max,
            message: utils.makeMsg(options.message, useI18n('valid.length'), [options.name, options.min, options.max, value.length])
        };
    },

    numberValidator(value, options) {
        return {
            isValid: numberTest.test(value),
            message: utils.makeMsg(options.message, useI18n('valid.number'), [options.name])
        };
    },

    rangeValidator(value, options) {
        return {
            isValid: value >= options.start && value <= options.end,
            message: utils.makeMsg(options.message, useI18n('valid.range'), [options.name, options.start, options.end])
        };
    },

    presenceValidator(value, options) {
        return {
            isValid: value && value.length > 0,
            message: utils.makeMsg(options.message, useI18n('valid.presence'), [options.name])
        };
    },

    timeValidator(value, options) {
        return {
            isValid: timeTest.test(value),
            message: utils.makeMsg(options.message, useI18n('time.presence'), [options.name])
        };
    },

    dateValidator(value, options) {
        return {
            isValid: dateTest.test(value),
            message: utils.makeMsg(options.message, useI18n('date.presence'), [options.name])
        };
    },

    telNoValidator(value, options) {
        return {
            isValid: telNoTest.test(value),
            message: utils.makeMsg(options.message, useI18n('telNo.presence'), [options.name])
        };
    }
}

export default ValidatorTypes;
