import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


import { ExpSite } from '../model/exp-site';

export class DataTableDataSource extends DataSource<ExpSite> {
  data: ExpSite[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<ExpSite[]> {
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

  private getPagedData(data: ExpSite[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ExpSite[]) {
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
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
