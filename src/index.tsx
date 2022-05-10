import {NativeModules, Platform} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-shell' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

export const Shell = NativeModules.Shell
  ? NativeModules.Shell
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export async function rootShell(cmd:string):Promise<string>{
  return Shell.shell(true,cmd)
}
export async function rootShellSlice(cmd:string):Promise<string[]>{
    var r=await rootShell(cmd)
    if(r==""){
        return []
    }
    var fixR=r.split("\n")
    return fixR.slice(0,fixR.length-1)
}
export function userShell(cmd:string):string{
    return Shell.shell(false,cmd)
}
export async function userShellSlice(cmd:string):Promise<string[]>{
    var r=await userShell(cmd)
    if(r==""){
        return []
    }
    var fixR=r.split("\n")
    return fixR.slice(0,fixR.length-1)
}
