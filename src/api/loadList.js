import { database } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const loadList = async () => {
  try {
    const querySnapshot = await getDocs(collection(database, 'list'))

    console.log('Succeed load list')

    const data = []

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    return data
  } catch (e) {
    console.log('Error getting cached document:', e)
  }
}

export default loadList
