export const fetchCaretakerLists = async (caretaker_id) => {
  const response = await fetch(
    `https://evening-dusk-50121.herokuapp.com/api/v1/caretakers/${caretaker_id}/lists`
  );
  if (!response.ok) {
    throw new Error("Could not fetch caretaker's lists");
  } else {
    const lists = response.json();
    return lists;
  }
};

export const fetchCaretakerTasks = async (list_id, caretaker_id) => {
  const response = await fetch(
    `https://evening-dusk-50121.herokuapp.com/api/v1/caretakers/${caretaker_id}/lists/${list_id}/tasks`
  );
  if (!response.ok) {
    throw new Error("Could not fetch caretaker's tasks");
  } else {
    const lists = response.json();
    return lists;
  }
};

export const patchCaretakerTask = async (object, list_id, task_id, caretaker_id) => {
  const url = `https://evening-dusk-50121.herokuapp.com/api/v1/caretakers/${caretaker_id}/lists/${list_id}/tasks/${task_id}`;
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not mark the task completed");
  }
  const task = await response.json();
  return task;
};