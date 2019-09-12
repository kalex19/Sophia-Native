export const postBlob = (blob) => {
  const options = {
    method: 'POST',
    body: blob,
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }

  fetch("http://evening-dusk-50121.herokuapp.com/api/v1/speech", options)
  .then(res => res.json())
  .then(data => {
    this.setState({list_title: data});
    })
  .catch(error => {
    console.log(error);
    })
}