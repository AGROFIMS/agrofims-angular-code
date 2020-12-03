import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Site } from '../model/site';


export class SiteListDataSource extends DataSource<Site> {
  data: Site[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<Site[]> {

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

  private getPagedData(data: Site[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Site[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'sId': return compare(a.sId, b.sId, isAsc);
        case 'siteId': return compare(+a.siteId, +b.siteId, isAsc);
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
        case 'status': return compare(+a.status, +b.status, isAsc);
        case 'createdAt': return compare(+a.createdAt, +b.createdAt, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
