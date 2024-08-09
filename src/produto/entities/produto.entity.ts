
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";


@Entity({name: "tb_produtos"})
export class Produto{

    @PrimaryGeneratedColumn() // Chave Primaria Autoincremental
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Bloquear espaços em branco
    @IsNotEmpty() // Não aceita resultado vazio 
    @Column({length: 100, nullable: false}) // Definir o tamanho e não aceitar vlor maior que 100
    nome: string;

    @IsNotEmpty()
    @Column({nullable: false})
    vencimento: Date;

    @Column({length: 255, nullable: false}) // Definir o tamanho e não aceitar vlor maior que 100
    foto: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({ type: "decimal", precision: 6, scale: 2 })
    preco: number;

    // Muitas Postagens, possuem um categoria (Muitos para um)
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

}

function ApiProperty(): (target: Produto, propertyKey: "vencimento") => void {
    throw new Error("Function not implemented.");
}
