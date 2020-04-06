import { Component, OnInit } from '@angular/core';
import {stats} from '../../statistics'


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  displayedColumns: string[] = ['day', 'hole1', 'hole2', 'hole3', 'hole4', 'hole5', 'aggregate'];
  dataSource = stats;
  public birdies: number;
  public pars: number;
  public bogeys: number;
  public doubles: number


  constructor() { }

  ngOnInit() {
    this.birdies = this.calculateOverUnder(3);
    this.pars = this.calculateOverUnder(4)
    this.bogeys = this.calculateOverUnder(5)
    this.doubles = this.calculateOverUnder(6)
  }

  calculateOverUnder(scoreNum: number): number {
    let count = 0;
    this.dataSource.forEach(stat => {
      if(stat.hole1 === scoreNum) count++
      if(stat.hole2 === scoreNum) count++
      if(stat.hole3 === scoreNum) count++
      if(stat.hole4 === scoreNum) count++
      if(stat.hole5 === scoreNum) count++
    })
    return count;
  }

  calculateToPar(score){
    return score - 4
  }

  aggregateDay(day: string): string {
    let foundDay = this.dataSource.find(data => {
      return data.day === day
    })
    let count = 0;
    count = count + this.calculateToPar(foundDay.hole1);
    count = count + this.calculateToPar(foundDay.hole2);
    count = count + this.calculateToPar(foundDay.hole3);
    count = count + this.calculateToPar(foundDay.hole4);
    count = count + this.calculateToPar(foundDay.hole5);

    let prefix = count > 0 ? '+' : '-'

    return prefix + count;

  }
}
