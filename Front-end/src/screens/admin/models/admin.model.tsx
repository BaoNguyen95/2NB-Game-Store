import { Image, Dropdown } from "../../../models/common.model";

export interface ProductManage {
    _id: string;
    name: string;
    categoryId: Dropdown[];
    description: string;
    category: Dropdown[];
    release_year: string;
    image: Image;
    isChecked?: boolean,
    userId?: string,
    price: any,
    discountPercent: any,
}

export interface TrailerModel {
    id?: string;
    url: string;
    productId?: string;
}

export interface ManageProductDialog {
    onOpen: boolean,
    onClose: (event: React.MouseEvent<unknown>) => void;
    onBackdropClick?: (event: React.MouseEvent<unknown>) => void;
    mode?: string,
    onClickSubmit: Function;
    itemEdit: ProductManage;
    onClickDelete: Function;
    onDeleteImageFile: Function;
}
