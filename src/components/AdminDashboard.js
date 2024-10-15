// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => doc.data());
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>
      <div style={styles.cardGrid}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.name}>{user.name}</h3>
              <p style={styles.socialMedia}>{user.socialMedia}</p>
              {user.imageUrls && user.imageUrls.length > 0 ? (
                <div style={styles.imageContainer}>
                  {user.imageUrls.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`User Upload ${i}`}
                      style={styles.image}
                    />
                  ))}
                </div>
              ) : (
                <p style={styles.noImageText}>No images uploaded</p>
              )}
            </div>
          ))
        ) : (
          <p style={styles.noUsers}>No users found</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    transition: "transform 0.3s ease",
    textAlign: "center",
  },
  cardHover: {
    transform: "translateY(-5px)",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#4CAF50",
  },
  socialMedia: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  imageContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  noImageText: {
    fontSize: "14px",
    color: "#888",
  },
  noUsers: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#888",
    fontSize: "18px",
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "20px",
    color: "#333",
  },
};

export default AdminDashboard;
