export default {
    state: {
        downloadedLibrariesFrom: 0,
        libraries: [],
        librariesLength: 0,
        library: null,
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
         * 
         * @param {state} state 
         * @returns Получаем длину массива данных с бэкэенд
         */
        librariesLength: state => {
            return state.librariesLength
        },
        /**
         * Текущая выбранная библиотека
         * @param {state} state 
         * @returns Объект содержащий список библиотек, текущей выбранной библиотеке, отфильтрованного массива библиотек
         */
        currentLibrary: state => {
            return state.library
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
        updateLibrariesLength(state, length) {
            state.librariesLength = length
        },
        resetLibrariesList(state, obj) {
            state.libraries = obj.pack
            state.downloadedLibrariesFrom = obj.from
        },
        updateLibrary(state, lib) {
            state.library = lib
        },
        updateLibraryByCity(state, filteredByCity) {
            state.filtered = filteredByCity
        }
    },
    actions: {
        async fetchLibrariesList({ commit }, {city, position}) {
            try {
                const librariesList = await fetch("/mock/libraries.json");
                let res = await librariesList.json();
                if (city) {
                    res = res.filter((el) => el.data.general.locale.name.toLowerCase() === city.toLowerCase())
                }
                
                const packOfLibraries = res.slice(position, position + 10);
                const obj = {
                    pack: packOfLibraries,
                    from: position
                }
                commit('updateLibraries', obj)
                commit('updateLibrariesLength', res.length)
            }
            catch (e) {
                console.log('Error: ', e.message);
            }
            
        },
        async fetchLibrary({ commit }, id) {
            try {
                const librariesList = await fetch("/mock/libraries.json");
                const res = await librariesList.json()
                const currentLib = res.find((lib) => lib.data.general.id === +id)
                commit('updateLibrary', currentLib)
            }
            catch (e) {
                console.log('Error: ', e.message);
            }
            
        },

        async resetLibrariesList({ commit }, position) {
            try {
                const librariesList = await fetch("/mock/libraries.json");
                let res = await librariesList.json();
                const initialPackOfLibraries = res.slice(position, position + 10);
                const obj = {
                    pack: initialPackOfLibraries,
                    from: position
                }
                commit('resetLibrariesList', obj)
                commit('updateLibrariesLength', res.length)
            }
            catch (e) {
                console.log('Error: ', e.message);
            }
        }
    }
};