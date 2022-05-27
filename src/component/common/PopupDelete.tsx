import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useParams } from 'react-router-dom';
import './popupDelete.scss';

interface DialogProps {
  openProps: boolean;
  handleClose: () => void;
  id: number | undefined;
  handleDelete: (id: number | undefined) => void;
}

const PopupDelete = ({ openProps, handleClose, id, handleDelete }: DialogProps) => {
  const params = useParams();

  return (
    <Dialog open={openProps} onClose={handleClose} fullWidth>
      <DialogTitle>{'Confirm Delete'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete {params['*']} #{id} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="Disagree-btn">
          Cancel
        </Button>
        <Button onClick={() => handleDelete(id)} autoFocus className="Agree-btn">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupDelete;
