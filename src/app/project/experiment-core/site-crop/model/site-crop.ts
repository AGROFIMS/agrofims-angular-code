import { Crop } from '../../crop/model/crop';

export class SiteCrop {
  constructor(
    public expSiteId: string,
    public cropTitle: string,
    public cropId: string,
    public cropSonId: string,
    public croppingTypeId: string,
    public cropCommonNameOther: string,
    public varietyName: string,
    public intercropValueRowCrop: string,
    public status: string,
    public siteCropId?: string,
    public cropCommonName?: string,
    public cropLabel?: string,
  ) { }
}


