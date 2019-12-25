export function codeHandle (code) {
  let codeArr = code.split('-');
  if(codeArr.length>0){
    let codeRes = '';
    codeArr.forEach(i=>{
      let firstLetter = i.substring(0,1).toUpperCase();
      let otherLetter = i.substring(1);
      codeRes += firstLetter+otherLetter;
    })
    return codeRes;
  } else {
    return ''
  }
}
