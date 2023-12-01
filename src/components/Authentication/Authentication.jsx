import React, { useEffect, useState } from "react";
import { auth, googleAuth } from "../FireBase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  g,
} from "firebase/auth";
import { db } from "../FireBase/Firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [movieList, setMovieList] = useState([]);

  //Add movie
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [isOwnOscar, setIsOwnOscar] = useState(false);

  //update movie title
  const [updatedTitle, setUpdatedTitle] = useState("");
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(email, password);
      setUser(email);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      setUser(auth.currentUser.email);
      setUserProfile(auth.currentUser.photoURL);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignOut = async () => {
    await signOut(auth);
    alert("You are Logout...");
    setUser("");
    setUserProfile(null);
  };

  const forgetPassword = async () => {
    await sendPasswordResetEmail(auth, "rajeshkorlapati465@gmail.com");
    alert("Reset Mail Is Send to Your account.. ");
  };

  const movieListRef = collection(db, "movies");

  //user credentials in console
  console.log(auth?.currentUser?.email, auth?.currentUser?.photoURL);
  console.log(user);

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieListRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, [user]);

  const addMovie = async () => {
    try{
        await addDoc(movieListRef, {
            MovieName: movieName,
            MovieReleaseDate: releaseDate,
            isOwnOscar: isOwnOscar,
            userId:auth?.currentUser?.uid // current auth id
          });
          getMovieList();
    }
    catch(err){
        console.error(err)
    }
   
  };
  console.log(user);

  const removeMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { MovieName: updatedTitle });
    getMovieList();
  };
  return (
    <div>
      <div
        style={{
          display: user ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <p style={{ display: "inline-block", margin: 0 }}>{user}</p>
        <img
          src={userProfile}
          width={50}
          style={{ borderRadius: "50%", margin: "4px" }}
          alt="Userimage"
        />
        {user ? <button onClick={() => handleSignOut()}>Sign Out</button> : ""}
      </div>

      <br />
      <div style={{ display: !user ? "block" : "none" }}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => forgetPassword()}>Forgot Password</button>
        <button disabled={user} onClick={() => signIn()}>
          Sign In
        </button>
        <br />
        <button onClick={() => signInWithGoogleAuth()}>
          Sign in With Google
        </button>
      </div>

      <hr />
      <div>
        <input
          type="text"
          placeholder="Movie Name"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          value={isOwnOscar}
          onChange={(e) => setIsOwnOscar(e.target.checked)}
        />
        <polygon>Received Oscar</polygon>
        <button
          onClick={() => {
            addMovie();
          }}>
          Add Movie
        </button>
      </div>
      {movieList.map((movie) => (
        <div>
          <h1 style={{ color: movie.isOwnOscar ? "green" : "red" }}>
            {movie.MovieName}
          </h1>
          <p>Date : {movie.MovieReleaseDate}</p>
          <button onClick={() => removeMovie(movie.id)}>Remove</button>
          <input
            placeholder="update Title"
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button onClick={() => updateTitle(movie.id)}>Update title</button>
        </div>
      ))}
    </div>
  );
};

export default Authentication;
