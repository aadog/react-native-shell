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
    var r=await Shell.shell(true,cmd)
    if(r.endsWith("\n")){
        return r.slice(0,r.length-1)
    }
    return r
}
export async function rootShellSlice(cmd:string):Promise<string[]>{
    var r=await rootShell(cmd)
    if(r==""){
        return []
    }
    var fixR=r.split("\n")
    return fixR
}
export async function userShell(cmd:string):Promise<string>{
    var r=await Shell.shell(false,cmd)
    if(r.endsWith("\n")){
        return r.slice(0,r.length-1)
    }
    return r
}
export async function userShellSlice(cmd:string):Promise<string[]>{
    var r=await userShell(cmd)
    if(r==""){
        return []
    }
    var fixR=r.split("\n")
    return fixR
}


export async function rootShellRaw(cmd:string):Promise<string>{
    var r=await Shell.shellRaw(true,cmd)
    if(r.endsWith("\n")){
        return r.slice(0,r.length-1)
    }
    return r
}
export async function rootShellRawSlice(cmd:string):Promise<string[]>{
    var r=await rootShellRaw(cmd)
    if(r==""){
        return []
    }
    var fixR=r.split("\n")
    return fixR
}
export async function userShellRaw(cmd:string):Promise<string>{
    var r=await Shell.shellRaw(false,cmd)
    if(r.endsWith("\n")){
        return r.slice(0,r.length-1)
    }
    return r
}
export async function userShellRawSlice(cmd:string):Promise<string[]>{
    var r=await userShellRaw(cmd)
    if(r==""){
        return []
    }
    var fixR=r.split("\n")
    return fixR
}

