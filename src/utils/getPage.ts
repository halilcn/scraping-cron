import axios from 'axios'
import { TooManyRequestError, UnknownError } from './errors'

const getPage = async (url: string) => {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0',
    }
    const { data } = await axios.get(url, { headers })
    return data
  } catch (err: any) {
    if (err?.response?.status === 429) throw new TooManyRequestError()
    throw new UnknownError(err)
  }
}

export default getPage
