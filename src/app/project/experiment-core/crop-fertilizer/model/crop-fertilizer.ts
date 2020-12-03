export class CropFertilizer {
  constructor(
    public siteCropId: string,
    public expSiteId: string,
    public cropId: string,
    public typeFertilizer: string,
    public indexOrder: string,
    public studyVariableId: string,
    public productValue: string,
    public unit: string,
    public unitId: string,
    public unitValue: string,
    public elementList: string,
    public elementListGroup: string,
    public timing: string,
    public timingDaysAfterPlanting: string,
    public timingFrequency: string,
    public timingDate: string,
    public timingGrowthStage: string,
    public timingOther: string,
    public techniqueId: string,
    public techniqueOther: string,
    public tractionId: string,
    public tractionOther: string,
    public calculateValue: string,
    public status: string,
    public cropFertilizerId?: string
  ) { }
}
