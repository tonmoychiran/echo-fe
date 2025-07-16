import { Routes } from '@angular/router';
import { accessTokenGuard } from './guards/access.token.guard';

export const AppRoutes = {
    LOGIN: '/login',
    INIT: '/init',
    VERIFY_LOGIN: '/verify-login',
    REGISTER_NAME: '/register/name',
    REGISTER_DOB: '/register/dob',
    ONLINE_FRIENDS: '/app/friends/online',
    ALL_FRIENDS: '/app/friends/all',
    ADD_FRIENDS: '/app/friends/add',
    CHAT: '/app/chat',
};


export const routes: Routes = [
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
        path: "init",
        loadComponent: () => {
            return import('./components/init/init.component')
                .then((m) => m.InitComponent)
        },
    },
    {
        path: 'app',
        loadComponent: () => {
            return import('./components/home/home.component').then((m) => m.HomeComponent);
        },
        // canActivateChild: [accessTokenGuard],
        children: [
            {
                path: 'friends',
                loadComponent: () => {
                    return import('./components/friends/friends.component')
                        .then(
                            (m) => m.FriendsComponent
                        );
                },
                children: [
                    {
                        path: "online",
                        loadComponent: () => {
                            return import('./components/online-friend/online-friend.component')
                                .then(
                                    (m) => m.OnlineFriendComponent
                                );
                        }
                    },
                    {
                        path: "all",
                        loadComponent: () => {
                            return import('./components/all-friend/all-friend.component')
                                .then(
                                    (m) => m.AllFriendComponent
                                );
                        }
                    },
                    {
                        path: "add",
                        loadComponent: () => {
                            return import('./components/add-friend/add-friend.component')
                                .then(
                                    (m) => m.AddFriendComponent
                                );
                        }
                    },
                    {
                        path: '',
                        redirectTo: 'online',
                        pathMatch: 'full'
                    }
                ],
            },
            {
                path: 'chat/:chatId',
                loadComponent: () => {
                    return import('./components/chat/chat.component')
                        .then(
                            (m) => m.ChatComponent
                        );
                }
            },
            {
                path: '',
                redirectTo: 'friends',
                pathMatch: 'full'
            }
        ],
    },
    {
        path: "**",
        redirectTo: 'login',
    },
];
