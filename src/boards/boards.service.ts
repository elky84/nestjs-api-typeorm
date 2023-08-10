import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid } from 'uuid'
import { CreateBoardDto } from './boards.dto';

@Injectable()
export class BoardsService {
    private boards : Board[] = [];

    getAllBoards() : Board[] {
        return this.boards;
    }

    createBoard(createBoardDto : CreateBoardDto){
        const { title, description } = createBoardDto
        const board : Board = {
            title,
            description,
            id : uuid(),
            status : BoardStatus.PUBLIC,
        }
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string) : Board {
        return this.boards.find((board) => board.id === id)
    }

    deleteBoard(id : string){
        this.boards = this.boards.filter( (board) => board.id !== id)
    }
}