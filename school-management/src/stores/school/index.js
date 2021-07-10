import Vue from 'vue';
import Vuex from 'vuex';

import { classList } from './class.list'
import { classOne } from './class.one'

import { studentList } from './student.list'
import { studentOne } from './student.one'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        classList,
        classOne,
        studentList,
        studentOne
    }
});