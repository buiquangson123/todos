import { combineEpics, ofType } from "redux-observable";
import { of, from, merge } from "rxjs";
import {
  map,
  switchMap,
  withLatestFrom,
  delay,
  takeUntil,
} from "rxjs/operators";
import {
  getTodos,
  createTodo,
  updateTodo,
  destroyTodo,
} from "../services/service";

import ConstantType from "../constants/constantType";
import { loadTodos, removeTodo, replaceTodo, addTodo } from "../actions/action";
import { showMessage } from "../reducers/messeage";

const { FETCH_TODOS, DELETE_TODO, TOGGLE_TODO, SAVE_TODO } = ConstantType;

export const fetchTodosEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_TODOS),
    switchMap(() => {
      const load$ = from(getTodos()).pipe(map(loadTodos), delay(2000));
      console.log(">>>check load: ", load$);
      const message$ = of(showMessage("Loading Todos...")).pipe(
        delay(1000),
        takeUntil(load$)
      );
      return merge(message$, load$);
    })
  );

export const saveTodoEpic = (action$) =>
  action$.pipe(
    ofType(SAVE_TODO),
    switchMap(({ payload }) => {
      const create$ = from(createTodo(payload)).pipe(
        map((res) => addTodo(res))
      );
      const message$ = of(showMessage("Saving todo")).pipe(
        delay(300),
        takeUntil(create$)
      );
      return merge(message$, create$);
    })
  );

export const toggleTodoEpic = (action$, state$) =>
  action$.pipe(
    ofType(TOGGLE_TODO),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const id = action.payload;
      const { todos } = state.todo;
      const todo = todos.find((t) => t.id === id);
      const toggled = { ...todo, isComplete: !todo.isComplete };
      const update$ = from(updateTodo(toggled)).pipe(map(replaceTodo));
      const message$ = of(showMessage("Saving todo update")).pipe(
        delay(300),
        takeUntil(update$)
      );
      return merge(update$, message$);
    })
  );

export const deleteTodoEpic = (action$) =>
  action$.pipe(
    ofType(DELETE_TODO),
    switchMap(({ payload }) => {
      const id = payload;
      const delete$ = from(destroyTodo(id)).pipe(map(() => removeTodo(id)));
      const message$ = of(showMessage("Removing Todo")).pipe(
        delay(300),
        takeUntil(delete$)
      );
      return merge(delete$, message$);
    })
  );

export const rootEpic = combineEpics(
  fetchTodosEpic,
  deleteTodoEpic,
  toggleTodoEpic,
  saveTodoEpic
);
