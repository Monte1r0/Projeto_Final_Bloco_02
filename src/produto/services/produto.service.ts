import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";
import { LessThanOrEqual } from "typeorm";

@Injectable()
export class ProdutoService{

    constructor(
        @InjectRepository(Produto)
        private ProdutoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ){}

    async findALL(): Promise<Produto[]>{

        return await this.ProdutoRepository.find({
            relations: {
                categoria: true
            }
        });
    }

    async findByPrecoMaior(preco: number): Promise<Produto[]>{
        
        return await this.ProdutoRepository.findBy({
            preco: MoreThan(preco),
        })
    }

    async findByPrecoMenor(preco: number): Promise<Produto[]>{
        
        return await this.ProdutoRepository.findBy({
            preco: LessThan(preco),
        })
    }

    async findById(id: number): Promise<Produto>{

        let bucscaProduto = await this.ProdutoRepository.findOne({
            where:{
                id
            },
            relations: {
                categoria: true
            }
        })

        if (!bucscaProduto)
            throw new HttpException('Produto não foi encontrada!', HttpStatus.NOT_FOUND)

        return bucscaProduto;
    }

    async findByNome(nome: string): Promise<Produto[]>{

        return await this.ProdutoRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        })

    }

    async create(Produto: Produto): Promise<Produto>{
        
        if(Produto.categoria){

            await this.categoriaService.findById(Produto.categoria.id)


            return await this.ProdutoRepository.save(Produto);
        }
    }

    async update(Produto: Produto): Promise<Produto>{

        let buscaProduto = await this.findById(Produto.id);

        if(!buscaProduto || !Produto.id)
            throw new HttpException('A Produto não foi encontrada!', HttpStatus.NOT_FOUND)
        
        if(Produto.categoria){

            await this.categoriaService.findById(Produto.categoria.id)


            return await this.ProdutoRepository.save(Produto);
        }
        return await this.ProdutoRepository.save(Produto);
    }

    async delete(id: number): Promise<DeleteResult>{

        let bucscaProduto = await this.findById(id)

        if (!bucscaProduto)
            throw new HttpException('Produto não foi encontrada!', HttpStatus.NOT_FOUND)

        return await this.ProdutoRepository.delete(id);
    }
}