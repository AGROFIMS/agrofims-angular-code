import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { StudyVariable } from '../../study-variable/model/study-variable';



export class StudyVariableDataSource extends DataSource<StudyVariable> {
  data: StudyVariable[];
  paginator: MatPaginator;
  sort: MatSort;
  filter: string;

  constructor() {
    super();
  }

  connect(): Observable<StudyVariable[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(
        this.getSortedData(
          this.getFilteredData(
            [...this.data]
          )
        )
      );
      // return this.getPagedData(this.getSortedData(
      //   [...this.data]
      // ));
    }));
  }

  disconnect() { }

  private getPagedData(data: StudyVariable[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: StudyVariable[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'studyVariableId': return compare(a.studyVariableId, b.studyVariableId, isAsc);
        case 'cropName': return compare(a.cropName, b.cropName, isAsc);
        case 'measurement': return compare(a.measurement, b.measurement, isAsc);
        case 'group': return compare(a.group, b.group, isAsc);
        case 'variableUnit': return compare(a.variableUnit, b.variableUnit, isAsc);
        case 'variableEvaLevel': return compare(a.variableEvaLevel, b.variableEvaLevel, isAsc);
        case 'variableLevel': return compare(a.variableLevel, b.variableLevel, isAsc);
        case 'variableAlias': return compare(a.variableAlias, b.variableAlias, isAsc);
        case 'variableDataType': return compare(a.variableDataType, b.variableDataType, isAsc);
        case 'variableLowerLimit': return compare(a.variableLowerLimit, b.variableLowerLimit, isAsc);
        case 'variableUpperLimit': return compare(a.variableUpperLimit, b.variableUpperLimit, isAsc);
        case 'factorId': return compare(a.factorId, b.factorId, isAsc);
        case 'ontoId': return compare(a.ontoId, b.ontoId, isAsc);
        case 'subgroup': return compare(a.subgroup, b.subgroup, isAsc);
        case 'variableName': return compare(a.variableName, b.variableName, isAsc);
        case 'defaultVariableValue': return compare(a.defaultVariableValue, b.defaultVariableValue, isAsc);
        case 'nMeaSeason': return compare(a.nMeaSeason, b.nMeaSeason, isAsc);
        case 'nMeaPlot': return compare(a.nMeaPlot, b.nMeaPlot, isAsc);
        case 'meaTime': return compare(a.meaTime, b.meaTime, isAsc);
        case 'meaTimeValue': return compare(a.meaTimeValue, b.meaTimeValue, isAsc);
        case 'depthUnit': return compare(a.depthUnit, b.depthUnit, isAsc);
        case 'soilDepth': return compare(a.soilDepth, b.soilDepth, isAsc);
        case 'variableValidation': return compare(a.variableValidation, b.variableValidation, isAsc);
        case 'variableCategory': return compare(a.variableCategory, b.variableCategory, isAsc);
        case 'isVisible': return compare(a.isVisible, b.isVisible, isAsc);
        case 'variableDescription': return compare(a.variableDescription, b.variableDescription, isAsc);
        case 'variablePosition': return compare(a.variablePosition, b.variablePosition, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });

  }

  private getFilteredData(data: StudyVariable[]) {
    // return data.filter(e =>
    //   e.measurement.toLowerCase().includes(this.filter.trim().toLowerCase()) ||
    //   e.variableUnit.toLowerCase().includes(this.filter.trim().toLowerCase())
    // );
    return data;
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
