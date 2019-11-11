export interface Supermercado {
    superMarketName: string,
    superMarketMainImage: string,
    superMarketAdditionalImages: string[],
    superMarketLocation: {
        street: string,
        number: number,
        district: string,
        city: string,
        state: string
        country: string,
        zip: number,
    },
    superMarketDescription: string,
    superMarketPhone: number
}

export interface SupermercadoLocation {
    street: string,
    number: number,
    district: string,
    city: string,
    state: string
    country: string,
    zip: number,
}
