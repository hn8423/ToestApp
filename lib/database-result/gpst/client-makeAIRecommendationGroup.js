import _ from 'lodash'

/**@param {getResult.aiRecommendation} aiRecommendation */
export default function makeAIRecommendationGroup(aiRecommendation) {
  let { AIChannelList, AIMovieList, AIPeopleList } = aiRecommendation

  const AIChannelList_g = _(AIChannelList)
    .groupBy((channel) => channel.dom)
    .value()
  const AIMovieList_g = _(AIMovieList)
    .groupBy((movie) => movie.dom)
    .value()
  const AIPeopleList_g = _(AIPeopleList)
    .groupBy((people) => people.dom)
    .mapValues((peopleGroup) =>
      _(peopleGroup)
        .groupBy((people) => people.com)
        .value(),
    )
    .value()

  const result = { AIChannelList: AIChannelList_g, AIMovieList: AIMovieList_g, AIPeopleList: AIPeopleList_g }

  return result
}
