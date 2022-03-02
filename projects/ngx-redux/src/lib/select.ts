import { SelectObservable } from './select_observable';
import { Observable } from "rxjs";
import { PathFunction, SelectContext } from "./models";


export function select<S, R>(this: SelectContext<S>, pathFunction: PathFunction<S, R>): Observable<R> {
  return new SelectObservable(this, pathFunction);
}

export function selectFromRootState<S, R>(this: SelectContext<S>, pathFunction: PathFunction<S, R>): Observable<R> {
  return new SelectObservable(this, pathFunction, false);
}
