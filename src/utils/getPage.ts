import axios from 'axios'
import { TooManyRequestError, UnknownError } from './errors'

const getPage = async (url: string) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (err: any) {
    if (err.response.status === 429) throw new TooManyRequestError()
    throw new UnknownError()
  }
}

export default getPage
