import {Alert, Snackbar} from '@mui/material';
import {useSelector} from 'react-redux';
import {selectNotification} from '../selectors/notificationSelectors';

const NotificationCentral = () => {

    const notification = useSelector(selectNotification);
    const {isOpen, color, message} = notification;

    return (
        <Snackbar open={isOpen} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert severity={color} aria-label={message}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default NotificationCentral;