import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model: Calculation;
  factors: number;
  constructor() {
    this.reset();
  }
  reset() {
    this.model = new Calculation(
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    );
  }
  reCalculate(event: any) {
    this.factors = 1
      + (this.model.inputDocumentation - 1)
      + (this.model.inputDifficultCodeBase - 1)
      + (this.model.inputMeeting - 1)
      + (this.model.inputCodeReview - 1)
      + (this.model.inputTranslations - 1)
      + (this.model.inputDifficultDeployment - 1)
      + (this.model.inputRefactoring - 1)
      + (this.model.inputLayoutCustomization - 1);
    this.model.expectedTime = Math.round(
      ((this.model.inputPessimisticTime + 4 * this.model.inputMostLikelyTime + this.model.inputOptimisticTime) / 6) * this.factors
      * 100) / 100;
  }
}

export class Calculation {
  constructor(
    public expectedTime: number,
    public inputMostLikelyTime: number,
    public inputPessimisticTime: number,
    public inputOptimisticTime: number,
    public inputDocumentation: number,
    public inputDifficultCodeBase: number,
    public inputMeeting: number,
    public inputCodeReview: number,
    public inputTranslations: number,
    public inputDifficultDeployment: number,
    public inputRefactoring: number,
    public inputLayoutCustomization: number
  ) {  }
}
