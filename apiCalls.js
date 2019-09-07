export const fetchLists = async () => {
  const response = await fetch(
    "https://sophia-be.herokuapp.com/api/v1/clients/2/lists"
  );
  if (!response.ok) {
    throw new Error("Could not fetch lists");
  } else {
    const lists = response.json();
    return lists;
  }
};

export const postList = async object => {
  const url = "https://sophia-be.herokuapp.com/api/v1/clients/2/lists";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not add new list");
  }
  const list = await response.json();
  return list;
};

export const deleteList = async list_id => {
  const url = `https://sophia-be.herokuapp.com/api/v1/clients/2/lists/${list_id}`;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not delete list");
  }
};

export const patchList = async (object, list_id) => {
  const url = `https://sophia-be.herokuapp.com/api/v1/clients/2/lists/${list_id}`;
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not edit the name of the list");
  }
  const list = await response.json();
  return list;
};


export const fetchTasks = async (list_id) => {
  const response = await fetch(
    `https://sophia-be.herokuapp.com/api/v1/clients/2/lists/${list_id}/tasks`
  );
  if (!response.ok) {
    throw new Error("Could not fetch lists");
  } else {
    const lists = response.json();
    return lists;
  }
};
