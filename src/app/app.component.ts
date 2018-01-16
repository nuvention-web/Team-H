import { Component } from '@angular/core';
import { GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Git Status Updates - Team H';
  ghId = '';
  ghIds: GitIdInfo[] = [];
  private getGitsub: Subscription;
  errorMessage = null;

  constructor(private ids: GitIdInfoService) { }

  addGhId(toadd: string) {
    this.errorMessage = null;
    this.getGitsub = this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
  }
}
