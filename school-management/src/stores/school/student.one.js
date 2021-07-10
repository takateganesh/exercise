import { doPostOne, doFetchOne } from '@/services/student.service';
import { getField, updateField } from 'vuex-map-fields';
export const studentOne = {
    namespaced: true,
    state: {
        one: {},
        inProgress: true,
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
        setOne(state, one) {
            state.one = one;
        },
        inProgress(state, yesOrNo) {
            state.inProgress = yesOrNo
        },
        setFetchedRecord(state, options) {
            let one = options.list.filter((c) => {
                if (c.id == options.studentId)
                    return c;
            });
            if (one.length) {
                state.one = one[0]
            } else
                state.one = []
        }
    },
    actions: {
        new({ commit }) {
            commit('inProgress', false);
            commit('setOne', {
                "rollno": "",
                "lastname": "",
                "middlename": "",
                "firstname": "",
                "dateOfJoining": ""
            });
        },
        fetchOne: async ({ commit, rootState, dispatch }, { studentId }) => {
            commit('inProgress', true);
            try {
                await dispatch('studentList/fetchList', {}, { root: true });
                const list = rootState.studentList.list;
                commit('setFetchedRecord', { list, studentId });
            }
            // eslint-disable-next-line no-useless-catch
            catch (err) {
                throw err;
            } finally {
                commit('inProgress', false);
            }
        },
        fetchRecordForView: async ({ commit, state, rootState, dispatch }, { studentId }) => {
            commit('inProgress', true);
            try {
                await dispatch('studentList/fetchList', {}, { root: true });
                const list = rootState.studentList.list;
                commit('setFetchedRecord', { list, studentId });
                let resp = await doFetchOne(state.one);
                commit('setOne', resp);
            }
            // eslint-disable-next-line no-useless-catch
            catch (err) {
                throw err;
            } finally {
                commit('inProgress', false);
            }
        },
        create: async ({ commit, state, dispatch, rootState }) => {
            commit('inProgress', true);
            try {
                if (undefined === state.one.id) {
                    await dispatch('studentList/fetchList', {}, { root: true });
                    let newstudentId = rootState.studentList.list ? rootState.studentList.list.length : 0;
                    const created = await doPostOne(Object.assign(state.one, { id: newstudentId + 1 }));
                    commit('setOne', (created));
                    return { new: true, resp: created };
                } else {
                    await doPostOne(state.one);
                    commit('inProgress', false);
                    return ({ update: true });
                }
            }
            // eslint-disable-next-line no-useless-catch
            catch (err) {
                throw err;
            } finally {
                commit('inProgress', false);
            }
        },
    },

}