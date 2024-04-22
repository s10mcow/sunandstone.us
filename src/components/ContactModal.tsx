import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent } from "react";

export default function ContactModal({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    });
    // You can handle submission logic here, such as sending data to a backend server
    handleClose(); // Close the modal upon form submission
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To send us a message, please fill out the following form:
        </DialogContentText>
        <form
          onSubmit={handleSubmit}
          noValidate
          name="contact"
          method="POST"
          data-netlify="true"
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            required
          />
          <TextField
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="message"
            required
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
