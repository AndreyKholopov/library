import { database } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const updateItem = async (item, id) => {
  try {
    await setDoc(doc(database, 'item', id), item)

    console.log('Succeed save item')
  } catch (e) {
    console.log('Error getting when saving document:', e)
  }
}

export default updateItem
