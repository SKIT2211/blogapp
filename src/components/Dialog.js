import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function AlertDialog({open,handleClose,data,onChange}) {
  
    const {title,description,category}=data
  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Add new blog
        </DialogTitle>
        <form>
            <TextField id='title' value={title} onChange={e=>onChange(e)} placeholder='Enter title here' label='Title' variant='outlined' margin='dense' fullWidth />
            <TextField id='description' value={description} onChange={e=>onChange(e)} placeholder='Enter description here' label='Description' variant='outlined' margin='dense' fullWidth />
            <TextField id='category' value={category} onChange={e=>onChange(e)} placeholder='Enter category here' label='Category' variant='outlined' margin='dense' fullWidth />
        </form>
        <DialogActions>
          <Button onClick={handleClose} color='secondary' variant='outlined'>Cancel</Button>
          <Button  color='primary' variant='contained'>
           Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}