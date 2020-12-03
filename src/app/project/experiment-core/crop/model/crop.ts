export class Crop {

    constructor(
        public numOrder: string,
        public cropCommonName: string,
        public fatherCropId: string,
        public isFather: string,
        public locked: string,
        public status: string,
        public modifiedAt?: string,
        public cropId?: number
    ) { }

}
