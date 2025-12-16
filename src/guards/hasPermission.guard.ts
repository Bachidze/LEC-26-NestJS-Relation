import { tr } from "@faker-js/faker";
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class HasPermissionGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const password = request.headers["password"]
        if(!password || password !== "admin") throw new BadRequestException("permission denide")
        return true
    }
}