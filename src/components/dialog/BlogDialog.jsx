import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function BlogDialog({
  open,
  handleClose,
  data,
  setFormData,
  onChange,
  handleFormSubmit,
}) {
  const { id, title, description, author, category } = data;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id ? "Update your Blog" : "Add new blog"}
        </DialogTitle>
        <form>
          <TextField
            id="title"
            value={title}
            onChange={(e) => onChange(e)}
            placeholder="Enter title here"
            label="Title"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="description"
            value={description}
            onChange={(e) => onChange(e)}
            placeholder="Enter description here"
            label="Description"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="author"
            value={author}
            onChange={(e) => onChange(e)}
            placeholder="Enter your name"
            label="Author"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="category"
            value={category}
            onChange={(e) => onChange(e)}
            placeholder="Enter category here"
            label="Category"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...data, picture: e.target.files[0] })
            }
            type="file"
            variant="outlined"
            margin="dense"
          />
        </form>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleFormSubmit()}
            color="primary"
            variant="contained"
          >
            {id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
