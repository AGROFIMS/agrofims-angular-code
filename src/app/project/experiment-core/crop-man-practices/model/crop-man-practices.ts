export class CropManPractices {
  constructor(
    public siteCropId: string,
    public expSiteId: string,
    public studyVariableId: string,
    public groupManPractices: string,
    public cropId: string,
    public croppingTypeId: string,
    public value: string,
    public valueOther: string,
    public manPracticeType: string,
    public unit: string,
    public indexOrder: string,
    public protocol: string,
    public managementMeasurement: string,
    public status: string,
    public cropManPracticesId?: string,
    public measurement?: string,
  ) { }
}
