export class Weather {
  constructor(
    public expSiteId: string,
    public studyVariableId: string,
    public parameterMeasured: string,
    public unit: string,
    public samplesPerSeason: string,
    public timing: string,
    public timingDaysAfterPlanting: string,
    public timingFrequency: string,
    public timingDate: string,
    public timingGrowthStage: string,
    public timingOther: string,
    public status: string,
    public weatherId?: string,
    public measurement?: string,
  ) { }
}
