import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../rest.service';
import { Constants } from '../app.constants';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  movies:any = [];
  fetchDataSubject = new Subject();
  constructor(private fetchData:RestService) { }

  ngOnInit() {
    this.fetchData.getDetails(Constants.TRENDING_MOVIES_URL,{}).subscribe((response)=>{
      console.log(response);
      this.processResponse(response);
    },(error)=>{
      console.log(error);
      this.processError(error);
    });

    let latestMovieParams = {
      "language":"en-US",
      "include_adult":false,
    };

    this.fetchData.getDetails(Constants.LATEST_MOVIES_URL, latestMovieParams).subscribe((response)=>{
      console.log(response);
      this.processResponse(response);
    },(error)=>{
      console.log(error);
      this.processError(error);
    });
  }

  ngOnDestroy() {

  }

  processResponse(response){
    console.log(response);
  }

  processError(error){
    console.log(error);
  }

}
