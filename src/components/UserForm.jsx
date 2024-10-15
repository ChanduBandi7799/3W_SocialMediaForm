// src/components/UserForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Upload each image to Firebase Storage and get the URLs
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `images/${image.name}`);
          const snapshot = await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return downloadURL;
        })
      );

      // Store form data in Firestore
      await addDoc(collection(db, "users"), {
        name: data.name,
        socialMedia: data.socialMedia,
        imageUrls, // Store the uploaded image URLs in Firestore
      });

      alert("Form submitted successfully!");

      // Reset the form and image state
      reset();
      setImages([]);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form.");
    }
  };

  // Handle image uploads
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Submission Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="socialMedia" style={styles.label}>Social Media Handle</label>
          <input
            id="socialMedia"
            type="text"
            {...register("socialMedia", { required: true })}
            placeholder="Enter your social media handle"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="images" style={styles.label}>Upload Images</label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={styles.input}
          />
          {images.length > 0 && (
            <div style={styles.imagePreview}>
              <p>Selected Images:</p>
              {images.map((image, index) => (
                <p key={index}>{image.name}</p>
              ))}
            </div>
          )}
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  imagePreview: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};

export default UserForm;
