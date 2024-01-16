import { IsString } from "class-validator";

export class SignInResponse {
    @IsString()
    accessToken: string;
}