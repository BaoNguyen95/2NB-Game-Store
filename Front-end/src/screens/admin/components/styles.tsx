import { makeStyles } from "@material-ui/styles";
import { MaterialBoxShadow } from "../../../shared/material-styles/styles";

export const productDialogStyles = makeStyles({
    container: {
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        paddingBottom: 20
    },
    image: {
        display: 'flex',
    },
    imageContent: {
        height: 300,
        width: '100%',
        marginBottom: 10,
        ...MaterialBoxShadow,
    },
    imageEmptyContent: {
        height: 100,
        width: '100%',
        marginBottom: 10,
        border: '1.5px dashed #292e49',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        ...MaterialBoxShadow,
        display: 'flex',
    },
    imageEmpty: {
        display: 'none'
    },
    textChooseFile: {
        cursor: 'pointer',
        color: '#292e49',
        marginRight: 5,
        textDecoration: 'underline dotted',
        fontWeight: 'bold',
        '&:hover': {
            fontWeight: 'bold',
            color: '#00a19c'
        },
        transition: '0.2s',

    },
    removeImageIcon: {
        position: 'absolute',
        justifyContent: 'flex-end',
        marginLeft: '83%',
    },
    deleteIcon: {
        color: 'white',
    },
    expansion: {
        display: 'flex',
        flexDirection: 'column'
    }
});