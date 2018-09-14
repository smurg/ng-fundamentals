import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { ProfileComponent } from './profile.component';

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes)
     ],
    exports: [],
    providers: [],
})
/* This is a Feature Module that will be lazy loaded when url match /users */
export class UserModule {}
