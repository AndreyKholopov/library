import { database } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

const saveItem = async (item) => {
  try {
    const newItem = await addDoc(collection(database, 'item'), item)

    console.log('Succeed save item')

    return newItem
  } catch (e) {
    console.log('Error getting when saving document:', e)
  }
}

export default saveItem
