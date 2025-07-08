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
        path: "home",
        loadComponent: () => {
            return import('./components/home/home.component')
                .then((m) => m.HomeComponent)
        },
    },
    {
        path: "online",
        loadComponent: () => {
            return import('./components/online-list/online-list.component')
                .then((m) => m.OnlineListComponent)
        },
    },
    {
        path: "friends",
        loadComponent: () => {
            return import('./components/friends/friends.component')
                .then((m) => m.FriendsComponent)
        }
    },
    {
        path: "settings",
        loadComponent: () => {
            return import('./components/settings/settings.component')
                .then((m) => m.SettingsComponent)
        },
    },
    {
        path: "register/dob",
        loadComponent: () => {
            return import('./components/update-user-dob/update-user-dob.component')
                .then((m) => m.UpdateUserDobComponent)
        },
    },
    {
        path: "register/name",
        loadComponent: () => {
            return import('./components/update-user-name/update-user-name.component')
                .then((m) => m.UpdateUserNameComponent)
        },
    },
];
