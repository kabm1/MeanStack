import { User } from './types';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html'
})
export class AllusersComponent implements OnInit {
  users: User[] = [];
  constructor(private api: ApiService) { }

  async ngOnInit() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    this.users = await this.api.users();
  }

}
