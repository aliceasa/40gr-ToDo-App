const savedText = {};

function deleteNote(id) {
  fetch(`/?id=${id}`, { method: "DELETE" }).then(
    (res) => (window.location = res.url)
  );
}

function editNote(id, clickedButton) {
  const elements = getNoteElements(id, clickedButton);
  const { container, noteText } = elements;
  savedText[id] = noteText; //save initial element to memory

  const input = createNoteEditInput(noteText.innerText);
  container.replaceChild(input, noteText);

  enableButtonGroup(container, "edit");
}

function saveEdit(id, clickedButton) {
  const elements = getNoteElements(id, clickedButton);
  const { container, noteEdit, noteText } = elements;
  restoreNoteTextElement(elements);
  noteText.innerText = noteEdit.value; // switch input and text, SAVE input

  enableButtonGroup(container, "standard");

  fetch("/", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, note: noteEdit.value }),
  });
}

function undoEdit(id, clickedButton) {
  const elements = getNoteElements(id, clickedButton);
  const { container } = elements;
  restoreNoteTextElement(elements);
  // switch input and text, don't save input
  enableButtonGroup(container, "standard");
}

function createNoteEditInput(initialText) {
  const input = document.createElement("input");
  input.classList.add("note-edit");
  input.type = "text";
  input.value = initialText;
  return input;
}

function getNoteElements(id, clickedButton) {
  const container = containerOfButton(clickedButton);
  const noteEdit = container.querySelector(".note-edit");
  if (noteEdit) {
    return {
      container,
      noteEdit,
      noteText: savedText[id],
    };
  } else {
    return {
      container,
      noteText: container.querySelector(".note-text"),
    };
  }
}

function containerOfButton(buttonElement) {
  return buttonElement.parentElement.parentElement;
}

function restoreNoteTextElement(elements) {
  const { container, noteEdit, noteText } = elements;

  container.replaceChild(noteText, noteEdit);
}

function enableButtonGroup(container, groupClass) {
  container
    .querySelectorAll(".buttons>button")
    .forEach((button) => button.classList.add("hidden")); //hide all buttons
  container
    .querySelectorAll(`.${groupClass}`)
    .forEach((button) => button.classList.remove("hidden")); //unhide only required buttons
}

// Register

if (window.location.pathname.includes("/register")) {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.children[0].value;
    const password = e.target.children[1].value;

    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    }

    postData("/register", { username: username, password: password }).then(
      (data) => {
        alert(data.msg);
        window.location.replace("/");
      }
    );
  });
}

if (window.location.pathname.includes("/login")) {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.children[0].value;
    const password = e.target.children[1].value;

    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    }

    postData("/login", { username: username, password: password }).then(
      (data) => {
        alert(data.msg);
        window.location.replace("/");
      }
    );
  });
}
