import { useState, useEffect } from "react";
import { useStateValue } from "./reducer/app.reducer";
import { ACTION_TYPE } from "../constants/actionTypes";
import { SnackbarModel } from "../models/common.model";

function useFetch(url: string, options?: any) {
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState(null);
    const setLoading: any = useLoading();

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(url, options);
            const json = await response.json();
            setData(json);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    }

    return [data, error, fetchData];
}


const useLoading = (loading?: boolean) => {

    const [state, dispatch]: any = useStateValue();

    const setLoading = (isLoading: boolean) => {
        return dispatch({ type: ACTION_TYPE.LOADING, data: loading ? loading : isLoading })
    }
    return setLoading;
}

const useSnackbar = () => {
    const [state, dispatch]: any = useStateValue();

    const setSnackbar = (data: SnackbarModel) => {
        return dispatch({ type: ACTION_TYPE.SHOW_SNACKBAR, data: { ...data, open: true } })
    }
    return setSnackbar;
}

export { useFetch, useLoading, useSnackbar };