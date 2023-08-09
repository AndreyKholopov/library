import { database } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

const loadItem = async (id) => {
  try {
    const docSnap = await getDoc(doc(database, "item", id))

    if (!docSnap.exists()) throw new Error("This item not exist")
    
    console.log("Succeed load item")

    const data = {
      id: docSnap.id,
      ...docSnap.data()
    }
    
    return data
  } catch (e) {
    console.log("Error getting cached document:", e)
  }

}

export default loadItem