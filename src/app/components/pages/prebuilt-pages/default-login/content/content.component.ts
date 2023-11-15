import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';  // Importa el servicio de autenticación
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  currentUser: any;
  loginError: string = '';
  loginForm: FormGroup;


  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log(user);
    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    // Llama al servicio de autenticación con los datos del formulario
    this.authService.login(this.loginForm.value);
  }
  
  // Otros métodos y lógica según sea necesario
}
