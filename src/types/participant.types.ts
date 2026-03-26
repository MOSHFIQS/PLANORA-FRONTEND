

type Event ={
    id:string;
    title:string;
    dateTime:string;
}

export type Participant = {
    id: string;
    name:string;
    email:string;
    image:string
    events: Event[];
};