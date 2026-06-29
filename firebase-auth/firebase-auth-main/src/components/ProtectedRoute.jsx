import React, { useState, useEffect, memo } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;
  if (user) return children;
  return <Navigate to="/" replace />;
}

export default memo(ProtectedRoute);
