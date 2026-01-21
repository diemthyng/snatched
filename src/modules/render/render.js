import { content } from "./content.js";
import { displayImage, displayText, displayTimeStamp } from "./display.js";
import { fetchSortedFiles } from "./fetch.js";

const container = document.getElementById("text-files-container");

export async function renderFiles() {
  const sortedFiles = await fetchSortedFiles(content);

  let currentFolder = null;
  let folderContainer = null;

  for (const fileInfo of sortedFiles) {
    const currentDate = new Date(fileInfo.lastModified);

    // Extract folder name from file path (e.g., './content/skiing/file.txt' -> 'skiing')
    const pathParts = fileInfo.file.split('/');
    const folder = pathParts.length > 3 ? pathParts[2] : null;

    // If folder changed, create a new folder container
    if (folder !== currentFolder) {
      currentFolder = folder;
      if (folder) {
        folderContainer = document.createElement('div');
        folderContainer.className = `folder-group folder-${folder}`;
        folderContainer.setAttribute('data-folder', folder);
        container.appendChild(folderContainer);
      } else {
        folderContainer = null;
      }
    }

    // Use folder container if file is in a subfolder, otherwise use main container
    const targetContainer = folderContainer || container;

    if (fileInfo.fileType === "TXT") {
      displayTimeStamp(currentDate, targetContainer);
      await displayText(fileInfo.file, targetContainer);
    } else if (fileInfo.fileType === "IMAGE") {
      displayTimeStamp(currentDate, targetContainer);
      await displayImage(fileInfo.file, targetContainer);
    }
  }
}

