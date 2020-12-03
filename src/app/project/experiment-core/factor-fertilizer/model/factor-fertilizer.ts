export class FactorFertilizer {
  constructor(
    public siteFactorId: string,
    public expSiteId: string,
    public studyVariableId: string,
    public typeFertilizer: string,
    public indexOrder: string,
    public levelNameSplit: string,
    public productValue: string,
    public unit: string,
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
    public factorFertilizerId?: string
  ) { }
}
