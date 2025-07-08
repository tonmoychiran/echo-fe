import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
    },
    {
        path: "login",
        loadComponent: () => {
            return import('./components/login/login.component')
                .then((m) => m.LoginComponent)
        },
    },
    {
        path: "verify-login",
        loadComponent: () => {
            return import('./components/verify-login/verify-login.component')
                .then((m) => m.VerifyLoginComponent)
        },
    },
    {
        path: "chat",
        loadComponent: () => {
            return import('./components/chat-list/chat-list.component')
                .then((m) => m.ChatListComponent)
        },
    },
    {
        path: "register/name",
        loadComponent: () => {
            return import('./components/update-user-name/update-user-name.component')
                .then((m) => m.UpdateUserNameComponent)
        },
    },
    {
        path: "register/dob",
        loadComponent: () => {
            return import('./components/update-user-dob/update-user-dob.component')
                .then((m) => m.UpdateUserDobComponent)
        },
    },
];
