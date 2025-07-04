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
        path: "chat-list",
        loadComponent: () => {
            return import('./components/chat-list/chat-list.component')
                .then((m) => m.ChatListComponent)
        },
    },
];
