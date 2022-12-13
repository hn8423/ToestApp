// import axios from 'axios'
import axios from 'axios'
import _ from 'lodash'

/**
 * @typedef {import('@prisma/client').AIChannelList} channelList
 * @typedef {import('@prisma/client').AIMovieList} movieList
 *
 * @typedef {({
 *     kind: string;
 *     etag: string;
 *     id: string;
 *     snippet: {
 *         title: string;
 *         description: string;
 *         customUrl: string;
 *         publishedAt: string;
 *         thumbnails: {
 *             [x: string]: {
 *                 url: string;
 *                 width: number;
 *                 height: number;
 *             };
 *         };
 *     };
 * })[]} apiChannelItems
 *
 * @typedef {({
 *     kind: string;
 *     etag: string;
 *     id: string;
 *     snippet: {
 *         publishedAt: string;
 *         channelId: string;
 *         title: string;
 *         description: string;
 *         thumbnails: {
 *             [x: string]: {
 *                 url: string;
 *                 width: number;
 *                 height: number;
 *             }
 *         };
 *     };
 * })[]} apiVideoItems
 */

/**
 * @template {'channel' | 'movie'} T
 *
 * @param {{
 * channel: channelList[]
 * movie: movieList[]
 * }[T]} pickData
 * @param {T} type
 *
 * @returns {Promise<{
 * channel:(channelList&{thumbnail: string, title: string})[]
 * movie:(movieList&{thumbnail: string})[]
 * }[T]>}
 */
export default async function mapYoutubeData(pickData, type) {
  switch (type) {
    case 'channel': {
      let ytIdList = _(pickData)
        .map(v => v.ytId)
        .value()

      /**@type {{items: apiChannelItems}} */
      let {items} = (
        await axios.get(
          `https://content-youtube.googleapis.com/youtube/v3/channels?id=${ytIdList.join(
            ',',
          )}&part=snippet&key=AIzaSyCMHXuKpO_f9UxR5yd3UVH1Mru_vERta7U`,
        )
      ).data
      // let items = await fetch(
      //   `https://content-youtube.googleapis.com/youtube/v3/channels?id=${ytIdList.join(
      //     ',',
      //   )}&part=snippet&key=AIzaSyCMHXuKpO_f9UxR5yd3UVH1Mru_vERta7U`,
      // )

      let response = _(items)
        .keyBy(item => item.id)
        .mapValues(({snippet: {title, thumbnails}}) => ({title, thumbnails}))
        .value()

      let result = _(/**@type {channelList[]} */ (pickData))
        .map(data => {
          let {
            title,
            thumbnails: {high, medium, defaults},
          } = response[data.ytId]
          return {
            ...data,
            title,
            thumbnail: (high || medium || defaults).url,
          }
        })
        .value()

      return result
    }

    case 'movie': {
      let ytIdList = _(pickData)
        .map(v => v.ytId)
        .value()

      /**@type {{items: apiVideoItems}} */
      let {items} = (
        await axios(
          `https://content-youtube.googleapis.com/youtube/v3/videos?id=${ytIdList.join(
            ',',
          )}&part=snippet&key=AIzaSyCMHXuKpO_f9UxR5yd3UVH1Mru_vERta7U`,
        )
      ).data

      let response = _(items)
        .keyBy(item => item.id)
        .mapValues(({snippet: {thumbnails}}) => ({thumbnails}))
        .value()

      let result = _(/**@type {movieList[]} */ (pickData))
        .map(data => {
          let {
            thumbnails: {maxres, standard, high},
          } = response[data.ytId]
          return {
            ...data,
            thumbnail: (maxres || standard || high).url,
          }
        })
        .value()
      // console.log('result :', result)
      return result
    }
  }
}
