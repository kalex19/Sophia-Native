export const fetchCaretakerLists = async (caretaker_id) => {
  const response = await fetch(
    `https://sophia-be.herokuapp.com/api/v1/caretakers/${caretaker_id}/lists`
  );
  if (!response.ok) {
    throw new Error("Could not fetch lists");
  } else {
    const lists = response.json();
    return lists;
  }
};