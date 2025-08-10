import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AdminAuthService } from "../monService/admin-auth.service";
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private adminAuthService: AdminAuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const addToken = req.headers.get('No-Auth') !== 'True';

        if (addToken && this.adminAuthService.isLoggedIn()) {
            const token = this.adminAuthService.getToken();
            const authReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(authReq);
        }

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log(err.status);

                if (err.status === 0) {
                    // Erreur de serveur (ex: backend down)
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur serveur',
                        text: 'Le serveur est inaccessible. Veuillez réessayer plus tard.'
                    });
                    this.router.navigate(['/errer_server']);
                } 
                else if (err.status === 401) {
                    // Non autorisé, redirection vers login
                    Swal.fire({
                        icon: 'warning',
                        title: 'Non autorisé',
                        text: 'Vous devez vous connecter pour accéder à cette ressource.'
                    });
                    this.router.navigate(['/login']);
                }
                else if (err.status === 403) {
                    // Forbidden, accès refusé
                    Swal.fire({
                        icon: 'error',
                        title: 'Accès refusé',
                        text: 'Vous n\'avez pas les droits nécessaires pour accéder à cette ressource.'
                    });
                }
                else {
                    // Autres erreurs HTTP
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: err.message || 'Une erreur est survenue.'
                    });
                }

                // On renvoie l'erreur pour que le composant puisse aussi la gérer si besoin
                return throwError(() => err);
            })
        );
    }
}
