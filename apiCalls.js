export const fetchLists = async => {
  const response = await fetch(`https://sophia-be.herokuapp.com/api/v1/clients/${client_id}/lists`);
  if (!response.ok) {
    throw new Error("Could not fetch lists");
  } else {
    const lists = await response.json();
    return lists;
  }
};

