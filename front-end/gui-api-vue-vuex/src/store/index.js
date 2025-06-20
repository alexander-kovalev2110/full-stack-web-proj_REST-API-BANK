import { createStore } from "vuex"

import { alertModule } from "@/store/alertModule"
import { customerModule } from "@/store/customerModule"
import { transactionModule } from "@/store/transactionModule"

export default createStore({
    modules: {
        alertMod: alertModule,
        customerMod: customerModule,
        transMod: transactionModule,
    }
})
