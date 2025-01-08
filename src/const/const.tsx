export const listRuLetter = ["а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я"]

export const toCamelCase = (word:string):string => {
  return word ? word.toLowerCase().replace(word[0], word[0].toUpperCase()) : ''
}