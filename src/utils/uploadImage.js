export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "gametracker_unsigned");
  formData.append("folder", "gametracker");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/da0q3v45b/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // esta será la URL que guardaremos en MongoDB
}
