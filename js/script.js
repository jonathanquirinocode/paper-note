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

    const deleteIcon = document.createElement("i")

    deleteIcon.classList.add(...["bi", "bi-x-lg"]);

    elementDiv.appendChild(deleteIcon);

    const duplicateIcon = document.createElement("i")

    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);

    elementDiv.appendChild(duplicateIcon);

    if(fixed){
        elementDiv.classList.add("fixed");
    };

    //Edit notes

    elementDiv.querySelector("textarea").addEventListener("keyup", (e) => {

        const noteContent = e.target.value;

        updateNote(id, noteContent);

    });

    // Events elementDiv

    elementDiv.querySelector(".bi-pin-fill").addEventListener("click", () => {
        toggleFixNote(id);
    });
    
    //Active function deletNote
    
    elementDiv.querySelector(".bi-x-lg").addEventListener("click", () => {
        deleteNote(id, elementDiv);
    });

    elementDiv.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        copyNote(id);
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

//Delete function

function deleteNote(id, elementDiv){

    const notes = getNotes().filter((note) => note.id !== id)
    
    saveNotes(notes);

    notesContainer.removeChild(elementDiv);
}

//duplicate function

function copyNote(id){

    const notes = getNotes();
    
    const targetNote = notes.filter((note) => note.id === id)[0];

    const noteObject = {
        id: generatorId(),
        content: targetNote.content,
        fixed: false
    };

    const noteELement = createNote(
        noteObject.id,
        noteObject.content,
        noteObject.fixed
    );

    notesContainer.appendChild(noteELement);

    notes.push(noteObject);

    saveNotes(notes);
};

// Update note function

function updateNote(id, newContent){

    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.content = newContent;

    saveNotes(notes);

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