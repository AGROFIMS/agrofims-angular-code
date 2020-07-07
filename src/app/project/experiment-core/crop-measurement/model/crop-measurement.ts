export class CropMeasurement {
  constructor(
    public siteCropId: string,
    public expSiteId: string,
    public experimentId: string,
    public siteId: string,
    public studyVariableId: string,
    public parameterMeasured: string,
    public unit: string,
    public samplesPerSeason: string,
    public samplesPerPlot: string,
    public timing: string,
    public timingDaysAfterPlanting: string,
    public timingFrequency: string,
    public timingDate: string,
    public timingGrowthStage: string,
    public timingOther: string,
    public status: string,
    public cropMeasurementId?: string,
    public measurement?: string,
  ) { }
}
