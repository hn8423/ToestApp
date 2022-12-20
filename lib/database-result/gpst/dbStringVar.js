/**
 * @type {(str: string  keyword: {[x: string]: string}) => string}
 *
 * 변수가 있는 string(db에서 가져온 것)을 키워드에 맞게 변경.
 * ```js
 * const temp = '|_name_|님의 예시문 입니다. |_name_|님은 |_area_|에서 |_drink_|을(를) 마셨습니다. |_drink_|은(는) 맛있었습니다.'
 *
 * let result = dbStringVar(temp, {name: '황대성', area: '칵테일바', drink: '블랙러시안'})
 * console.log(result) // '황대성님의 예시문 입니다. 황대성님은 칵테일바에서 블랙러시안을(를) 마셨습니다. 블랙러시안은(는) 맛있었습니다.'
 * ```
 */
export default function dbStringVar(str, keyword = {}) {
  let temp = str
  for (let word in keyword) {
    temp = temp.replace(new RegExp(`\\|_${word}_\\|`, 'g'), keyword[word])
  }
  return temp
}
