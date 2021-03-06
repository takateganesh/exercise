import { doPostOne, doFetchOne } from '@/services/class.service';
import { getField, updateField } from 'vuex-map-fields';
export const classOne = {
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
        setDataForNewRec(state, options) {
            state.one.id = options.id;
            if (state.one.students.length) {
                let studs = [];
                state.one.students.filter((s) => {
                    studs.push({
                        student_id: s.id,
                        assignment: ""
                    })
                });
                state.one.students = studs
            }
        },
        setFetchedRecord(state, options) {
            let one = options.list.filter((c) => {
                if (c.id == options.classId)
                    return c;
            });
            if (one.length) {
                let studs = []
                one[0].students.filter((s) => {
                    if (s.student_id)
                        studs.push(s.student_id);
                    else
                        studs.push(s);
                })
                one[0].students = studs;
                state.one = one[0]
            } else
                state.one = []
        }
    },
    actions: {
        new({ commit }) {
            commit('inProgress', false);
            commit('setOne', {
                "school_id": "",
                "students": [],
                "status": "",
            });
        },
        fetchOne: async ({ commit, rootState, dispatch }, { classId }) => {
            commit('inProgress', true);
            try {
                await dispatch('classList/fetchList', {}, { root: true });
                const list = rootState.classList.list;
                commit('setFetchedRecord', { list, classId });
            }
            // eslint-disable-next-line no-useless-catch
            catch (err) {
                throw err;
            } finally {
                commit('inProgress', false);
            }
        },
        fetchRecordForView: async ({ commit, state, rootState, dispatch }, { classId }) => {
            commit('inProgress', true);
            try {
                await dispatch('classList/fetchList', {}, { root: true });
                const list = rootState.classList.list;
                commit('setFetchedRecord', { list, classId });
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
                    await dispatch('classList/fetchList', {}, { root: true });
                    let newClassId = rootState.classList.list ? rootState.classList.list.length : 0;
                    commit('setDataForNewRec', { id: newClassId + 1 });
                    const created = await doPostOne((state.one));
                    commit('setOne', (created));
                    return { new: true, resp: created };
                } else {
                    commit('setDataForNewRec', { id: state.one.id });
                    await doPostOne((state.one));
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