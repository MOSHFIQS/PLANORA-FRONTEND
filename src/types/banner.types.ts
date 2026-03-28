export enum BannerPosition {
     MAIN = "MAIN",
     SECONDARY = "SECONDARY",
     THIRD = "THIRD",
}

export enum EventType {
     ONLINE = "ONLINE",
     OFFLINE = "OFFLINE"
}

export interface Banner {
     id: string;
     title: string;
     description: string;
     image: string;
     redirectUrl: string;
     position: BannerPosition;
     positionOrder: number;
     dateTime: Date;
     type: EventType;
     isActive: boolean;
     altText: string;
     buttonText: string;
}
