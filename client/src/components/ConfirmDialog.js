import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

const ConfirmDialog = (
    {
        title,
        content,
        isOpen,
        onClose,
        onConfirm
    }
) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                {title}
            </DialogTitle>
            {
                content &&
                <DialogContent>
                    {content}
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="info">Cancel</Button>
                <Button onClick={onConfirm} variant="contained" color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;