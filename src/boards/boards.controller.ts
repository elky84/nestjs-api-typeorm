import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreateBoardDto } from './boards.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardService : BoardsService){}

    @Get()
    getAllBoard() : Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    createBoard(
        @Body() createBoardDto : CreateBoardDto 
    ) : Board {
        return this.boardService.createBoard(createBoardDto);  
    }
}