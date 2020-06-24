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
        public prevCropNameOther: string,
        public fieldbookId: string,
        public status: string,
        public expSiteId?: number,
    ) { }


}

export class ExpSiteFull {

    constructor(
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
        public prevCropNameOther: string,
        public fieldbookId: string,
        public modifiedAt: string,

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

        public experimentId?: number,

    ) { }
}
