import {readFile} from 'node:fs/promises';
const dictionary=JSON.parse(await readFile(new URL('./en.json',import.meta.url),'utf8'));
const entries=Object.entries(dictionary).sort((a,b)=>b[0].length-a[0].length);
export function translate(value){
  for(const [zh,en] of entries)value=value.split(zh).join(en);
  return value;
}
export function t(value){
  if(!/[\u3400-\u9fff]/u.test(value))return value;
  if(!(value in dictionary))throw new Error('Missing English translation: '+value);
  return dictionary[value];
}
export function assertEnglish(value,label){
 const remainder=value.replaceAll('中文','');
 if(/[\u3400-\u9fff]/u.test(remainder))throw new Error('Untranslated text in '+label+': '+remainder.match(/.{0,40}[\u3400-\u9fff].{0,70}/u)?.[0]);
}
