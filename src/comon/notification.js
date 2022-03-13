import React from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Notification(props) {
    const { type, tittle } = props

    const createNotification = (type) => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('Success message', 'Title here');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                NotificationManager.error('Error message', 'Click me!', 5000, () => {
                    alert('callback');
                });
                break;
            default: break;
        }
    }
    return (
        <div>
            <button className='btn btn-success'
                onClick={createNotification('success')}>
            </button>

        </div>
    )
}
