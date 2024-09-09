import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const userRoles = decodedToken.roles || []; // Default to empty array if roles are not present
      console.log({ decodedToken });
      console.log({ userRoles });
      return roles.some((role) => userRoles.includes(role));
    } catch (err) {
      return false;
    }
  }
}
