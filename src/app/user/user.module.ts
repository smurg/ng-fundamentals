import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { userRoutes } from './user.routes';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        ProfileComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(userRoutes)
     ],
    exports: [],
    providers: [],
})
/* This is a Feature Module that will be lazy loaded when url match /users */
export class UserModule {}

/**
 * FormsModule: give us access to a full list of form features from Angular
 */
