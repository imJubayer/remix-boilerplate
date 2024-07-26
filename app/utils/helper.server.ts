import fs from "fs";
import path from "path";

import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  UploadHandler,
} from "@remix-run/node";

export const SUPPORTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];

export const SUPPORTED_MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const FILE_UPLOAD_PATH = "/public/upload";

export const getDateTime = (): string => {
  const dateTime = new Date();

  const year = String(dateTime.getFullYear());
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  const seconds = String(dateTime.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export const fileUploadHandler: UploadHandler = unstable_composeUploadHandlers(
  unstable_createFileUploadHandler({
    maxPartSize: SUPPORTED_MAX_IMAGE_SIZE,
    file: ({ filename }) => getDateTime() + filename,
    directory: "./public/upload",
  }),
  unstable_createMemoryUploadHandler(),
);

export async function uploadFile(
  file: File,
  subfolder?: string,
): Promise<string> {
  const fileContent = new Uint8Array(await file.arrayBuffer());
  const fileNameAfterUpload = getDateTime() + file.name;

  let folderToUpload = path.resolve("./public/uploads");

  if (subfolder) {
    folderToUpload = path.join(folderToUpload, subfolder);

    if (!fs.existsSync(folderToUpload)) {
      fs.mkdirSync(folderToUpload, { recursive: true });
    }
  }

  fs.writeFileSync(path.join(folderToUpload, fileNameAfterUpload), fileContent);

  let fileFolderNameUnderUploads = folderToUpload.split("/");
  fileFolderNameUnderUploads.push(fileNameAfterUpload);

  fileFolderNameUnderUploads = fileFolderNameUnderUploads.splice(
    fileFolderNameUnderUploads.indexOf("uploads") + 1,
  );

  return fileFolderNameUnderUploads.join("/");
}
