export class CropProtocol {
  constructor(
    public siteCropId: string,
    public expSiteId: string,
    public studyVariableId: string,
    public cropId: string,
    public value: string,
    public unit: string,
    public indexOrder: string,
    public status: string,
    public cropProtocolId?: string,
    public measurement?: string,
  ) { }
}
