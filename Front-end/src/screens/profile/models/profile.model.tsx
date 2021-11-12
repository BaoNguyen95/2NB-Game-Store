import { RadioModel } from "../../../shared/models/shared.component.model";

export interface ProfileMenuItem {
    label: string;
    icon: any;
}

export const GENDER: RadioModel[] = [{ value: true, label: 'Male' }, { value: false, label: 'Female' }];