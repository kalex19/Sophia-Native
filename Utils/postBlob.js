export const postBlob = async (blob) => {
  const options = {
    method: 'POST',
    body: blob,
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }

try{
  const response= await fetch("http://evening-dusk-50121.herokuapp.com/api/v1/speech", options)
  const data = response.json()
  return data
} catch(error) {
  throw new Error(error.message)
  }
}
