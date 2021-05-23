export default {
    state: {
        libraries: [],
        library: null,
        filtered: []
    },
    getters: {
        /**
         * Список библиотек
         * @param {state} state 
         * @returns Объект содержащий список библиотек, текущей выбранной библиотеке, отфильтрованного массива библиотек
         */
        librariesList: state => {
            return state.libraries;
        },
        /**
         * Текущая выбранная библиотека
         * @param {state} state 
         * @returns Объект содержащий список библиотек, текущей выбранной библиотеке, отфильтрованного массива библиотек
         */
        currentLibrary: state => {
            return state.library
        },
        /**
         * Отфильтрованный массив библиотек
         * @param {state} state 
         * @returns Объект содержащий список библиотек, текущей выбранной библиотеке, отфильтрованного массива библиотек
         */
        filteredLibs: state => {
            return state.filtered
        }
    },
    mutations: {
        updateLibraries(state, libraries) {
            state.libraries = libraries;
        },
        updateLibrary(state, lib) {
            state.library = lib
        },
        updateLibraryByCity(state, filteredByCity) {
            state.filtered = filteredByCity
        },
        resetFilters(state) {
            state.filtered = []
        }
    },
    actions: {
        async fetchLibrariesList({commit}) {
            const librariesList = await fetch("/mock/libraries.json");
            const res = await librariesList.json()
            const packOfLibraries = res.slice(0, 15);
            commit('updateLibraries', packOfLibraries)
        },
        async fetchLibrary({ commit }, id) {
            const librariesList = await fetch("/mock/libraries.json");
            const res = await librariesList.json()
            const currentLib = res.find((lib) => lib.data.general.id === +id)
            commit('updateLibrary', currentLib)
        },
        async filterByCity({ commit }, obj) {
            const libs = obj.libs;
            const result = libs.filter((el) => el.data.general.locale.name === obj.city);
            commit('updateLibraryByCity', result)
        },
        async resetFilters({ commit }) {
            commit('resetFilters')
        }
    }
};