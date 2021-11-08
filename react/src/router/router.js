import Auth from "../pages/Auth";
import RealizationAdd from "../pages/RealizationAdd";
import RealizationDetail from "../pages/RealizationDetail";
import Realizations from "../pages/Realizations";
import Productions from "../pages/Productions";
import ProductionAdd from "../pages/ProductionAdd";
import Reps from "../pages/Reps";
import Partners from "../pages/Partners";
import PartnerDetail from "../pages/PartnerDetail";
import StoreDetail from "../pages/StoreDetail";

// export const privateRoutes = [
//
// ]

export const publicRoutes = [
    {path: '/auth', component: Auth, exact: true},
    {path: '/realizations', component: Realizations, exact: true},
    {path: '/add-realization', component: RealizationAdd, exact: true},
    {path: '/realizations/:id', component: RealizationDetail, exact: true},

    {path: '/productions', component: Productions, exact: true},
    {path: '/add-production', component: ProductionAdd, exact: true},

    {path: '/reps', component: Reps, exact: true},

    {path: '/partners', component: Partners, exact: true},
    {path: '/partners/:id', component: PartnerDetail, exact: true},

    {path: '/store/:id', component: StoreDetail, exact: true},
]