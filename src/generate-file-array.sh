#!/bin/bash

OUTPUT=modules/render/content.js
TARGET_DIR="./content"

echo "export const content = [" > $OUTPUT

# Generate array with file metadata including folder creation times
# Sort files by name for consistency
find $TARGET_DIR -type f | sort | while read -r file; do
  # Get the parent folder of the file
  parent_dir=$(dirname "$file")

  # Get folder creation time (birth time) as ISO string
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS - use %SB for birth time (creation time) of the parent folder
    mod_time=$(stat -f "%SB" -t "%Y-%m-%dT%H:%M:%SZ" "$parent_dir")
  elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    # Windows (Git Bash, MSYS2, Cygwin, or WSL)
    if command -v powershell.exe &> /dev/null; then
      # Use PowerShell to get creation time of the folder
      mod_time=$(powershell.exe -Command "(Get-Item '$parent_dir').CreationTime.ToString('yyyy-MM-ddTHH:mm:ssZ')" 2>/dev/null | tr -d '\r')
    elif command -v stat &> /dev/null; then
      # Fallback to stat - use modification time as creation time may not be available
      mod_time=$(stat -c "%w" "$parent_dir" 2>/dev/null || stat -c "%y" "$parent_dir" | sed 's/ /T/' | sed 's/\.[0-9]* /Z/' | sed 's/+[0-9]*/Z/')
    else
      # Last resort: use current date
      mod_time=$(date -Iseconds)
    fi
  else
    # Linux - use %w for birth time if available, fall back to modification time
    mod_time=$(stat -c "%w" "$parent_dir" 2>/dev/null | grep -v '-' || stat -c "%y" "$parent_dir" | sed 's/ /T/' | sed 's/\.[0-9]* /Z/' | sed 's/+[0-9]*/Z/')
  fi
  
  # Get file extension to determine type
  extension="${file##*.}"
  extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
  
  if [[ "$extension" == "txt" ]]; then
    file_type="TXT"
  elif [[ "$extension" =~ ^(jpg|jpeg|png|gif|webp|svg|bmp)$ ]]; then
    file_type="IMAGE"
  elif [[ "$extension" =~ ^(mp3|wav|ogg|m4a|flac|aac)$ ]]; then
    file_type="AUDIO"
  elif [[ "$extension" =~ ^(mp4|webm|mov|avi|mkv)$ ]]; then
    file_type="VIDEO"
  else
    file_type="null"
  fi
  
  # Properly escape single quotes in the file path for JavaScript
  escaped_file="${file//\'/\\\'}"
  
  echo "  { file: '$escaped_file', lastModified: '$mod_time', fileType: '$file_type' }," >> $OUTPUT
done

echo "];" >> $OUTPUT
echo "Wrote content array with metadata to $OUTPUT"