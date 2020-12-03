export class CropPhenology {
  constructor(
    public siteCropId: string,
    public expSiteId: string,
    public studyVariableId: string,
    public cropId: string,
    public parameterMeasured: string,
    public unit: string,
    public status: string,
    public cropPhenologyId?: string,
    public measurement?: string,
  ) { }
}
