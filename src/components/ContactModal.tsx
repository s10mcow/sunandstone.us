import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FormEvent, useState } from "react";

export default function ContactModal({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        // eslint-disable-next-line
        console.log("Form successfully submitted");
        alert("Thank you! We'll get back to you within 24 hours.");
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error("Form submission error:", error);
        alert(
          "There was an error submitting your form. Please try again or call us directly.",
        );
      });
    setLoading(false);
    handleClose(); // Close the modal upon form submission
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To send us a message, please fill out the following form:
        </DialogContentText>
        <form onSubmit={handleSubmit} name="contact" method="POST">
          <input type="hidden" name="form-name" value="contact" />
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
            id="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            name="phone"
            required
          />
          <TextField
            margin="dense"
            id="propertyCounty"
            label="Property County"
            type="text"
            fullWidth
            variant="outlined"
            name="propertyCounty"
          />
          <TextField
            margin="dense"
            id="propertyAddress"
            label="Property Address or APN"
            type="text"
            fullWidth
            variant="outlined"
            name="propertyAddress"
          />
          <TextField
            margin="dense"
            id="message"
            label="Notes or letter offer code"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="message"
          />
          <FormControlLabel
            control={<Checkbox id="acceptTerms" name="acceptTerms" />}
            label="I concent to receive text messages from San and Stone"
          />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              Send
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
