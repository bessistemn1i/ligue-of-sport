export default {
    state: {
        libraries: []
    },
    getters: {
        librariesList: state => {
            return state.libraries;
        }
    },
    mutations: {
        updateLibraries(state, libraries) {
            state.libraries = libraries;
        }
    },
    actions: {
        async fetchLibrariesList(ctx) {
            const librariesList = await fetch("/mock/libraries.json");
            const res = await librariesList.json()
            const packOfLibraries = res.slice(0, 10);
            console.log(packOfLibraries);
            ctx.commit('updateLibraries', packOfLibraries)
        }
    }
};