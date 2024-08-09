import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from "./controllers/usuario.controller";
import { Usuario } from "./entities/ususario.entity";
import { UsuarioService } from "./services/ususario.service";
import { Bcrypt } from "../auth/bcrypt/bcrypt";





@Module({

    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService, Bcrypt],
    controllers: [UsuarioController],
    exports: [UsuarioService],
})
export class UsuarioModule {}