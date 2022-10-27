import axios from 'axios'

const getPage = async (url: string) => {
  const { data } = await axios.get(url)
  return data
}

export default getPage
