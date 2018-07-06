export interface PostAttributes {
    id: string;
    title: string;
    body: string;
}
export declare function PostLink(attributes: PostAttributes): BaseElement;
export declare function PostView(attributes: PostAttributes): BaseElement;
