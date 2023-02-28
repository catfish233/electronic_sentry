import fs from 'fs';
import path from 'path';

// 将base64转换为blob对象
export function dataURItoBlob(dataURI) {
  let byteString = atob(dataURI.split(',')[1]);
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: mimeString});
}

// 将截图blob保存在本地
// const dirExists = async (dir) => {
//   let isExists = await getStatus(dir) || null;
 
//   if(isExists && isExists.isDirectory()){
//       return true;
//   }else if (isExists){
//       return false;
//   }
//   //该路径不存在
//   let tempDir = path.parse(dir).dir;//拿到上级路径
//   //递归判断
//   let status = await dirExists(tempDir);
//   let mkdirStatus
//   if(status){
//       mkdirStatus = await mkdir(dir)
//   }
//   return mkdirStatus;
// }

// const getStatus = (filePath) => {
//   return new Promise((resolve,reject)=>{
//       fs.stat(filePath,(err,stats)=>{
//           if(err){
//               resolve(false);
//           }else{
//               resolve(stats);
//           }
//       })
//   })
// }

// function mkdir(dir){
//   return new Promise((resolve,reject)=>{
//       fs.mkdir(dir,{recursive:true},(err)=>{
//           if(err){
//               resolve(false);
//           }else{
//               resolve(true);
//           }
//       })
//   })
// }

// export const saveImg = async (dirPath,bufferData,fileName) => {
//   return new Promise(async (resolve,reject) => {
//     let mkdirStatus = await dirExists(dirPath);
//     console.log(dirPath);
//     if(mkdirStatus){
//       let reader = new FileReader();
//       reader.readAsArrayBuffer(bufferData)
//       reader.onload = () => {
//         let buffer = new Buffer(reader.result);
//         fs.writeFile(dirPath + fileName, buffer, {}, (err, res) => {
//             resolve()
//         });
//       };
//     }
//   })
// }

// export default saveImg;