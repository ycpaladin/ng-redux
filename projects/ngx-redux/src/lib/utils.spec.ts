import { isFunction, isPromise, getActionType, getModuleName } from './utils';

describe('Utils Function tests', () => {
  it('isFunction =>', () => {
    const fun = () => { };
    const result = isFunction(fun);
    expect(result).toBe(true);
  })

  it('isFunction =>', () => {
    const fun2 = function () {

    }
    const result = isFunction(fun2);
    expect(result).toBe(true);
  })

})
