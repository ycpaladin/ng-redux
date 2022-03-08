import { StateModule } from "./models";
import { getActionType } from "./utils";

/**
 * 把 module 上的actions所有的方法挂到`NgxReduxStore`上
 * @param this `NgxReduxStore`
 * @param module
 */
export function mapActions<S>(this: { [key: string]: any }, module: StateModule<S>) {
  Object.keys(module.actions).forEach((key) => {
    this[key] = (...rest: any[]) => {
      const actionType = getActionType(module.name, key);
      this.dispatch({
        type: actionType,
        ...rest
      })
    }
  })
}
