export class SiteFile {

  constructor(
    public expSiteId: string,
    public fileName: string,
    public path: string,
    public fileType: string,
    public fbappDisabled: string,
    public kdxDisabled: string,
    public odkDisabled: string,
    public status: string,
    public siteFileId?: string,
    public createdAt?: string,
    public modifiedAt?: string,
  ) { }

}
