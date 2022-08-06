import fs from "fs";

const commandsPaths = fs.readdirSync("./src/commands")
function searchForTsFiles(commandsPaths: string[], directory: string) {
    let pathArray: string[] = []

    //looks for .ts files in the directory and adds them to the fileArray
    for (let i = 0; i < commandsPaths.length; i++) {
        if (commandsPaths[i].endsWith(".ts") || commandsPaths[i].endsWith(".js")) {
            pathArray.push(directory + "/" + commandsPaths[i])
            
        } else if (fs.lstatSync(directory+"/"+commandsPaths[i]).isDirectory()){
            let temp = searchForTsFiles(fs.readdirSync(directory+"/"+commandsPaths[i]), directory+"/"+commandsPaths[i])
            
            for(const j of temp){
                pathArray.push(j)
            }
        }
    }
    return pathArray
}
let exportCommandsPaths = searchForTsFiles(commandsPaths, "./src/commands")
//removing ./src from the beginning of the path

  for (const i in exportCommandsPaths){
      let temp: string[] = exportCommandsPaths[i].split("/")
      temp.shift()
      temp.shift()

      exportCommandsPaths[i] = "./"+temp.join("/")
  }


const eventFiles = fs
    .readdirSync("./src/events")
    .filter((file) => file.endsWith(".ts"));

export { exportCommandsPaths, eventFiles };