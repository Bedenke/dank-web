export interface NavigatorItem {
    url: string;
    label: string;
}
export interface NavigatorItemAttributes extends NavigatorItem {
    active: boolean;
}
export declare function NavigatorItemElement(attributes: NavigatorItemAttributes): BaseElement;
export default function Navigator(): BaseElement;
