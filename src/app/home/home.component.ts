import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../rest.service';
import { Constants } from '../app.constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  movies:any = {
    latestMovies: {},
    popularMovies: {},
    trendingMovies: {}
  };
  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = false;
  imageBaseUrl = Constants.IMAGE_BASE_URL;
  fetchDataSubject = new Subject();

  constructor(private fetchData:RestService) { }

  ngOnInit() {
    this.fetchData.getDetails(Constants.TRENDING_MOVIES_URL,{}).subscribe((response)=>{
      console.log('res',response);
      this.processResponse('trendingMovies',response);
    },(error)=>{
      console.log('err',error);
      this.processError(error);
    });

    let latestMovieParams = {
      "language":"en-US",
      "include_adult":false,
    };

    this.fetchData.getDetails(Constants.LATEST_MOVIES_URL, latestMovieParams).subscribe((response)=>{
      console.log(response);
      this.processResponse('latestMovies', response);
    },(error)=>{
      console.log(error);
      this.processError(error);
    });
    
    let popularMovieParams={
      "language":"en-US",
      "page":1
    };

    this.fetchData.getDetails(Constants.POPULAR_MOVIES_URL, popularMovieParams).subscribe((response)=>{
      console.log(response);
      this.processResponse('popularMovies',response);
    },(error)=>{
      console.log(error);
      this.processError(error);
    });
  }

  ngOnDestroy() {
    this.fetchDataSubject.next();
    this.fetchDataSubject.complete();
    // this.fetchDataSubject.unsubscribe();
  }

  processResponse(movieType, response){
    if (response && movieType in this.movies)
      this.movies[movieType] = response;
   console.log('movietype',movieType,response);
  }

  processError(error){
    console.log(error);
  }

}
