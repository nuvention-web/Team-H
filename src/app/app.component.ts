import { Component } from '@angular/core';
import { GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';
import { Subscription } from 'rxjs/Subscription';
import { RepoInfo } from './repo';
import { IssuesInfo } from './issues';
import { MilestoneInfo } from './milestones';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'GitHub Status Updates';
  ghId = '';
  ghIds: GitIdInfo[] = [];
  issues: IssuesInfo[] = [];
  repos: string[] = [];
  repolist: RepoInfo[] = [];
  milestones: MilestoneInfo[] = [];
  class: string = 'block';
  private getGitsub: Subscription;
  private getReposub: Subscription;
  private getRepolistsub: Subscription;
  private getIssuesub: Subscription;
  private getMstonesub: Subscription;

  errorMessage = null;

  constructor(private ids: GitIdInfoService) {}

  addGhId(toadd: string) {
    this.errorMessage = null;
    this.getGitsub = this.ids.GetGitIdInfo(toadd).subscribe(info => {
        this.ghIds.push(info);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
    this.ghId = '';
  }


  getRepo(toadd: string, getIssuesFunct: boolean) {
    this.class = 'none';
    this.errorMessage = null;
    // repo field takes repo link
    let cleanedLink = toadd.split('/');
    let repoTag = cleanedLink.slice(cleanedLink.length - 2, cleanedLink.length).join('/');
    // checks if name was passed in by another function
    if (getIssuesFunct) {
      repoTag = toadd;
    }
    this.getReposub = this.ids.GetRepoInfo(repoTag).subscribe(info => {
        this.repos.push(info['name'])
        this.repos.push(info['login'])
        this.repos.push(info['issues_url'])
        this.repos.push(info['milestones_url'])
        console.log(this.repos);
        this.getIssues();
        // this.getMilestones();

      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });

    this.repos = [];
    this.issues = [];
    console.log(this.repos);
  }

  getRepoList(toadd: string) {

    this.getRepolistsub = this.ids.GetRepoList(toadd).subscribe(info => {
      info.forEach(element => {
        this.repolist.push(element as RepoInfo);

      });
      console.log(this.repolist);
    })

  }

  getIssues() {
    console.log(this.repos)
    this.getIssuesub = this.ids.GetIssue(this.repos[2].substr(0, (this.repos[2].length - 9))).subscribe(info => {
      info.forEach(element => {
        this.issues.push(element as IssuesInfo);
      });
      console.log(this.issues);
      if (this.issues.length == 0) {
        this.errorMessage = 'There are no issues for this repository.';
      }

    })

  }


  repoName() {
    return this.repos[0];
  }

  repoOwner() {
    return this.repos[1];
  }



  /* getMilestones() {
      
  this.getMstonesub = this.ids.GetIssue(this.repos[3].substr(0, (this.repos[3].length - 9))).subscribe( info => {
    info.forEach(element => {
      this.milestones.push(element as MilestoneInfo);
    });
    console.log(this.milestones);
  
})
}

printMilestones()
{
  this.count++;
  if(this.count > this.milestones.length)
  {
    return ' ';
  }
  else 
  {
  return this.milestones[this.count].title;
  }
  */
}
