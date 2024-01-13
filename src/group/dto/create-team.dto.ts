import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Company } from "../company.entity";
import { User } from "src/user/enitity/user.entity";

export class CreateTeamDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    company: Company;

    user: User;
}
