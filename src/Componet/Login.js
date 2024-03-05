import React, { useContext } from 'react'
import { auth } from "../Config/firebase"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useState } from 'react'
import { db } from '../Config/firebase'
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import LoginInfoContext from '../Context/LogInContext'

export default function Login() {
  const [email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const { Myid, setMyid, UserName, setUserName } = useContext(LoginInfoContext)

  const user_ref = collection(db, "user")
  const navigate = useNavigate()

  const Handle_entry = async () => {
    try {
      const docRef = await addDoc(user_ref, {
        name: email
      })
      setMyid(docRef.id)
    } catch (error) {
      console.log(error)
    }
  }

  const SignIn = async () => {
    createUserWithEmailAndPassword(auth, email, Password).then((userCredential) => {
      const user = userCredential.user
      // console.log("created user", user)
      Handle_entry()
      setUserName(email)
      navigate("/")
    })
      .catch((error) => {
        console.log(error)
      })
  }

  const LogIn = async () => {
    // console.log("hey")
    signInWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        alert(error)
      })
  }

  const LogOut = async () => {
    try {
      await signOut(auth)
      setMyid("")
      setEmail("")
      setUserName("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <div className="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={(e) => { setEmail(e.target.value) }} />
                      <label className="form-label" htmlFor="typeEmailX">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e) => { setPassword(e.target.value) }} />
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={LogIn}>Login</button>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={SignIn}>Sign In</button>
                    {Myid != "" && <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={LogOut}>Logout</button>}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
