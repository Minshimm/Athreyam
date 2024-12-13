import { serverUrl } from './serverUrl';
import { commonAPI } from './commonApi';
export const registerAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverUrl}/api/register`,reqBody,"")
}
export const loginAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverUrl}/api/login`,reqBody,"")
}
