const getApiUrl = (city) => {
    const host = 'https://api.openweathermap.org/data/2.5/weather?q='
    const apiKey = '&appid=c73c343fe97e11a16abdc3518c2e67ed'
    
    return (host + city + apiKey);
}

const formatTemp = (temp, format) => {
    if (format === 'f') {
      return Math.round(Number(temp) * 9 / 5 - 459.67);
    } else { return Math.round(Number(temp) - 273.15); }
}

export { getApiUrl, formatTemp }