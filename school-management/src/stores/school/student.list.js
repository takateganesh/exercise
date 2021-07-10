import { doFetchList,// doDeleteSelected 
} from '@/services/student.service'
import { getField, updateField } from 'vuex-map-fields';

export const studentList = {
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
        setList(state, list){
            state.list = list
        },
        setSchoolList(state, list){
            state.schoolList = list
        },
        deleteSelectedStudent(state, studId){
            let list = state.list.filter((c) => {
                if (studId !== c.id) {
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
        deleteSelected: async ({ commit },{id}) => {
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