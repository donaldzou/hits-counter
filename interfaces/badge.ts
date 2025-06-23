export interface Badge{
    url: string,
    label: string,
    icon: string,
    color: string,
    message: string,
    style: "plastic" | "flat" | "flat-square" | "for-the-badge" | "social" | undefined
    tz: string
}