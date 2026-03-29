


export type Participant = {
    id: string;
    name: string;
    email: string;
    image: string
    events: {
        id: string;
        title: string;
        dateTime: string;
    }[];
};