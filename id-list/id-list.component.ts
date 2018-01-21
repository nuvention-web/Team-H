import { Component, OnInit, Input } from '@angular/core';
import { RepoInfo } from '../repo';

@Component({
  selector: 'app-id-list',
  templateUrl: './id-list.component.html',
  styleUrls: ['./id-list.component.css']
})
export class IdListComponent implements OnInit {

  repos: RepoInfo[] = [];
  @Input() repolist: RepoInfo[];
  
  constructor() { }

  
  ngOnInit() {
  }

}
