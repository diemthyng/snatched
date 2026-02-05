import { content } from './content.js'
import { displayImage, displayText, displayTimeStamp, displayAudio, displayVideo } from './display.js'
import { fetchSortedFiles } from './fetch.js'

const container = document.getElementById('text-files-container')

export async function renderFiles() {
  const sortedFiles = await fetchSortedFiles(content)

  let currentFolder = null
  let folderContainer = null

  for (const fileInfo of sortedFiles) {
    const currentDate = new Date(fileInfo.lastModified)

    // Extract folder name from file path (e.g., './content/skiing/file.txt' -> 'skiing')
    const pathParts = fileInfo.file.split('/')
    const folder = pathParts.length > 3 ? pathParts[2] : null

    // If folder changed, create a new folder container and show timestamp once
    if (folder !== currentFolder) {
      currentFolder = folder
      if (folder) {
        folderContainer = document.createElement('div')
        folderContainer.className = `folder-group folder-${folder}`
        folderContainer.setAttribute('data-folder', folder)
        container.appendChild(folderContainer)
      } else {
        folderContainer = null
      }
      // Display timestamp only once per folder
      const targetContainer = folderContainer || container
      displayTimeStamp(currentDate, targetContainer)
    }

    // Use folder container if file is in a subfolder, otherwise use main container
    const targetContainer = folderContainer || container

    if (fileInfo.fileType === 'TXT') {
      await displayText(fileInfo.file, targetContainer)
    } else if (fileInfo.fileType === 'IMAGE') {
      await displayImage(fileInfo.file, targetContainer)
    } else if (fileInfo.fileType === 'AUDIO') {
      await displayAudio(fileInfo.file, targetContainer)
    } else if (fileInfo.fileType === 'VIDEO') {
      await displayVideo(fileInfo.file, targetContainer)
    }
  }
}