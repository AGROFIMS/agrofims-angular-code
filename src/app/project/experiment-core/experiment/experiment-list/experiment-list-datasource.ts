import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Experiment } from '../model/experiment';

export class ExperimentListDataSource extends DataSource<Experiment> {
  data: Experiment[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<Experiment[]> {
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

  private getPagedData(data: Experiment[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Experiment[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'expId': return compare(a.expId, b.expId, isAsc);
        case 'experimentId': return compare(+a.experimentId, +b.experimentId, isAsc);
        case 'experimentName': return compare(+a.experimentName, +b.experimentName, isAsc);
        case 'experimentProjectName': return compare(+a.experimentProjectName, +b.experimentProjectName, isAsc);
        case 'experimentStartDate': return compare(+a.experimentStartDate, +b.experimentStartDate, isAsc);
        case 'experimentEndDate': return compare(+a.experimentEndDate, +b.experimentEndDate, isAsc);
        case 'experimentType': return compare(+a.experimentType, +b.experimentType, isAsc);
        case 'experimentTypeOther': return compare(+a.experimentTypeOther, +b.experimentTypeOther, isAsc);
        case 'experimentObj': return compare(+a.experimentObj, +b.experimentObj, isAsc);
        case 'experimentGrantNumber': return compare(+a.experimentGrantNumber, +b.experimentGrantNumber, isAsc);
        case 'experimentGrantId': return compare(+a.experimentGrantId, +b.experimentGrantId, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
