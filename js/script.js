// Elements

const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#add-note-input");
const addNoteBtn = document.querySelector(".add-note-btn");

//------ FUNCTION -------

// Add note function
function addNote() {
    const noteObject = {
        id: generatorId(),
        content: noteInput.value,
        fixed: false,
    };
    
    const noteELement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteELement);
}

// ID Generator funtion
function generatorId(){
    return Math.floor(Math.random() * 5000);
}

// Create note function

function createNote(id, content, fixed){

    const elementDiv = document.createElement("div");

    elementDiv.classList.add("note");

    const textarea = document.createElement("textarea");

    elementDiv.appendChild(textarea);

    textarea.value = content;

    textarea.placeholder = "Adicione sua anotação...";

    return elementDiv;
};


// Events

addNoteBtn.addEventListener("click", () => addNote());