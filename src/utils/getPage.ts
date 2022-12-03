import axios from 'axios'
import { TooManyRequestError, UnknownError } from './errors'

const getPage = async (url: string) => {
  try {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'tur',
      refer: 'https://www.hepsiemlak.com/',
      'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      'sec-ch-ua-platform': 'macOS',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    }
    const { data } = await axios.get(url, { headers })
    return data
  } catch (err: any) {
    if (err?.response?.status === 429) throw new TooManyRequestError()
    throw new UnknownError(err)
  }
}

export default getPage
