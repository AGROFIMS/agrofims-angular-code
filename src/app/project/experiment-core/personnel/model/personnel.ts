export class Personnel {

  constructor(
    public experimentId: string,
    public personTypeId: string,
    public personTypeOther: string,
    public personFirstName: string,
    public personLastName: string,
    public personEmailAddress: string,
    public personAffiliationId: string,
    public personAffiliationName: string,
    public personAffiliationNameOther: string,
    public personAffiliationCenterId: string,
    public personOrcid: string,
    public status: string,
    public personId?: number,
  ) { }

}
