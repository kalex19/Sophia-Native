export const fetchClientLists = async (client_id) => {
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

export const postClientList = async (newList) => {
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

export const deleteClientList = async (client_id, list_id) => {
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

export const patchClientList = async (updatedList) => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedList.name)
  };
  const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/clients/${updatedList.client_id}/lists/${updatedList.list_id}`, options);

  if (!response.ok) {
    throw new Error("Could not edit the name of the list");
  }
  const list = await response.json();
  return list;
};


export const fetchClientTasks = async (list_id, client_id) => {
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

export const postClientTask = async (newTask, list_id, client_id) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask)
  };
  const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/clients/${client_id}/lists/${list_id}/tasks`, options);
  if (!response.ok) {
    throw new Error("Could not add new task");
  }
  const task = await response.json();
  return task;
};

export const patchClientTask = async (updatedTask, list_id, task_id, clientId) => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask)
  };

  const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/clients/${clientId}/lists/${list_id}/tasks/${task_id}`, options);
  if (!response.ok) {
    throw new Error("Could not edit the name of the task");
  }
  const task = await response.json();
  return task;
};

export const deleteClientTask = async (list_id, task_id, client_id) => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/clients/${client_id}/lists/${list_id}/tasks/${task_id}`, options);
  if (!response.ok) {
    throw new Error("Could not delete task");
  }
};

export const fetchCaretakers = async (user_id) => {
  const response = await fetch(
    `https://evening-dusk-50121.herokuapp.com/api/v1/caretakers`
  );
  if (!response.ok) {
    throw new Error("Could not fetch caretakers");
  } else {
    const caretakers = response.json();
    return caretakers;
  }
};
