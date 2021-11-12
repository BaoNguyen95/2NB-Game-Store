import { makeStyles } from "@material-ui/styles";
import { MaterialBoxShadow, AppStyleMainLinear, MaterialBoxShadowHover } from "../../../shared/material-styles/styles";

export const ProductDetailStyle = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    detailContent: {
        padding: 20,
        flex: 2,
        marginRight: 10
    },
    topContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    shopIcon: {

    },
    imageContent: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30
    },
    image: {
        borderRadius: 3,
        ...MaterialBoxShadow
    },
    tabContent: {
        ...AppStyleMainLinear,
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: 'white',
    },
    relateProduct: {
        padding: 20,
        flex: 1,
        overflow: 'auto',
        height: 'auto'
    },
    relateProContent: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
    },
    relateItem: {
        borderRadius: 4,
        cursor: 'pointer',
        ...MaterialBoxShadowHover
    },
    titleRelate: {
        display: 'flex',
    },
    trailerContent: {
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
    },
    trailer: {
        width: 700,
        height: 394,
        ...MaterialBoxShadow
    }
})