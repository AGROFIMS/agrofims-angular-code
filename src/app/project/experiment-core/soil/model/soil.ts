export class Soil {
  constructor(
    public expSiteId: string,
    public studyVariableId: string,
    public parameterMeasured: string,
    public unit: string,
    public depth: string,
    public depthUnit: string,
    public samplesPerSeason: string,
    public samplesPerPlot: string,
    public timing: string,
    public timingDaysAfterPlanting: string,
    public timingFrequency: string,
    public timingDate: string,
    public timingGrowthStage: string,
    public timingOther: string,
    public status: string,
    public soilId?: string,
    public measurement?: string,
  ) { }
}
