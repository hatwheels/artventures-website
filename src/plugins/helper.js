import Vue from 'vue';

let helper = new Vue({
    data () {
        return {
            artworkStates: {
                inprocess: "inprocess",
                approved: "approved",
                rejected: "rejected",
                frozen: "frozen",
                names: ["inprocess", "approved", "rejected", "frozen"],
                folders: ["/inprocess/", "/approved/", "/rejected/", "/frozen/"]
            },
        }
    },
    methods: {
        toPublicIdNoPath(publicId, artworkState) {
            let c = publicId.indexOf(artworkState);
            return c === -1 ? "" : publicId.slice(c).replace(artworkState, "");
        }
    }
})

export default {
    install: function (Vue) {
        Vue.prototype.$helper = helper
    }
}