export class FundAgency {

    constructor(
        public experimentId: string,
        public fundAgencyTypeId: string,
        public fundAgencyTypeOther: string,
        public fundAgencyTypeName: string,
        public fundAgencyTypeCenterId: string,
        public status: string,
        public fundAgencyId?: number,
    ) { }

}
