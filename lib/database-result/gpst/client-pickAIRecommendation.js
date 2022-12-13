import _ from 'lodash'

export default function pickAIRecommendation(options) {
  const {badgeCheck, data, type} = options
  /**@type {(keyof badgeCheck)[]} */
  const badgeList = _(badgeCheck)
    .toPairs()
    .filter(v => v[1])
    .map(v => v[0])
    .value()

  let targetMap = {
    channel: 'AIChannelList',
    movie: 'AIMovieList',
    people: 'AIPeopleList',
  }

  let group = data[targetMap[type]]

  /**
   * @type {{[x:string]: getResult.aiRecommendationGroup[{
   *       channel: 'AIChannelList';
   *       movie: 'AIMovieList';
   *       people: 'AIPeopleList';
   *   }[T]]
   * }}
   */
  const targetDataMap = _(badgeList)
    .keyBy(v => v)
    .mapValues(badge => group[badge])
    .value()

  let max = 8 // 최대
  let pick = Math.floor(max / badgeList.length) // 각 영역 별 선택 수
  let rest = max - pick * badgeList.length // 남은 수

  let result

  switch (type) {
    case 'channel': {
      let more = _(badgeList)
        .sampleSize(rest)
        .keyBy(v => v)
        .value()
      result = _(badgeList)
        .flatMap(badge => {
          let target = targetDataMap[badge]
          return _(target)
            .sampleSize(pick + (badge in more ? 1 : 0))
            .value()
        })
        .value()
      break
    }
    case 'movie': {
      let more = _(badgeList)
        .sampleSize(rest)
        .keyBy(v => v)
        .value()
      result = _(badgeList)
        .flatMap(badge => {
          let target = targetDataMap[badge]
          return _(target)
            .sampleSize(pick + (badge in more ? 1 : 0))
            .value()
        })
        .value()
      break
    }
    case 'people': {
      result = _(badgeList)
        .flatMap(badge => {
          let target = targetDataMap[badge]
          return _(target)
            .toPairs()
            .map(v => v[1])
            .flatMap(v =>
              _(v)
                .sampleSize(badgeList.length === 1 ? 2 : 1)
                .value(),
            )
            .value()
        })
        .sampleSize(8)
        .value()
      break
    }
  }
  return _(result).shuffle().value()
}
