const path = require("path");
const fs = require("fs")

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

function readFile(fileName){
fs.readFile(fileName,"utf-8",(err,data)=>{
    if(err){
        console.log("error to reading a file" , err);
        return;
    }
    console.log(data)
})
}

function writeFile(fileName){
    fs.writeFile(fileName, "hello nipun sehrawat" , (err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("written data succesfully")
    })
}

function appendToFile(content, fileName) {
    fs.appendFile(fileName, content + '\n', (err) => {
        if (err) {
            console.error(`Error appending to file '${fileName}':`, err);
            return;
        }
        console.log(`Content appended to the file '${fileName}'`);
    });
}

// Function to delete a file
function deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(`Error deleting file '${fileName}':`, err);
            return;
        }
        console.log(`File '${fileName}' deleted`);
    });
}

// Function to rename a file
function renameFile(oldName, newName) {
    fs.rename(oldName, newName, (err) => {
        if (err) {
            console.error(`Error renaming file '${oldName}':`, err);
            return;
        }
        console.log(`File '${oldName}' renamed to '${newName}'`);
    });
}

// Function to list files in a directory
function listFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error listing files in directory '${dir}':`, err);
            return;
        }
        console.log(`Files in directory '${dir}':`);
        files.forEach(file => console.log(file));
    });
}


switch (operation) {
  // complete the fillowing function.
  case 'read':
    readFile("test.txt");
    break;
    
  case 'write':
    writeFile("test.txt");
    break;

  case 'append':
    appendToFile(content+'\n',file);
    break;

    case 'delete':
        deleteFile(file);
        break;
    case 'rename':
        renameFile(file, content);
        break;
    case 'list':
        listFiles(file);
        break;
        
  default:
    console.log(`Invalid operation '${operation}'`);
}