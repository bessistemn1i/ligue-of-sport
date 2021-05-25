export default {
    state: {
        downloadedLibrariesFrom: 0,
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
        },
        downloadPosition: state => {
            return state.downloadedLibrariesFrom
        }
    },
    mutations: {
        updateLibraries(state, obj) {
            state.libraries = [...state.libraries, ...obj.pack];
            state.downloadedLibrariesFrom = obj.from
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
        async fetchLibrariesList({ commit }, from = 0) {
            console.log(from);
            const librariesList = await fetch("/mock/libraries.json");
            const res = await librariesList.json()
            const packOfLibraries = res.slice(from, from + 10);
            const obj = {
                pack: packOfLibraries,
                from
            }
            commit('updateLibraries', obj)
        },
        async fetchLibrary({ commit }, id) {
            const librariesList = await fetch("/mock/libraries.json");
            const res = await librariesList.json()
            const currentLib = res.find((lib) => lib.data.general.id === +id)
            commit('updateLibrary', currentLib)
        },
        async filterByCity({ commit }, obj) {
            const libs = obj.libs;
            const result = libs.filter((el) => (el.data.general.locale.name).toLowerCase().indexOf(obj.city.toLowerCase()) >= 0);
            console.log(obj.city, result);
            commit('updateLibraryByCity', result)
        },
        async resetFilters({ commit }) {
            commit('resetFilters')
        }
    }
};