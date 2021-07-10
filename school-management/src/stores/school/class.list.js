import {
    doFetchList, doFetchSchoolList,// doDeleteSelected 
} from '@/services/class.service'
import { getField, updateField } from 'vuex-map-fields';

export const classList = {
    namespaced: true,
    state: {
        list: [],
        schoolList: [],
        selected: [],
        inProgress: false,
        error: null
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
        inProgress(state, yesOrNo) {
            state.inProgress = yesOrNo
        },
        setList(state, list) {
            state.list = list
        },
        setSchoolList(state, list) {
            state.schoolList = list
        },
        deleteSelectedStudent(state, classId) {
            let list = state.list.filter((c) => {
                if (classId !== c.id) {
                    return c;
                }
            });
            state.list = list;
        }
    },
    actions: {
        fetchList: async ({ commit }) => {
            commit('inProgress', true);
            try {
                const list = await doFetchList();
                if (list) {
                    commit('setList', list);
                } else
                    commit('setList', []);

                return list;
            }
            finally {
                commit('inProgress', false);
            }
        },
        fetchSchoolList: async ({ commit }) => {
            commit('inProgress', true);
            try {
                const list = await doFetchSchoolList();
                if (list) {
                    commit('setSchoolList', list);
                } else
                    commit('setSchoolList', []);

                return list;
            }
            finally {
                commit('inProgress', false);
            }
        },
        deleteSelected: async ({ commit }, { id }) => {
            commit('inProgress', true);
            try {
                commit('deleteSelectedStudent', id);
                /*const list = await doDeleteSelected({id});
                    if (list) {
                       commit('setList', list);
                    } else
                        commit('setList', []);
                    
                   return list;*/
            }
            finally {
                commit('inProgress', false);
            }
        },
    },

}