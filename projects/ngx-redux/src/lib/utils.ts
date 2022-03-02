const regx = /^\[([a-zA-Z0-9]{0,})\]/;

export const isFunction = (obj: any): obj is Function => {
  return typeof obj === 'function';
}

export const isPromise = (obj: any): obj is Promise<any> => {
  if (obj && isFunction(obj.then)) {
    return true;
  }
  return false;
}


const camelStrReplaceEmptyString = (str: string) => {
  return str.replace(/[A-Z]/g, s => ` ${s.toLowerCase()}`)
}

export const getActionType = (moduleName: string, fnOrName: Function | string) => {
  if (isFunction(fnOrName)) {
    return `[${moduleName}] ${camelStrReplaceEmptyString(fnOrName.name)}`
  } else {
    return `[${moduleName}] ${camelStrReplaceEmptyString(fnOrName)}`
  }
};

export const getModuleName = (actionType: string) => {
  const [, moduleName] = actionType.toLowerCase().match(regx)! || [];
  return moduleName;
}

