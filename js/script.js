// ELEMENTS

const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#add-note-input");
const addNoteBtn = document.querySelector(".add-note-btn");

//------ FUNCTION -------

// showNotes is a function for show the notes save in dom
function showNotes() {
    cleanNotes();
    
    getNotes().forEach((note) => {
    
        const noteELement = createNote(note.id, note.content, note.fixed);        
    
     notesContainer.appendChild(noteELement);
    });
    
};

//update in realtime the status fixed of the notes
function cleanNotes(){
    notesContainer.replaceChildren([]);
};

// Add note function
function addNote() {
    const notes = getNotes();

    const noteObject = {
        id: generatorId(),
        content: noteInput.value,
        fixed: false,
    };
    
    const noteELement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteELement);

    notes.push(noteObject);

    saveNotes(notes);

    noteInput.value = "";
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

    const pinIcon = document.createElement("i")

    pinIcon.classList.add(...["bi", "bi-pin-fill"]);

    elementDiv.appendChild(pinIcon);

    if(fixed){
        elementDiv.classList.add("fixed");
    }

    // Events elementDiv

    elementDiv.querySelector(".bi-pin-fill").addEventListener("click", () => {
        toggleFixNote(id);
    });

    function toggleFixNote() {
        const notes = getNotes();

        const targetNote = notes.filter((note) => note.id === id)[0];

        targetNote.fixed = !targetNote.fixed;

        saveNotes(notes);

        showNotes();
    };


    return elementDiv;
};

// --------------LocalStorage--------------

// Get notes from LocalStorage
function getNotes(){

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const orderNotes = notes.sort((a,b) => (a.fixed > b.fixed ? -1 : 1));

    return orderNotes;
}

// Save in LocalStorage funtion
function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes));
}

// ----------------------------------------

// EVENTS

// click add note btn event
addNoteBtn.addEventListener("click", () => addNote());

// Press enter in noteInput for add new note
noteInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        
        e.preventDefault;

        addNote();
    };
});


// INICIALIZATION
// Run showNote for iniciation the save notes in localstorage
showNotes();