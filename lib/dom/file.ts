type TFileResponse = "arraybuffer" | "binarystring" | "dataurl" | "text"

export interface FileResponse {
  file: File,
  type: TFileResponse,
  reader: FileReader,
  response: string | ArrayBuffer
}

export type FileBeforeLoad = (element: FileReader) => void

export function loadFile(file: File, type: TFileResponse, beforeLoad?: FileBeforeLoad) {
  return new Promise<FileResponse>((resolve, reject) => {
    const reader = new FileReader()
    if (typeof beforeLoad === "function") beforeLoad(reader)
    reader.addEventListener("error", reject, { once: true })
    reader.addEventListener("load", () => {
      if (!reader.result) {
        reject('[FileReader] No result found')
        return
      }

      resolve({
        file,
        type,
        reader,
        response: reader.result
      })
    }, { once: true })

    if (type == 'arraybuffer') {
      reader.readAsArrayBuffer(file)
    } else if (type == 'binarystring') {
      reader.readAsBinaryString(file)
    } else if (type == 'dataurl') {
      reader.readAsDataURL(file)
    } else if (type == 'text') {
      reader.readAsText(file)
    }
  })
}