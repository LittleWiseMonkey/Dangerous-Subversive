import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    media: {
        height: 350,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // color: 'white'
    },
    card:
    {
        maxWidth: '100%',
        minWidth: '275px',
        minHeight: '600px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: 'white'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cartActions: {
        justifyContent: 'space-between',
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
    btn:
    {
        color: 'white'
    }
}));