import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  loginError: string = '';
  loginForm: FormGroup;
  username: string;
  password: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private loginservice: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.onDataTable();
  }

  onDataTable() {
    // Lógica para obtener datos
  }

  login() {
          //Validacion para los usuarios de la base de datos
          this.loginservice.ValidateUser(this.username,this.password).subscribe((data) => {
            if (data) {
              // Si los datos del usuario existen, realizar alguna acción, por ejemplo, navegar a la página de inicio.
              this.router.navigate(['/home']);
            } else {
              // Si no existen datos del usuario, mostrar un mensaje de error.
              console.log('Error: Usuario no encontrado');
            }
          });
  }
}
