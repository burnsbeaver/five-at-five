import { Component, OnInit } from '@angular/core';
import {stats} from '../../statistics'



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
    this.birdies = this.calculateOverUnder(-1);
    this.pars = this.calculateOverUnder(0)
    this.bogeys = this.calculateOverUnder(1)
    this.doubles = this.calculateOverUnder(2)
  }

  calculateOverUnder(scoreNum: number): number {
    let count = 0;
    this.dataSource.forEach(stat => {
      if(stat.hole1.score - stat.hole1.par === scoreNum) count++
      if(stat.hole2.score - stat.hole2.par === scoreNum) count++
      if(stat.hole3.score - stat.hole3.par === scoreNum) count++
      if(stat.hole4.score - stat.hole4.par === scoreNum) count++
      if(stat.hole5.score - stat.hole5.par === scoreNum) count++
    })
    return count;
  }

  calculateToPar(hole){
    return hole.score - hole.par
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
