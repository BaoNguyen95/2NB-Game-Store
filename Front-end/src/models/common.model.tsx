
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

export interface Dropdown {
    _id: string;
    name: string;
    disabled?: boolean;
}

export interface Product {
    id?: string;
    _id?: string;
    name: string;
    categoryId: Dropdown[];
    description: string;
    category: Dropdown[];
    release_year: string;
    image: Image;
}

export interface Image {
    id?: string;
    file: Blob | string;
    foreignId: string;
}

export class GridSetting {
    PageIndex: number;
    PageSize: number;
    SortColumn: string;
    SortOrder: string;
    Slice: number;
    constructor() {
        this.PageIndex = 0;
        this.PageSize = 8;
        this.SortColumn = "UpdatedAt";
        this.SortOrder = "Descending";
        this.Slice = 0;
    }
}

export interface Pagination {
    onChangePage: any,
    onChangeRowsPerPage: any,
    total: number,
    gridSetting: GridSetting,
    rowsPerPage: number[],
}

export class SnackbarModel {
    message: string;
    variant: any;
    open: boolean;
    onClose?: any;

    constructor() {
        this.message = '';
        this.variant = typeof variantIcon;
        this.open = false;
    }
}

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export const initSnackbarState = {
    message: '',
    variant: 'success',
    open: false,
}

export class Cart {
    total: string;
    result: Array<any>;
    constructor() {
        this.total = '';
        this.result = [];
    }
}