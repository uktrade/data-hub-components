const getNumberParam = (url, splitOn, prefix = '?') => {
  const numberParam = parseInt(url.split(prefix + splitOn)[1], 10)
  return Number.isNaN(numberParam) ? 10 : numberParam
}

export default getNumberParam
