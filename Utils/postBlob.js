export const postBlob = async (blob) => {
  const options = {
    method: 'POST',
    body: blob,
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }

  try {
    const response = await fetch("https://evening-dusk-50121.herokuapp.com/api/v1/speech", options)
    const data = await response.json()
    console.log('data', data)
    return data
  } catch(error) {
    throw new Error(error.message)
    }
}
