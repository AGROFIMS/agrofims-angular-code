export class Site {

    constructor(
        public sId: string,
        public siteTypeId: string,
        public name: string,
        public countryName: string,
        public firstLevel: string,
        public secondLevel: string,
        public thirdLevel: string,
        public fourthLevel: string,
        public fifthLevel: string,
        public nearestPopulatedPlace: string,
        public latitude: string,
        public longitude: string,
        public northeast: string,
        public southwest: string,
        public elevation: string,
        public status: string,
        public siteId?: string,
        public createdAt?: string,
        public emailAddress?: string,
    ) { }

}
