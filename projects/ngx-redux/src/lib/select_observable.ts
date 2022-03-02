import { Observable } from 'rxjs';
import { PathFunction, SelectContext } from './models';

export class SelectObservable<R> extends Observable<R> {
  constructor(ctx: SelectContext<any>, pathFun: PathFunction<any, R>, fromModuleName: boolean = true) {
    super(subscribe => {
      let value: R;
      function getNewValue() {
        const state = fromModuleName ? ctx.store.getState()[ctx.module.name] : ctx.store.getState();
        const nextValue = pathFun(state as any);
        if (nextValue !== value) {
          value = nextValue;
          subscribe.next(value);
        }
      }

      getNewValue(); // 先执行一次
      const unListen = ctx.store.subscribe(() => {
        getNewValue(); // 发生变化再执行一次
      });
      return () => {
        unListen();
      }
    });
  }
}
