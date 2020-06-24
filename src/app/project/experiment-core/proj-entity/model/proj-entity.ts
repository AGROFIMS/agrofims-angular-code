export class ProjEntity {

  constructor(
    public experimentId: string,
    public projEntityOrgId: string,
    public projEntityOther: string,
    public projEntityName: string,
    public projEntityCenterId: string,
    public projEntityCrpId: string,
    public status: string,
    public projEntityId?: number,
  ) { }

}
