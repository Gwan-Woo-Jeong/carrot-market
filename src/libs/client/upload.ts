import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  StorageError,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import firebase from "../server/firebase";

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function uploadToFirebase({
  type,
  file,
  userId,
  limit,
  onComplete,
}: {
  type?: "avatar" | "product";
  file: FileList;
  userId: number;
  limit?: number;
  onComplete?: (url: string) => void;
}) {
  if (limit === undefined) {
    if (type === "avatar") {
      limit = 500000; // 500KB
    } else {
      limit = 1000000; // 1MB
    }
  }

  if (limit && file[0].size > limit) {
    return alert(`${type} image can not be bigger than ${formatBytes(limit)}`);
  }
  const firebaseStorage = getStorage(firebase);

  if (type === "avatar") {
    const listRef = ref(firebaseStorage, `images/${userId}/${type}s`);

    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef);
        });
        console.log("existing avatar deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const imageRef = ref(
    firebaseStorage,
    `images/${userId}/${type}s/${uuidv4()}`
  );

  const uploadTask = uploadBytesResumable(imageRef, file[0]);

  uploadTask.on(
    "state_changed",
    (snapshot: UploadTaskSnapshot) => {
      switch (snapshot.state) {
        case "paused":
          console.log(`Upload ${type} paused`);
          break;
        case "running":
          console.log(`Upload ${type} running`);
          break;
      }
    },
    (error: StorageError) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        if (onComplete) onComplete(url);
      });
    }
  );
}
