import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found = this.boards.find((board) => board.id === id);
        if(!found){
            throw new NotFoundException("can't find any id : " + id);
        }
        return found;
    }

    deleteBoard(id : string){
        const found = this.getBoardById(id);
        this.boards = this.boards.filter( (board) => board.id !== found.id)
    }

    updateBoardStatus(id : string, status : BoardStatus) : Board{
        const board : Board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}