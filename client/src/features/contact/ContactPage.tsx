import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      toast.success("Message sent successfully!");
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Try again later.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Message" name="message" multiline rows={4} value={form.message} onChange={handleChange} margin="normal" />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Send</Button>
      </form>
    </Box>
  );
}
