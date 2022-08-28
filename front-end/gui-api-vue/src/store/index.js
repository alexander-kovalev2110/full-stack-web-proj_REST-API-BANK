import { createStore } from "vuex"
import { indexModule } from "@/store/indexModule"
import { apiModule } from "@/store/apiModule"
import { pageModule } from "@/store/pageModule"

export default createStore({
    modules: {
        indexMod: indexModule,
        apiMod: apiModule,
        pageMod: pageModule
    }
})
