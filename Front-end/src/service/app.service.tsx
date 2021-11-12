import Axios from "axios"
import AuthorizedService from "./authorized.service";

const authorService = new AuthorizedService();

const setHeader = () => {
    const headers = {
        'ContentType': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Authorization': "Bearer " + authorService.getToken(),
    }
    return headers;
}

const extend = { timeout: 10000 };

const get = async (url: string, config?: any) => {
    config = { ...config, extend };
    const result = await Axios.create({ headers: setHeader() })
        .get(url, config)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response;
        });

    return result
}

const post = async (url: string, body: any, config?: any) => {
    config = { ...config, extend };
    const result = await await Axios.create({ headers: setHeader() })
        .post(url, body, config)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response;
        });
    return result
}

export { get, post };