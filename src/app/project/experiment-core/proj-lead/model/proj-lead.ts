export class ProjLead {

  constructor(
    public experimentId: string,
    public projLeadOrgId: string,
    public projLeadOther: string,
    public projLeadCenterId: string,
    public projLeadCRPId: string,
    public projLeadPerson: string,
    public status: string,
    public projLeadId?: number,
  ) { }

}
