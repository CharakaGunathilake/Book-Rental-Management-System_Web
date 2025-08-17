type AddressRequestDto = {
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    city: string;
    postalCode?: string;
}

type AddressResponseDto = {
    id: number;
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    city: string;
    postalCode?: string;
}

export type { AddressRequestDto, AddressResponseDto }