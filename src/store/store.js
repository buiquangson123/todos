import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { todoReducer } from "../reducers/index";
import { rootEpic } from "../middlewares/middleware";
import mesReducer from "../reducers/messeage";

const rootReducer = combineReducers({
  todo: todoReducer,
  message: mesReducer,
});

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
