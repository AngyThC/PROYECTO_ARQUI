import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  users: Users = new Users();
  datatable: any = [];
  rols: string[] = [];

  constructor(private usersservice: UsersService) { }

  ngOnInit(): void {
    this.onDataTable();
    this.loadTypeMenus();
  }

  onDataTable() {
    this.usersservice.GetUsers().subscribe((res: any) => {
      this.datatable = res;
    });
  }

  AddUsers(users: Users): void {
    this.usersservice.AddUsers(users).subscribe(res => {
      if (res) {
        alert(`El usuario: ${users.UserName} se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      } else {
        alert('Error de registro');
      }
    });
  }

  UpdateUsers(users: Users): void {
    this.usersservice.UpdateUsers(users.UserID, users).subscribe(res => {
      if (res) {
        alert(`El usuario: ${users.UserID} se ha modificado correctamente`);
        this.clear();
        this.onDataTable();
      } else {
        alert('ERROR');
      }
    });
  }

  onSetData(select: any) {
    this.users.UserID = select.UserID;
    this.users.UserName = select.UserName;
    this.users.RoleName = select.RoleName;
  }

  clear() {
    this.users.UserID = 0;
    this.users.UserName = "";
    this.users.RoleName = "";
  }

  loadTypeMenus() {
    this.usersservice.loadRol().subscribe((res: any) => {
      this.rols = res.map((item: any) => item.Name_Role);
    });
  }
}
