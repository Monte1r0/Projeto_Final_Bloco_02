import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Produto } from "../../produto/entities/produto.entity";


@Entity({name: "tb_categorias"})
export class Categoria {
    
    @PrimaryGeneratedColumn()    
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Bloquear espaços em branco
    @IsNotEmpty() // Não aceita resultado vazio 
    @Column({length: 100, nullable: false}) // Definir o tamanho e não aceitar vlor maior que 100
    nome: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string
 
    // @OneToMany(() => Produto, (produto) => produto.categoria)
    // produto: Produto[]

}