type Filters = {
    title: string;
    checkboxes: {
        checked: boolean;
        label: string;
        name: string;
    }[];
}[];

export default Filters;