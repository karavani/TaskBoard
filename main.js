window.onload = function () {
  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', "[]");
  }
  onLoadNotes();
  setMinDate();
};

function setMinDate() {
  let datepicker = document.getElementById('dateInput');
  datepicker.min = new Date().toISOString().split("T")[0];
}

function makeNote(note) {
  let newDiv = document.createElement("div");
  newDiv.id = note.id; // <div id="1">
  newDiv.classList.add("divClass"); // <div id="1" class="addDiv">
  let deleteButton = document.createElement("input");
  deleteButton.type = "button"; // <input type="button">
  deleteButton.value = "x";
  deleteButton.id = "deleteBtn";
  deleteButton.onclick = function () {
    let parent = deleteButton.parentElement;
    let storageNotes = JSON.parse(localStorage.getItem('notes'));
    for(let i=0; i< storageNotes.length; i++){
      if(storageNotes[i].id == parent.id){
        storageNotes.splice(i, 1);
        localStorage.setItem("notes", JSON.stringify(storageNotes));
        break;
      }
    }
    parent.remove();
  }
  let textNote = document.createElement("P");
  textNote.id = "textNote";
  textNote.innerHTML = note.text;

  let dateNote = document.createElement("P");
  dateNote.id = "dateNote";
  dateNote.innerHTML = note.date + "<br>" + note.time;

  newDiv.appendChild(deleteButton);
  newDiv.appendChild(textNote);
  newDiv.appendChild(dateNote);
  let notesContainer = document.getElementById("notesContainer");
  notesContainer.appendChild(newDiv);
}

function onAddDiv() {
  let noteCache = JSON.parse(localStorage.getItem("notes"));

  let note = {
    id: new Date().valueOf(),
    text: document.getElementById("textBox").value,
    date: document.getElementById("dateInput").value,
    time: document.getElementById("timeInput").value
  }
  try {
noteCache.push(note);
validateTaskInput(note);
makeNote(note);
onEraseNote();
localStorage.setItem("notes", JSON.stringify(noteCache));
}
catch (e) {
  onFailedValidation(e);
}
}

function onEraseNote() {
  document.getElementById("textBox").value = "";
  document.getElementById("timeInput").value = "";
  document.getElementById("dateInput").value = "";
  onInputInitiliazTask();
}

function onLoadNotes() {
  let loadedNotes = JSON.parse(localStorage.getItem("notes"));
  for (var key in loadedNotes) {
    var value = loadedNotes[key];
    makeNote(value);
  }
}
function validateTaskInput(note) {
  if (note.text == "") {
    document.getElementById("textBox").style.border = "red solid 2px";
    throw new Error("Please fill task");
  }
  if (note.date == "") {
    document.getElementById("dateInput").style.border = "red solid 2px";
    throw new Error("Please choose a due date");
  }
  if (note.time == "") {
    document.getElementById("timeInput").style.border = "red solid 2px";
    throw new Error("Please choose a time");
  }
}
function onFailedValidation(e) {
  console.error(e);
  let errorMessage = document.getElementById("errorMessage");
  errorMessage.innerHTML = "<strong>Error! </strong>" + e.message;
  errorMessage.style.background = "#ce4040";
  errorMessage.style.display = "inline-block";
  errorMessage.style.padding = "10px";
} 
function onInputInitiliazTask(){
  document.getElementById("textBox").style.border = "none";
  document.getElementById("dateInput").style.border = "none";
  document.getElementById("timeInput").style.border = "none";
  let errorDiv = document.getElementById("errorMessage");
  errorDiv.style.display = "none";
}

