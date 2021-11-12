import { CATEGORY_API } from '../constants/api.constants';
import { get } from './app.service';
import { Dropdown } from '../models/common.model';

export default class CommonService {

    onCheckValidForm = (props: any) => {
        for (const prop in props) {
            if (Object.keys(props[prop]).length === 0) {
                return false;
            } else {
                return true
            }
        }
    }

    renderTextCategory = (category: Dropdown[]) => {
        if (category) {
            return category.map((s, i) => i === category.length - 1 ? s.name : s.name + ', ');
        }
    }

    getCategories = async (callback: (data: Dropdown[]) => void) => {
        return callback(await get(CATEGORY_API.GET_ALL));
    }
}