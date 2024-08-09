import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";


@Controller("/produtos")
export class ProdutoController{

    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK) //Http Status 200
    findALL(): Promise<Produto[]>{
        return this.produtoService.findALL();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK) //Http Status 200
    findById(@Param('id', ParseIntPipe)id:number): Promise<Produto>{
        return this.produtoService.findById(id);
    } 

    @Get('/PrecoMaior/:preco')
    @HttpCode(HttpStatus.OK) //Http Status 200
    findByPrecoMaior(@Param('preco', ParseFloatPipe)preco:number): Promise<Produto[]>{
        return this.produtoService.findByPrecoMaior(preco);
    } 

    @Get('/PrecoMenor/:preco')
    @HttpCode(HttpStatus.OK) //Http Status 200
    findByPrecoMenor(@Param('preco', ParseFloatPipe)preco:number): Promise<Produto[]>{
        return this.produtoService.findByPrecoMenor(preco);
    } 

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK) //Http Status 200
    findByNome(@Param('nome', )nome:string): Promise<Produto[]>{
        return this.produtoService.findByNome(nome);
    } 

    @Post()
    @HttpCode(HttpStatus.CREATED) // Http Status 201
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK) // Http Status 200
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) //Http Status 204
    delete(@Param('id', ParseIntPipe)id:number){
        return this.produtoService.delete(id);
    } 
    
}