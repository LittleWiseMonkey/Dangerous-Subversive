import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    root:
    {
        maxWidth: '100%',
        minWidth: '275px',
        minHeight: '575px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        color: 'white'
    },
    media:
    {
        height: '159px',
        paddingTop: '50%', 
    },
    cardActions:
    {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        color: 'white'
    },
    cardContent:
    {
        display: 'flex',
        justifyContent: 'space-between',
    },
    addToCart:
    {
        color:'rgba(255,255,255,0.5)'
    },

    select:
    {
        color: 'white',
        backgroundColor: 'white'
    }
}));