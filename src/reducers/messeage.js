import ConstantType from "../constants/constantType";

const { TODO_ADD, TODOS_LOAD, TODO_REPLACE, TODO_REMOVE } = ConstantType;

const MESSAGE_SHOW = "MESSAGE_SHOW";

export const showMessage = (msg) => ({ type: MESSAGE_SHOW, payload: msg });

const mesReducer = function (state = "", action) {
  switch (action.type) {
    case MESSAGE_SHOW:
      return action.payload;
    case TODO_ADD:
    case TODOS_LOAD:
    case TODO_REPLACE:
    case TODO_REMOVE:
      return "";
    default:
      return state;
  }
};

export default mesReducer;
