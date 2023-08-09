
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const loginUser = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)

    const credential = GoogleAuthProvider.credentialFromResult(result);

    const token = credential.accessToken;
    const user = result.user;
    return { token, user }
  } catch (e) {
    const errorMessage = e.message;
    console.log(errorMessage)
  }
}

export default loginUser