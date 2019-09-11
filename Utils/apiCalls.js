export const fetchLists = async (client_id) => {
  const response = await fetch(
    `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${client_id}/lists`
  );
  if (!response.ok) {
    throw new Error("Could not fetch lists");
  } else {
    const lists = response.json();
    return lists;
  }
};

export const postList = async (newList) => {
  console.log('postlist', newList)
  console.log('postlist', newList.client_id)
  const url = `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${newList.client_id}/lists`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newList)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not add new list");
  }
  const list = await response.json();
  return list;
};

export const deleteList = async (client_id, list_id) => {
  const url = `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${client_id}/lists/${list_id}`;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not delete list");
  }
};

export const patchList = async (object, list_id, client_id) => {
  const url = `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${client_id}/lists/${list_id}`;
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


export const fetchTasks = async (list_id, client_id) => {
  const response = await fetch(
    `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${client_id}/lists/${list_id}/tasks`
  );
  if (!response.ok) {
    throw new Error("Could not fetch lists");
  } else {
    const lists = response.json();
    return lists;
  }
};

export const postTask = async (object, list_id, client_id) => {
  const url = `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${client_id}/lists/${list_id}/tasks`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not add new task");
  }
  const task = await response.json();
  return task;
};

export const patchTask = async (object, list_id, task_id, clientId) => {
  const url = `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${clientId}/lists/${list_id}/tasks/${task_id}`;
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not edit the name of the task");
  }
  const task = await response.json();
  return task;
};

export const deleteTask = async (list_id, task_id, client_id) => {
  const url = `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${client_id}/lists/${list_id}/tasks/${task_id}`;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not delete task");
  }
};

export const fetchProfile = async (user_id) => {
  const response = await fetch(
    `https://evening-dusk-50121.herokuapp.com/api/v1/clients/${user_id}`
  );
  if (!response.ok) {
    throw new Error("Could not fetch profile");
  } else {
    const lists = response.json();
    return lists;
  }
};
