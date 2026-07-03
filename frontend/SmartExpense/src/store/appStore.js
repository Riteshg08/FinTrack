import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import dashboardReducer
    from "./dashboardSlice";
import incomeReducer
    from "./incomeSlice";
import expenseReducer
    from "./expenseSlice";
    import budgetReducer from "./budgetSlice";
    import analyticsReducer from "./analyticsSlice";


const appStore =
    configureStore({
        reducer: {
            user: userReducer,
            dashboard:
                dashboardReducer,
            income: incomeReducer,
            expense: expenseReducer,
             budget: budgetReducer,
             analytics: analyticsReducer
        },
    });

export default appStore;
