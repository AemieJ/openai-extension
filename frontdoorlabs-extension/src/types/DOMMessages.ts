export type SelectedMessage = {
    type: 'GET_SUMMARY';
    tab: any;
};

export type AddMessage = {
    type: 'ADD_SUMMARY';
    summary: string;
};

export type DOMMessageResponse = {
    text: string | null;
};
