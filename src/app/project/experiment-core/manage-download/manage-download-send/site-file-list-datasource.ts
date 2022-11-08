import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { SiteFile } from '../../site-file/model/site-file';

export class ExperimentListDataSource extends DataSource<SiteFile> {
  data: SiteFile[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<SiteFile[]> {
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

  private getPagedData(data: SiteFile[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: SiteFile[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'expSiteId': return compare(a.expSiteId, b.expSiteId, isAsc);
        case 'siteFileId': return compare(+a.siteFileId, +b.siteFileId, isAsc);
        case 'fileName': return compare(+a.fileName, +b.fileName, isAsc);
        case 'path': return compare(+a.path, +b.path, isAsc);
        case 'fileType': return compare(+a.fileType, +b.fileType, isAsc);
        case 'status': return compare(+a.status, +b.status, isAsc);
        case 'createdAt': return compare(+a.createdAt, +b.createdAt, isAsc);
        case 'modifiedAt': return compare(+a.modifiedAt, +b.modifiedAt, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
