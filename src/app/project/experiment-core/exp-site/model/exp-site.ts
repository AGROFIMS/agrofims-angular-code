export class ExpSite {

    constructor(
        public experimentId: string,
        public siteId: string,
        public inHighLevelId: string,
        public inHighLevelOther: string,
        public inSiteVegetation: string,
        public inSiteVegetationOther: string,
        public inSiteDescNotes: string,
        public soilClassSystemId: string,
        public soilClassGroupId: string,
        public soilClassSystemOther: string,
        public status: string,
        public expSiteId?: number,
    ) { }

}
