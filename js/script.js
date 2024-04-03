// ELEMENTS

const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#add-note-input");
const addNoteBtn = document.querySelector(".add-note-btn");
const searchInput = document.querySelector("#search-input");
const exportBtn = document.querySelector("#exports-notes");

//------ FUNCTION -------

// showNotes is a function for show the notes save in dom
function showNotes() {
    cleanNotes();
    
    getNotes().forEach((note) => {
    
        const noteElement = createNote(note.id, note.content, note.fixed, note.color);        
    
     notesContainer.appendChild(noteElement);
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
        color: "", 
    };
    
    const noteElement = createNote(
        noteObject.id,
        noteObject.content,
        noteObject.fixed,
        noteObject.color 
    );

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);

    noteInput.value = "";
}

// ID Generator funtion
function generatorId(){
    return Math.floor(Math.random() * 5000);
}

// Create note function

function createNote(id, content, fixed, color){

    const elementDiv = document.createElement("div");

    elementDiv.classList.add("note");

    const textarea = document.createElement("textarea");

    elementDiv.appendChild(textarea);

    elementDiv.style.backgroundColor = color

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
    
    const colorSelectIcon = document.createElement("i")

    colorSelectIcon.classList.add(...["bi", "bi-palette"]);

    elementDiv.appendChild(colorSelectIcon);

    //colors menu

    const colorsOptions = document.createElement("ul");

    colorsOptions.classList.add("colors-options", "hide");

    elementDiv.appendChild(colorsOptions);

    const paletteIcon = document.createElement("i");

    paletteIcon.classList.add("bi", "bi-palette-fill");

    colorsOptions.appendChild(paletteIcon);

    //Yellow
    
    const liYellow = document.createElement("li");

    liYellow.classList.add("yellow");

    colorsOptions.appendChild(liYellow);

    const yellow = document.createElement("span");

    yellow.classList.add("color");

    liYellow.appendChild(yellow);

    //Green

    const liGreen = document.createElement("li")

    liGreen.classList.add("green");

    colorsOptions.appendChild(liGreen);

    const green = document.createElement("span");

    green.classList.add("color");

    liGreen.appendChild(green);

    //Pink

    const liPink = document.createElement("li")

    liPink.classList.add("pink");

    colorsOptions.appendChild(liPink);

    const pink = document.createElement("span");

    pink.classList.add("color");

    liPink.appendChild(pink);

    //Red

    const liRed = document.createElement("li")

    liRed.classList.add("red");

    colorsOptions.appendChild(liRed);

    const red = document.createElement("span");

    red.classList.add("color");

    liRed.appendChild(red);

    //Cyan

    const liCyan = document.createElement("li")

    liCyan.classList.add("cyan");

    colorsOptions.appendChild(liCyan);

    const cyan = document.createElement("span");

    cyan.classList.add("color");

    liCyan.appendChild(cyan);

    //Orange

    const liOrange = document.createElement("li")

    liOrange.classList.add("orange");

    colorsOptions.appendChild(liOrange);

    const orange = document.createElement("span");

    orange.classList.add("color");

    liOrange.appendChild(orange);

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
    
    elementDiv.querySelector(".bi-palette").addEventListener("click", () => {
        colorsOptions.classList.toggle("hide");
    });

    yellow.addEventListener("click", () => {
       
        changeColor(id, elementDiv, "#f1fa8c");
    });

    green.addEventListener("click", () => {
    
       changeColor(id, elementDiv, "#50fa7b")

    });

    pink.addEventListener("click", () => {
    
       changeColor(id, elementDiv, "#ff79c6");

    });

    red.addEventListener("click", () => {
       
        changeColor(id, elementDiv, "#ff5555");

    });

    cyan.addEventListener("click", () => {

       changeColor(id, elementDiv, "#8be9fd");

    });
    
    orange.addEventListener("click", () => {

       changeColor(id, elementDiv, "#ffb86c");

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

// Change colors

function changeColor(id, elementDiv, color) {
    const notes = getNotes();

    const targetNote = notes.find((note) => note.id === id);
    
    targetNote.color = color;

    elementDiv.style.backgroundColor = color;
    
    saveNotes(notes);
}

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

    const noteElement = createNote(
        noteObject.id,
        noteObject.content,
        noteObject.fixed
    );

    notesContainer.appendChild(noteElement);

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

function exportData(){

    const notes = getNotes();

    const csvString = [
        ["ID", "Conteúdo", "Fixado?"],
        ...notes.map((note) => [note.id, note.content, note.fixed]),
    ].map((e) => e.join(",")).join("\n");

    const element = document.createElement("a")

    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);

    element.target = "_blank"

    element.download = "notes.csv"

    element.click(); 
};

// --------------LocalStorage--------------

// Get notes from LocalStorage
function getNotes(){

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const orderNotes = notes.sort((a,b) => (a.fixed > b.fixed ? -1 : 1));

    return orderNotes;
};

// Save in LocalStorage funtion
function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes));
};

function searchNotes(search){
    const searchResults = getNotes().filter((note) => 
        note.content.includes(search)
    );
    
    console.log(searchResults);   
    
    if (search !==""){
        cleanNotes();

        searchResults.forEach((note) => {
            const noteElement = createNote(note.id, note.content, note.fixed);
            notesContainer.appendChild(noteElement);
        }); 
        return;
    };

    cleanNotes();
    
    showNotes();
};

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

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        
        const search = e.target.value;

        searchNotes(search);
    };
});

exportBtn.addEventListener("click", (e) =>{
 exportData();
});

// INICIALIZATION
// Run showNote for iniciation the save notes in localstorage
showNotes();