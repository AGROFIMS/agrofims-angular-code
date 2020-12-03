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
        public croppingTypeId: string,
        public prevCropNameId: string,
        public intercropArrangementId: string,
        public intercropValueRowCrop: string,
        public prevCropNameOther: string,

        public siteOrientation: string,
        public siteSlope: string,

        public fieldbookId: string,
        public experimentalDesignAbbr: string,
        public treatment: string,
        public status: string,
        public expSiteId?: string,
        public siteCropsOn?: string,
        public emailAddress?: string,
    ) { }


}


export class ExpSiteFull {

    constructor(
        // exp-site
        public inHighLevelId: string,
        public inHighLevelOther: string,
        public inSiteVegetation: string,
        public inSiteVegetationOther: string,
        public inSiteDescNotes: string,
        public soilClassSystemId: string,
        public soilClassGroupId: string,
        public soilClassSystemOther: string,
        public croppingTypeId: string,
        public prevCropNameId: string,
        public intercropArrangementId: string,
        public intercropValueRowCrop: string,
        public prevCropNameOther: string,

        public siteOrientation: string,
        public siteSlope: string,

        public fieldbookId: string,
        public experimentalDesignAbbr: string,
        public treatment: string,
        public siteCropsOn: string,
        public modifiedAt: string,
        // experiment
        public expId: string,
        public experimentName: string,
        public experimentProjectName: string,
        public experimentStartDate: string,
        public experimentEndDate: string,
        public experimentType: string,
        public experimentTypeOther: string,
        public experimentObj: string,
        public experimentGrantNumber: string,
        public experimentGrantId: string,
        // site
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
        public elevation: string,

        public experimentId?: string,
        public expSiteId?: string,
        public siteId?: string,
        public createdAt?: string,
        public status?: string,
        public emailAddress?: string, // from experiment

    ) { }
}
