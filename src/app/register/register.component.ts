import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '../../environments/environment';
import { Logger } from '../core/logger.service';
import { I18nService } from '../core/i18n.service';
import { AuthenticationService } from '../core/authentication/authentication.service';

const log = new Logger('Register');

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    version: string = environment.version;
    error: string = null;
    registerForm: FormGroup;
    isLoading = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private i18nService: I18nService,
        private authenticationService: AuthenticationService
    ) {
        this.createForm();
     }

    ngOnInit() { }

    register() {
        this.isLoading = true;
        this.authenticationService.register(this.registerForm.value)
          .finally(() => {
            this.registerForm.markAsPristine();
            this.isLoading = false;
          })
          .subscribe(credentials => {
            log.debug(`${credentials.username} successfully registered`);
            this.router.navigate(['login'], { replaceUrl: true });
          }, error => {
            log.debug(`Register error: ${error}`);
            this.error = error;
          });
    }

    private createForm() {
        this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          rank: [1, Validators.required],
          remember: true
        });
      }
}
