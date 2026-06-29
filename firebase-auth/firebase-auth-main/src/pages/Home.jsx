import React, { useState, useEffect, memo } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, get, child } from "firebase/database";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;

      if (currentUser) {
        try {
          const dbRef = ref(db);
          const snapshot = await get(child(dbRef, `users/${currentUser.uid}`));
          if (isMounted && snapshot.exists()) {
            setUserData(snapshot.val());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (isMounted) setError("Failed to load user data");
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        if (isMounted) {
          setLoading(false);
          navigate("/");
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigate]);

  const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await signOut(auth);
      navigate("/");
    }
  };

  return (
    <main className="home">
      <h1>Welcome Home</h1>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading your profile...</p>
      ) : userData ? (
        <div className="user-info">
          <p className="welcome-text">
            Welcome, <strong>{userData.displayName || userData.username}</strong>!
          </p>
          <div className="user-details">
            <p><strong>Full Name:</strong> {userData.fullName || userData.displayName || "N/A"}</p>
            <p><strong>Username:</strong> @{userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No user data found</p>
      )}

      <div className="actions">
        <button className="logout" onClick={logout} aria-label="Log out">
          Logout
        </button>
      </div>
    </main>
  );
}

export default memo(Home);