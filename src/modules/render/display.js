export function displayImage(file, container) {
  return new Promise((resolve) => {
    const section = document.createElement("section");
    const img = document.createElement("img");
    img.src = file;
    img.alt = file;
    img.style.maxWidth = "100%";
    
    img.onload = () => {
      section.appendChild(img);
      container.appendChild(section);
      resolve();
    };
    
    img.onerror = () => {
      section.innerHTML = `<h2>${file}</h2><p style="color:red;">Could not load this image.</p>`;
      container.appendChild(section);
      resolve();
    };
  });
}

export async function displayText(file, container) {
  try {
    const response = await fetch(file);
    const content = await response.text();
    const section = document.createElement("section");
    section.innerHTML = `<pre class="text">${content}</pre>`;
    container.appendChild(section);
  } catch (err) {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${file}</h2><p style="color:red;">Could not load this file. ${err.message}</p>`;
    container.appendChild(section);
  }
}

const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };

export function displayTimeStamp(date, container) {
  const section = document.createElement("section");
  section.innerHTML = `<pre class="time-stamp">${date.toLocaleDateString(
    undefined,
    options
  )}</pre>`;
  container.appendChild(section);
}

export function displayAudio(file, container) {
  return new Promise((resolve) => {
    const section = document.createElement("section");
    const audio = document.createElement("audio");
    audio.src = file;
    audio.controls = true;

    audio.onloadedmetadata = () => {
      section.appendChild(audio);
      container.appendChild(section);
      resolve();
    };

    audio.onerror = () => {
      section.innerHTML = `<p class="media-error">Could not load audio: ${file}</p>`;
      container.appendChild(section);
      resolve();
    };
  });
}

export function displayVideo(file, container) {
  return new Promise((resolve) => {
    const section = document.createElement("section");
    const video = document.createElement("video");
    video.src = file;
    video.controls = true;

    video.onloadedmetadata = () => {
      section.appendChild(video);
      container.appendChild(section);
      resolve();
    };

    video.onerror = () => {
      section.innerHTML = `<p class="media-error">Could not load video: ${file}</p>`;
      container.appendChild(section);
      resolve();
    };
  });
}
