<div>
  <ul
    className="dropdown-menu dropdown-menu-end"
    aria-labelledby="navbarDropdownMenuAvatar"
  >
    <li>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {" "}
        Role
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Role Change</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>hello</div>
            <div>
              {/* <ul>
                  <li>Admin</li>
                  <li>User</li>
                </ul> */}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </li>
    <li>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleDelete(params.value)}
      >
        Delete
      </Button>
    </li>
  </ul>
</div>;
