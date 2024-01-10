import { createStore } from "vuex"
// import { indexModule } from "@/store/indexModule"
import { customerModule } from "@/store/customerModule"
import { transactionModule } from "@/store/transactionModule"
import { pageModule } from "@/store/pageModule"

export default createStore({
    modules: {
        // indexMod: indexModule,
        customerMod: customerModule,
        transMod: transactionModule,
        pageMod: pageModule
    }
})
