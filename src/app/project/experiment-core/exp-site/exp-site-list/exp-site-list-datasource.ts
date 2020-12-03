import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ExpSiteFull } from '../model/exp-site';

export class ExperimentListDataSource extends DataSource<ExpSiteFull> {
  data: ExpSiteFull[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<ExpSiteFull[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() { }

  private getPagedData(data: ExpSiteFull[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ExpSiteFull[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {

        case 'expSiteId': return compare(a.expSiteId, b.expSiteId, isAsc);
        case 'experimentId': return compare(+a.experimentId, +b.experimentId, isAsc);
        case 'siteId': return compare(+a.siteId, +b.siteId, isAsc);
        case 'inHighLevelId': return compare(+a.inHighLevelId, +b.inHighLevelId, isAsc);
        case 'inHighLevelOther': return compare(+a.inHighLevelOther, +b.inHighLevelOther, isAsc);
        case 'inSiteVegetation': return compare(+a.inSiteVegetation, +b.inSiteVegetation, isAsc);
        case 'inSiteVegetationOther': return compare(+a.inSiteVegetationOther, +b.inSiteVegetationOther, isAsc);
        case 'inSiteDescNotes': return compare(+a.inSiteDescNotes, +b.inSiteDescNotes, isAsc);
        case 'soilClassSystemId': return compare(+a.soilClassSystemId, +b.soilClassSystemId, isAsc);
        case 'soilClassGroupId': return compare(+a.soilClassGroupId, +b.soilClassGroupId, isAsc);
        case 'soilClassSystemOther': return compare(+a.soilClassSystemOther, +b.soilClassSystemOther, isAsc);
        case 'croppingTypeId': return compare(+a.croppingTypeId, +b.croppingTypeId, isAsc);
        case 'prevCropNameId': return compare(+a.prevCropNameId, +b.prevCropNameId, isAsc);
        case 'intercropArrangementId': return compare(+a.intercropArrangementId, +b.intercropArrangementId, isAsc);
        case 'intercropValueRowCrop': return compare(+a.intercropValueRowCrop, +b.intercropValueRowCrop, isAsc);
        case 'prevCropNameOther': return compare(+a.prevCropNameOther, +b.prevCropNameOther, isAsc);
        case 'fieldbookId': return compare(+a.fieldbookId, +b.fieldbookId, isAsc);
        case 'experimentalDesignAbbr': return compare(+a.experimentalDesignAbbr, +b.experimentalDesignAbbr, isAsc);
        case 'treatment': return compare(+a.treatment, +b.treatment, isAsc);
        case 'siteCropsOn': return compare(+a.siteCropsOn, +b.siteCropsOn, isAsc);
        case 'createdAt': return compare(+a.createdAt, +b.createdAt, isAsc);
        case 'expId': return compare(+a.expId, +b.expId, isAsc);
        case 'experimentName': return compare(+a.experimentName, +b.experimentName, isAsc);
        case 'experimentProjectName': return compare(+a.experimentProjectName, +b.experimentProjectName, isAsc);
        case 'experimentStartDate': return compare(+a.experimentStartDate, +b.experimentStartDate, isAsc);
        case 'experimentEndDate': return compare(+a.experimentEndDate, +b.experimentEndDate, isAsc);
        case 'experimentType': return compare(+a.experimentType, +b.experimentType, isAsc);
        case 'experimentTypeOther': return compare(+a.experimentTypeOther, +b.experimentTypeOther, isAsc);
        case 'experimentObj': return compare(+a.experimentObj, +b.experimentObj, isAsc);
        case 'experimentGrantNumber': return compare(+a.experimentGrantNumber, +b.experimentGrantNumber, isAsc);
        case 'experimentGrantId': return compare(+a.experimentGrantId, +b.experimentGrantId, isAsc);
        case 'sId': return compare(+a.sId, +b.sId, isAsc);
        case 'siteTypeId': return compare(+a.siteTypeId, +b.siteTypeId, isAsc);
        case 'name': return compare(+a.name, +b.name, isAsc);
        case 'countryName': return compare(+a.countryName, +b.countryName, isAsc);
        case 'firstLevel': return compare(+a.firstLevel, +b.firstLevel, isAsc);
        case 'secondLevel': return compare(+a.secondLevel, +b.secondLevel, isAsc);
        case 'thirdLevel': return compare(+a.thirdLevel, +b.thirdLevel, isAsc);
        case 'fourthLevel': return compare(+a.fourthLevel, +b.fourthLevel, isAsc);
        case 'fifthLevel': return compare(+a.fifthLevel, +b.fifthLevel, isAsc);
        case 'nearestPopulatedPlace': return compare(+a.nearestPopulatedPlace, +b.nearestPopulatedPlace, isAsc);
        case 'latitude': return compare(+a.latitude, +b.latitude, isAsc);
        case 'longitude': return compare(+a.longitude, +b.longitude, isAsc);
        case 'elevation': return compare(+a.elevation, +b.elevation, isAsc);
        default: return 0;
      }
    });

  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
