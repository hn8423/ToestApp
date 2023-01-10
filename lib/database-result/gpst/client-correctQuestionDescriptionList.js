import _ from 'lodash'

/**
 * @param {getResult.myAnswerInfo} myAnswerInfo
 */
export default function correctQuestionDescriptionList(myAnswerInfo) {
  let cnt

  if (!myAnswerInfo) {
    cnt = 0
  } else {
    cnt = myAnswerInfo.length
  }

  return _(myAnswerInfo)
    .filter(info => info.isCorrectedByMyAnswer)
    .orderBy(info => info.questionInfo.descriptionOrder, 'asc')
    .map(info => ({
      ko: info.questionInfo.description_correct_KR,
      en: info.questionInfo.description_correct_EN,
    }))
    .take(Math.ceil(cnt / 2))
    .value()
}
