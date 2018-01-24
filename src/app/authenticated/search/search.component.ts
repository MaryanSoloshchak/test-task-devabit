import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../../services/user/user.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private users: Array<User>;
  private  allUsers: Array<User>;
  public filterInput = '';
  constructor(private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe(res => {
      this.userService.getAllUsers().subscribe( (users: Array<User>) => {
        users.splice(users.findIndex(x => x.id === res.id), 1);
        this.users = users;
        this.allUsers = users;
      });
    });
  }
  filter() {
    if (this.filterInput.length > 0) {
      this.users = this.allUsers.filter( value => value.firstName.includes(this.filterInput) ||
                                           value.lastName.includes(this.filterInput) ||
                                           value.email.includes(this.filterInput));
    } else {
      this.users = this.allUsers;
    }
  }

}
