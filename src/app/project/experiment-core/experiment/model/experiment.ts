export class Experiment {

    constructor(
        public expId: string,
        public experimentName: string,
        public experimentProjectName: string,
        public experimentStartDate: string,
        public experimentEndDate: string,
        public experimentType: string,
        public experimentTypeOther: string,
        public experimentObj: string,
        public experimentGrantNumber: string,
        public experimentGrantId: string,
        public status: string,
        public experimentId?: number,
    ) { }

}
