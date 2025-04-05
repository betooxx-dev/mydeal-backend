import { applyDecorators, UseGuards } from "@nestjs/common";
import { ValidRoles } from "../interfaces";
import { AuthGuard } from "@nestjs/passport";

export function Auth (...roles: ValidRoles[]){
    return applyDecorators(
        UseGuards(AuthGuard())
    )
}