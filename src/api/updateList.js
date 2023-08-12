import { database } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const updateList = async (list, id) => {
  try {
    await setDoc(doc(database, 'list', id), list)

    console.log('Succeed save list')
  } catch (e) {
    console.log('Error getting when saving document:', e)
  }
}

export default updateList
